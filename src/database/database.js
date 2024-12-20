import fs from 'node:fs/promises';

const databasePath = new URL('../../tasks.db', import.meta.url);

export class Database {

    constructor() {
        fs.readFile(databasePath, 'utf-8')
        .then(data => {
            this.#database = JSON.parse(data);
        })
        .catch(() => {
            this.#persist(); // just to create an empty database file
        });
    }

    // # makes database private property of Database class
    #database = {};

    // # makes persist a private method of Database class
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                });
            });
        }
        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();
    }

    update(table, id, data) {
        
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) { // -1 index not found

            const task = this.#database[table][rowIndex];
            task.title = data.title;
            task.description = data.description;
            task.updated_at = new Date();

            this.#database[table][rowIndex] = task;
            this.#persist();
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

    complete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            const task = this.#database[table][rowIndex];
            task.completed_at = new Date();
            this.#persist();
        }
    }
}