import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js';
import { Database } from './database/database.js';

const database = new Database();

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res); // json is async function so it must be called using await

    if (method === 'GET' && url === '/tasks') {
        const tasks = database.select('tasks');
        return res
            .writeHead(200)
            .end(JSON.stringify(tasks));
    }

    if (method === 'POST' && url === '/tasks') {

        const { title, description } = req.body;

        const task = {
            id: randomUUID(),
            title,
            description,
            created_at: new Date()
        };

        database.insert('tasks', task);

        return res
            .writeHead(201)
            .end('Criação de tarefa');
    }

    if (method === 'PUT' && url === '/tasks/:id') {

    }

    if (method === 'DELETE' && url === '/tasks/:id') {

    }

    if (method === 'PATCH' && url === '/tasks/:id/complete') {
        
    }

    return res
        .writeHead(404)
        .end();
});

server.listen(3333);