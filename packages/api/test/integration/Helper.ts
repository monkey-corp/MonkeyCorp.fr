import 'dotenv/config'
import { expect } from '@jest/globals'
import mysql, { Connection, ConnectionOptions } from 'mysql2/promise'
import DatabaseConnectionError from '../../src/error/DatabaseConnectionError.ts'

export default abstract class Helper
{
    private static dbConfig: ConnectionOptions = {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
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
