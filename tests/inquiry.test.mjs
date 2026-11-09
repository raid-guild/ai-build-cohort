import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { createInquiryHandler } from "../server/inquiry.mjs";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Example Co",
  role: "Engineering lead",
  teamSize: "12",
  workflow: "Help triage support requests",
};

let server;
let url;
let calls = [];
let providerStatus = 202;

before(async () => {
  server = createServer(createInquiryHandler({
    env: { SENDGRID_API_KEY: "test-key", SENDGRID_FROM_EMAIL: "clerics@raidguild.org", SENDGRID_TO_EMAILS: "clerics@raidguild.org", TRUST_RAILWAY_PROXY: "true" },
    fetchImpl: async (_url, options) => {
      calls.push(options);
      return { status: providerStatus };
    },
  }));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  url = `http://127.0.0.1:${server.address().port}/api/inquiry`;
});

after(async () => { await new Promise((resolve) => server.close(resolve)); });

async function post(body, headers = {}) {
  return fetch(url, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
}

test("accepts a valid inquiry only after SendGrid accepts it", async () => {
  const response = await post(valid, { "x-real-ip": "192.0.2.10" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 1);
  const mail = JSON.parse(calls[0].body);
  assert.equal(mail.reply_to.email, valid.email);
  assert.equal(mail.personalizations[0].to[0].email, "clerics@raidguild.org");
  assert.match(mail.content[0].value, /triage support requests/);
});

test("rejects bad input and does not call provider", async () => {
  const count = calls.length;
  const response = await post({ ...valid, email: "bad@", name: "Header\r\nInjection" }, { "x-real-ip": "192.0.2.11" });
  assert.equal(response.status, 400);
  assert.equal(calls.length, count);
});

test("rejects null JSON without crashing", async () => {
  const response = await post(null, { "x-real-ip": "192.0.2.16" });
  assert.equal(response.status, 400);
});

test("accepts multiline workflow descriptions", async () => {
  const response = await post({ ...valid, workflow: "First task\nSecond task" }, { "x-real-ip": "192.0.2.17" });
  assert.equal(response.status, 200);
});

test("returns an error when provider does not accept", async () => {
  providerStatus = 401;
  const response = await post(valid, { "x-real-ip": "192.0.2.12" });
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /clerics@raidguild.org/);
  providerStatus = 202;
});

test("honeypot does not send mail", async () => {
  const count = calls.length;
  const response = await post({ ...valid, website: "https://spam.example" }, { "x-real-ip": "192.0.2.13" });
  assert.equal(response.status, 200);
  assert.equal(calls.length, count);
});

test("rate limit applies per client", async () => {
  for (let index = 0; index < 5; index++) {
    assert.equal((await post(valid, { "x-real-ip": "192.0.2.14" })).status, 200);
  }
  assert.equal((await post(valid, { "x-real-ip": "192.0.2.14" })).status, 429);
});

test("oversized body is rejected", async () => {
  const response = await post({ ...valid, workflow: "x".repeat(15_000) }, { "x-real-ip": "192.0.2.15" });
  assert.equal(response.status, 413);
});

test("untrusted forwarded headers cannot evade the same-peer limit", async () => {
  const handler = createInquiryHandler({
    env: { SENDGRID_API_KEY: "test-key", SENDGRID_FROM_EMAIL: "clerics@raidguild.org", SENDGRID_TO_EMAILS: "clerics@raidguild.org" },
    fetchImpl: async () => ({ status: 202 }),
  });
  const separateServer = createServer(handler);
  await new Promise((resolve) => separateServer.listen(0, "127.0.0.1", resolve));
  const target = `http://127.0.0.1:${separateServer.address().port}/api/inquiry`;
  try {
    for (let index = 0; index < 5; index++) {
      const response = await fetch(target, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `192.0.2.${index + 1}`, "x-real-ip": `192.0.2.${index + 10}` }, body: JSON.stringify(valid) });
      assert.equal(response.status, 200);
    }
    const response = await fetch(target, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.200", "x-real-ip": "198.51.100.201" }, body: JSON.stringify(valid) });
    assert.equal(response.status, 429);
  } finally {
    await new Promise((resolve) => separateServer.close(resolve));
  }
});

test("trusted Railway X-Real-IP separates visitors and rejects invalid values", async () => {
  const responseA = await post(valid, { "x-real-ip": "192.0.2.21", "x-forwarded-for": "203.0.113.100" });
  const responseB = await post(valid, { "x-real-ip": "192.0.2.22", "x-forwarded-for": "203.0.113.100" });
  assert.equal(responseA.status, 200);
  assert.equal(responseB.status, 200);
  const invalid = await post(valid, { "x-real-ip": "not-an-ip" });
  assert.equal(invalid.status, 200);
});
