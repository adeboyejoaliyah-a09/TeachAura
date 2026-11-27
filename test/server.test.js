import http from "http";
import assert from "assert";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

const TEST_PORT = 3055;

const child = spawn("node", ["server.js"], {
  cwd: projectRoot,
  env: { ...process.env, PORT: TEST_PORT },
  stdio: ["ignore", "pipe", "pipe"],
});

function get(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://localhost:${TEST_PORT}${pathname}`, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () =>
          resolve({ statusCode: res.statusCode, body, headers: res.headers }),
        );
      })
      .on("error", reject);
  });
}

child.stdout.on("data", (d) => {
  const msg = d.toString();
  if (msg.includes("running at")) {
    (async () => {
      try {
        const index = await get("/");
        assert.strictEqual(index.statusCode, 200);
        assert(index.headers["content-type"].includes("text/html"));
        assert(index.body.includes("TeachAura - AI Teaching Assistant"));
        assert(index.body.includes("app-root"));

        const frontendModule = await get("/src/frontend-app.js");
        assert.strictEqual(frontendModule.statusCode, 200);
        assert(frontendModule.body.includes("renderTeacherDashboard"));

        for (const pathname of [
          "/.env",
          "/.env.local",
          "/package.json",
          "/src/config/env.ts",
          "/src/server.ts",
          "/../.env",
        ]) {
          const response = await get(pathname);
          assert(
            response.statusCode === 403 || response.statusCode === 404,
            `${pathname} should not be served`,
          );
        }

        console.log(
          "[PASS] Frontend routes work and private repository files are denied",
        );
        child.kill();
        process.exit(0);
      } catch (error) {
        console.error("HTTP server test failed:", error);
        child.kill();
        process.exit(1);
      }
    })();
  }
});

child.stderr.on("data", (d) => {
  console.error("Server stderr:", d.toString());
});

setTimeout(() => {
  console.error("Timeout waiting for server to start");
  child.kill();
  process.exit(1);
}, 8000);
