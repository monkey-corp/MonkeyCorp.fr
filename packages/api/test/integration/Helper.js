import mysql from 'mysql2/promise'

export default class Helper
{
    // Database credentials, defined in Dockfile and docker-compose
    // TODO: secrets
    static dbConfig = {
        host: 'db-dev',
        database: 'monkey-corp-com',
        user: 'root',
        password: 'root'
    }

    static #db = null

    static async getConnexion() {
        if(this.#db == null) {
            this.#db = await mysql.createConnection(this.dbConfig)
        }
        return this.#db
    }
}