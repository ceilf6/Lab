#!/usr/bin/env node
import http from "node:http";
import crypto from "node:crypto";

const host = process.env.OPENVIKING_LOCAL_EMBEDDING_HOST || "127.0.0.1";
const port = Number(process.env.OPENVIKING_LOCAL_EMBEDDING_PORT || 1934);
const dimension = Number(process.env.OPENVIKING_LOCAL_EMBEDDING_DIMENSION || 384);
const model = process.env.OPENVIKING_LOCAL_EMBEDDING_MODEL || "wiki-local-hash-embedding";

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("OPENVIKING_LOCAL_EMBEDDING_PORT must be a positive integer");
}
if (!Number.isInteger(dimension) || dimension <= 0) {
  throw new Error("OPENVIKING_LOCAL_EMBEDDING_DIMENSION must be a positive integer");
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error("request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function hashInt(text) {
  const digest = crypto.createHash("sha256").update(text).digest();
  return digest.readUInt32BE(0);
}

function tokenize(text) {
  const lower = String(text).toLowerCase();
  const words = lower.match(/[\p{L}\p{N}_-]+/gu) || [];
  const chars = Array.from(lower.replace(/\s+/g, ""));
  const grams = [];
  for (let n = 2; n <= 4; n += 1) {
    for (let i = 0; i + n <= chars.length; i += 1) {
      grams.push(chars.slice(i, i + n).join(""));
    }
  }
  return [...words, ...grams];
}

function embed(text) {
  const vector = new Array(dimension).fill(0);
  const tokens = tokenize(text);
  for (const token of tokens) {
    const idxHash = hashInt(`idx:${token}`);
    const signHash = hashInt(`sign:${token}`);
    const idx = idxHash % dimension;
    const sign = signHash % 2 === 0 ? 1 : -1;
    vector[idx] += sign;
  }
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => Number((value / norm).toFixed(8)));
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && (req.url === "/health" || req.url === "/v1/health")) {
      sendJson(res, 200, { status: "ok", model, dimension });
      return;
    }
    if (req.method === "GET" && req.url === "/v1/models") {
      sendJson(res, 200, {
        object: "list",
        data: [{ id: model, object: "model", owned_by: "local" }],
      });
      return;
    }
    if (req.method === "POST" && req.url === "/v1/embeddings") {
      const payload = JSON.parse((await readBody(req)) || "{}");
      const inputs = Array.isArray(payload.input) ? payload.input : [payload.input ?? ""];
      sendJson(res, 200, {
        object: "list",
        model: payload.model || model,
        data: inputs.map((input, index) => ({
          object: "embedding",
          index,
          embedding: embed(input),
        })),
        usage: {
          prompt_tokens: inputs.reduce((sum, input) => sum + tokenize(input).length, 0),
          total_tokens: inputs.reduce((sum, input) => sum + tokenize(input).length, 0),
        },
      });
      return;
    }
    sendJson(res, 404, { error: { message: "not found" } });
  } catch (error) {
    sendJson(res, 500, { error: { message: error.message } });
  }
});

server.listen(port, host, () => {
  console.log(`OpenViking local embedding server listening on http://${host}:${port}`);
  console.log(`model=${model} dimension=${dimension}`);
});
