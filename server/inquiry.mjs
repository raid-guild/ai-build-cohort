import { isIP } from "node:net";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const FIELDS = {
  name: 120,
  email: 254,
  company: 160,
  role: 120,
  teamSize: 80,
  workflow: 2000,
};

function json(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(JSON.stringify(body));
}

function clean(value, max, multiline = false) {
  if (typeof value !== "string") return null;
  const result = value.trim();
  const unsafe = multiline ? /[\u0000-\u0009\u000b-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/;
  if (!result || result.length > max || unsafe.test(result)) return null;
  return result;
}

function validate(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const result = {};
  for (const [field, max] of Object.entries(FIELDS)) {
    const value = clean(payload[field], max, field === "workflow");
    if (!value) return null;
    result[field] = value;
  }
  if (!EMAIL.test(result.email)) return null;
  return result;
}

function getClientIp(req, trustRailwayProxy) {
  const edgeIp = req.headers["x-real-ip"];
  if (trustRailwayProxy && typeof edgeIp === "string" && isIP(edgeIp)) return edgeIp;
  return req.socket.remoteAddress || "unknown";
}

export function createInquiryHandler({
  fetchImpl = fetch,
  env = process.env,
  now = Date.now,
} = {}) {
  const recent = new Map();
  let globalRecent = [];
  return async function inquiry(req, res) {
    if (req.method !== "POST") {
      res.setHeader("allow", "POST");
      return json(res, 405, { error: "Method not allowed." });
    }
    if (!String(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
      return json(res, 415, { error: "Send JSON to this endpoint." });
    }
    if (Number(req.headers["content-length"]) > MAX_BODY_BYTES) {
      return json(res, 413, { error: "That message is too long." });
    }

    const ip = getClientIp(req, env.TRUST_RAILWAY_PROXY === "true");
    const timestamp = now();
    globalRecent = globalRecent.filter((time) => timestamp - time < WINDOW_MS);
    if (globalRecent.length >= 100) {
      return json(res, 429, { error: "The form is busy. Please email clerics@raidguild.org." });
    }
    const history = (recent.get(ip) || []).filter((time) => timestamp - time < WINDOW_MS);
    recent.set(ip, history);
    if (history.length >= MAX_REQUESTS) {
      return json(res, 429, { error: "Please wait a few minutes before sending another request." });
    }
    if (recent.size > 2000) {
      for (const [key, times] of recent) {
        if (times.every((time) => timestamp - time >= WINDOW_MS)) recent.delete(key);
      }
    }

    let raw = "";
    try {
      for await (const chunk of req) {
        raw += chunk.toString("utf8");
        if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return json(res, 413, { error: "That message is too long." });
      }
    } catch {
      return json(res, 400, { error: "We could not read your request." });
    }
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return json(res, 400, { error: "Please check the form and try again." });
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json(res, 400, { error: "Please check the form and try again." });
    if (payload.website) return json(res, 200, { ok: true });
    const fields = validate(payload);
    if (!fields) return json(res, 400, { error: "Please complete every field with valid details." });

    const key = env.SENDGRID_API_KEY;
    const from = env.SENDGRID_FROM_EMAIL || "clerics@raidguild.org";
    const recipients = (env.SENDGRID_TO_EMAILS || "clerics@raidguild.org")
      .split(",")
      .map((address) => address.trim())
      .filter((address) => EMAIL.test(address));
    if (!key || !EMAIL.test(from) || !recipients.length) {
      console.error("Inquiry email is not configured.");
      return json(res, 503, { error: "The form is temporarily unavailable. Please email clerics@raidguild.org." });
    }

    history.push(timestamp);
    globalRecent.push(timestamp);
    const lines = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Company: ${fields.company}`,
      `Role: ${fields.role}`,
      `Team size: ${fields.teamSize}`,
      "",
      "What they want to build:",
      fields.workflow,
    ];
    try {
      const response = await fetchImpl("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          authorization: `Bearer ${key}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: recipients.map((email) => ({ email })) }],
          from: { email: from, name: "RaidGuild AI Build Cohort" },
          reply_to: { email: fields.email, name: fields.name },
          subject: `AI Build Cohort intro request — ${fields.company}`,
          content: [{ type: "text/plain", value: lines.join("\n") }],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (response.status !== 202) {
        console.error("Inquiry email provider rejected request:", response.status);
        return json(res, 502, { error: "We could not send your request. Please email clerics@raidguild.org." });
      }
      return json(res, 200, { ok: true });
    } catch (error) {
      console.error("Inquiry email provider unavailable:", error instanceof Error ? error.message : "unknown error");
      return json(res, 502, { error: "We could not send your request. Please email clerics@raidguild.org." });
    }
  };
}
