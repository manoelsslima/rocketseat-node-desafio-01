import { randomUUID } from 'node:crypto';
import { Database } from "./database/database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            
            const tasks = database.select('tasks');
            
            return res.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

        const { title, description } = req.body;

        const task = {
            id: randomUUID(),
            title,
            description,
            created_at: new Date()
        };

        database.insert('tasks', task);

        return res.writeHead(201).end('Criação de tarefa');
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            database.update('tasks', id, {title, description});
            return res.writeHead(204).end();
        }

    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

        }

    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {

        }

    }
]