import http from 'node:http';

const tasks = [];

const server = http.createServer((req, res) => {

    const { method, url } = req;

    if (method === 'GET' && url === '/tasks') {
        return res
            .setHeader('Content-Type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify(tasks));
    }

    return res
        .writeHead(404)
        .end();
});

server.listen(3333);