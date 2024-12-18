import http from 'node:http';

const server = http.createServer((req, res) => {
    return res.end('Server is running...');
});

server.listen(3333);