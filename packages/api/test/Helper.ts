import { expect, jest } from '@jest/globals'
import { Connection, ConnectionOptions } from 'mysql2/promise'
import SqlConnnection from '../src/SqlConnection'
import { Request, Response } from 'express'

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

    public static expectMatchSql(actual: any, expected: any) {
        expect(actual).toMatchObject(expected)
        expect(actual).toHaveProperty('createdAt')
        expect(actual).toHaveProperty('updatedAt')
    }

    public static expectArraySql(actual: any[], expected: any[]) {
        expect(actual).toHaveLength(expected.length)
        
        // sort to not take account of order
        actual = actual.sort(); expected = expected.sort()

        for(let i = 0; i < expect.length; i++) 
            this.expectMatchSql(actual[i], expected[i])
    }

    public static mockRequest(body = {}, params = {}, query = {}, headers = {}) {
        return {
            body,
            params,
            query,
            headers
        } as Request
    }

    public static mockResponse() {
        const res: {send?: any, status?: any, json?: any} = {};
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

    public static expectResponseSuccess(resMock: any) {
        expect(resMock.status).toHaveBeenCalledWith(200)
        expect(resMock.send).toHaveBeenCalled()
    }
}
