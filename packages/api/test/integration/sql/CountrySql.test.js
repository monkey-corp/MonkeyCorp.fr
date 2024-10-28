import CountrySql from "../../../src/sql/CountrySql"
import Helper from "../Helper.js"

let db = null

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

describe('CountrySql', () => {
    describe('when COUNTRY is loaded by key', () => {
        describe('and the key is: 1', () => {
            it('should return: Minimal country (insert.sql:29)', async() => {
                const countrySql = new CountrySql(db)
                const country = await countrySql.findById(1)

                expect(country).toMatchObject({
                    id: 1,
                    name: 'Minimal country',
                    flags: [2]
                })
                expect(country).toHaveProperty('createdAt')
                expect(country).toHaveProperty('updatedAt')
            })
        })
    })
})