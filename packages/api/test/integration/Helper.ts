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

    public static expectMatch(actual: any, expected: any) {
        expect(actual).toMatchObject(expected)
        expect(actual).toHaveProperty('createdAt')
        expect(actual).toHaveProperty('updatedAt')
    }

    public static expectArray(actual: any[], expected: any[]) {
        expect(actual).toHaveLength(expected.length)
        
        // sort to not take account of order
        actual = actual.sort(); expected = expected.sort()

        for(let i = 0; i < expect.length; i++) 
            this.expectMatch(actual[i], expected[i])
    }
}
