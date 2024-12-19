import { expect } from '@jest/globals'
import { Connection, ConnectionOptions } from 'mysql2/promise'
import SqlConnnection from '../../src/SqlConnection'

export default abstract class Helper
{
    private static dbOptions: ConnectionOptions = {
        host: 'db-dev',
        database: 'monkey-corp-com',
        user: 'root',
        password: 'root'
    }

    public static async getConnexion(): Promise<Connection> {
        SqlConnnection.setOptions(this.dbOptions)
        return SqlConnnection.get()
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
