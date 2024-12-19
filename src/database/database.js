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

    select(table) {
        return this.#database[table] ?? [];
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
            this.#database[table][rowIndex] = { id, ...data };
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

}