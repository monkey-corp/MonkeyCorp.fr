import { expect } from '@jest/globals'
import mysql, { Connection, ConnectionOptions } from 'mysql2/promise'
import DatabaseConnectionError from '../../src/error/DatabaseConnectionError.ts'

export default abstract class Helper
{
    // Database credentials, defined in Dockfile and docker-compose
    // TODO: secrets
    private static dbConfig: ConnectionOptions = {
        host: 'db-dev',
        database: 'monkey-corp-com',
        user: 'root',
        password: 'root'
    }

    private static db?: Connection

    public static async getConnexion(): Promise<Connection> {
        if(!this.db) 
            try {
                this.db = await mysql.createConnection(this.dbConfig)
            }
            catch(err) {
                throw new DatabaseConnectionError(err)
            }
        return this.db
    }

    public static expectMatch(obj: any, toMatch: any) {
        expect(obj).toMatchObject(toMatch)
        expect(obj).toHaveProperty('createdAt')
        expect(obj).toHaveProperty('updatedAt')
    }
}
