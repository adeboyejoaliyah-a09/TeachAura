import http from 'http';
import assert from 'assert';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const TEST_PORT = 3055;
process.env.PORT = TEST_PORT;

const child = spawn('node', ['server.js'], {
  cwd: projectRoot,
  env: { ...process.env, PORT: TEST_PORT },
  stdio: ['ignore', 'pipe', 'pipe']
});

child.stdout.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('running at')) {
    // Server is up! Make request
    http.get(`http://localhost:${TEST_PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 200, `Expected 200 OK, got ${res.statusCode}`);
      assert(res.headers['content-type'].includes('text/html'), 'Expected text/html content-type');

      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        assert(body.includes('TeachAura - AI Teaching Assistant'), 'Missing title in index.html');
        assert(body.includes('app-root'), 'Missing app-root container');
        console.log('[PASS] Server HTTP GET test passed! Status: 200 OK');
        child.kill();
        process.exit(0);
      });
    }).on('error', (err) => {
      console.error('HTTP Request failed:', err);
      child.kill();
      process.exit(1);
    });
  }
});

child.stderr.on('data', (d) => {
  console.error('Server stderr:', d.toString());
});

setTimeout(() => {
  console.error('Timeout waiting for server to start');
  child.kill();
  process.exit(1);
}, 8000);
