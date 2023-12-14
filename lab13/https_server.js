const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
    // Логіка обробки запитів
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, HTTPS World!');
});

const port = 3001;

server.listen(port, () => {
    console.log(`HTTPS server running on https://localhost:${port}`);
});
