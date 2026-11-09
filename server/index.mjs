import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sirv from "sirv";
import { createInquiryHandler } from "./inquiry.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const serve = sirv(root, { dev: false, etag: true, maxAge: 3600, immutable: false, single: false });
const inquiry = createInquiryHandler();
const port = Number(process.env.PORT || 8080);

createServer((req, res) => {
  const path = new URL(req.url || "/", "http://localhost").pathname;
  if (path === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
    return res.end("ok");
  }
  if (path === "/api/inquiry") return void inquiry(req, res);
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" });
    return res.end();
  }
  res.setHeader("x-content-type-options", "nosniff");
  serve(req, res, () => {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });
}).listen(port, "0.0.0.0", () => console.log(`AI Build Cohort listening on ${port}`));
