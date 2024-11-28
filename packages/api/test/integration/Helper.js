import mysql from 'mysql2/promise'
import DatabaseConnectionError from '../../src/error/DatabaseConnectionError'

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
        if(this.#db == null) 
            try {
                this.#db = await mysql.createConnection(this.dbConfig)
            }
            catch(err) {
                throw new DatabaseConnectionError(err)
            }
        return this.#db
    }

    static expectMatch(obj, toMatch) {
        expect(obj).toMatchObject(toMatch)
        expect(obj).toHaveProperty('createdAt')
        expect(obj).toHaveProperty('updatedAt')
    }
}
