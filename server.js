const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
let initialPort = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port: initialPort });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const startServer = (portToTry) => {
    server.listen(portToTry, (err) => {
      if (err) {
        console.error(`> Failed to start on port ${portToTry}:`, err);
        return;
      }
      console.log(`> Ready on http://${hostname}:${portToTry}`);
    });
  };

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.warn(`> Port ${initialPort} is in use. Trying port ${initialPort + 1}...`);
      initialPort += 1;

      app.port = initialPort;

      startServer(initialPort);
    } else {
      console.error('> Server error:', e);
    }
  });

  startServer(initialPort);
});