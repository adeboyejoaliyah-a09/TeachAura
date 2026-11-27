import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const FRONTEND_ASSET_PATH =
  /^\/src\/(?:frontend-app\.js|components\/[A-Za-z0-9_-]+\.js|state\/store\.js|data\/mockData\.js)$/;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "POST") {
    res.writeHead(405, { Allow: "GET, HEAD, POST" });
    res.end("Method Not Allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname,
    );
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad Request");
    return;
  }

  if (pathname === "/") {
    pathname = "/index.html";
  }

  // API Mock endpoint for AI generation simulation
  if (pathname === "/api/ai/generate") {
    if (req.method === "POST") {
      let body = "";
      let bodyBytes = 0;
      let exceededLimit = false;
      req.on("data", (chunk) => {
        bodyBytes += chunk.length;
        if (bodyBytes > 256 * 1024) {
          exceededLimit = true;
          body = "";
          return;
        }
        if (!exceededLimit) body += chunk;
      });
      req.on("end", () => {
        if (exceededLimit) {
          res.writeHead(413, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Request body too large" }));
          return;
        }
        try {
          const payload = JSON.parse(body || "{}");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              status: "success",
              prompt: payload.prompt || "",
              generatedContent: `AI Suggestion for ${payload.topic || "Nigerian Classroom"}: Integrated contextual lesson hooks and localized experiment models successfully generated.`,
            }),
          );
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }
  }

  if (req.method === "POST") {
    res.writeHead(405, { Allow: "GET, HEAD, OPTIONS" });
    res.end("Method Not Allowed");
    return;
  }

  if (pathname !== "/index.html" && !FRONTEND_ASSET_PATH.test(pathname)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Access Denied");
    return;
  }

  const safePath = path.resolve(__dirname, `.${pathname}`);
  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    const readStream = fs.createReadStream(safePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`TeachAura frontend server running at http://localhost:${PORT}`);
});
