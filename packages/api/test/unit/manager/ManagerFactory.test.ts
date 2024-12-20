import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import AboutSql from '../../../src/sql/AboutSql'
import ManagerFactory from '../../../src/manager/ManagerFactory'
import SqlConnection from "../../../src/SqlConnection";
import Helper from "../../Helper";
import About from "../../../src/model/About";

let req: any, res: any, findById: any
beforeEach(() => {
    [req, res] = [Helper.mockRequest(), Helper.mockResponse()]
    jest.spyOn(SqlConnection, 'get')
        .mockImplementation(async () => ({
            query: jest.fn()
        }) as any)

    findById = jest.spyOn(AboutSql.prototype, 'findById')
        .mockImplementation(async (id: number) => new About())
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('ManagerFactory', () => {
    describe('when creating a Manager', () => {
        describe('for type: AboutSql', () => {
            it('should return: a Manager managing AboutSql', async() => {
                const manager = await ManagerFactory.create(AboutSql)

                manager.findById(req, res)

                expect(findById).toHaveBeenCalled()
            })
        })
    })
})
