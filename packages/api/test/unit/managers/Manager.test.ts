import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import BaseSql from '../../../src/sql/BaseSql';
import { BaseSqlObjects } from '../../TestObjects';
import Helper from '../../Helper';
import Manager from '../../../src/managers/Manager';

let res: any
beforeEach(() => {
    jest.spyOn(BaseSql.prototype, 'findById')
        .mockImplementation(async(id: number) => {
            if(id == 0) return BaseSqlObjects.minimal
        })
    jest.spyOn(BaseSql.prototype, 'findByIds')
        .mockImplementation(async(ids: number[]) => {
            if(ids.length == 1 && ids[0] == 0) return [BaseSqlObjects.minimal]
            throw `Wrong parameters in mock: BaseSql.findByids: ${ids}`
        })
    jest.spyOn(BaseSql.prototype, 'findAll')
        .mockImplementation(async() => {
            return [BaseSqlObjects.minimal]
        })
    res = Helper.mockResponse()
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('Manager', () => {
    describe('when querying by ID', () => {
        it('should reply: 200, minimal object as JSON', async () => {
            const req = Helper.mockRequest({},{id: 0})

            const manager = new Manager<any>(BaseSql.prototype)
            await manager.findById(req, res)

            Helper.expectResponseSuccess(res)
            expect(res.json).toHaveBeenCalledWith(BaseSqlObjects.minimal)
        })
    })
    describe('when querying by IDs', () => {
        it('sould reply: 200, minimal objects as JSON', async () => {
            const req = Helper.mockRequest({ids:[0]})

            const manager = new Manager<any>(BaseSql.prototype)
            await manager.findByIds(req, res)

            Helper.expectResponseSuccess(res)
            expect(res.json).toHaveBeenLastCalledWith([BaseSqlObjects.minimal])
        })
    })
    describe('when querying all', () => {
        it('should reply: 200 with minimal objects as JSON', async () => {
            const req = Helper.mockRequest()

            const manager = new Manager<any>(BaseSql.prototype)
            await manager.findAll(req, res)

            Helper.expectResponseSuccess(res)
            expect(res.json).toHaveBeenLastCalledWith([BaseSqlObjects.minimal])
        })
    })
})
