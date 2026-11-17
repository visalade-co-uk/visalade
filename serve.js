'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2'
};

function send(res, file) {
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
        'Content-Type': TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
    });
    fs.createReadStream(file).pipe(res);
}

http.createServer(function (req, res) {
    let pathname;
    try {
        pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch (e) {
        res.writeHead(400);
        res.end('Bad request');
        return;
    }

    if (pathname.endsWith('/')) pathname += 'index.html';

    let file = path.normalize(path.join(ROOT, pathname));

    if (!file.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        const html = file + '.html';
        if (fs.existsSync(html)) {
            send(res, html);
            return;
        }
        const notFound = path.join(ROOT, '404.html');
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        if (fs.existsSync(notFound)) {
            fs.createReadStream(notFound).pipe(res);
        } else {
            res.end('Not found');
        }
        return;
    }

    send(res, file);
}).listen(PORT, function () {
    console.log(`\nVisalade preview: http://localhost:${PORT}\n`);
});
