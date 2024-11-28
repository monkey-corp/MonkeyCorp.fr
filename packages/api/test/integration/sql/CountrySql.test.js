import CountrySql from "../../../src/sql/CountrySql"
import Helper from "../Helper.js"

let db = null

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

const minimal = {
    id: 1,
    name: 'Minimal country',
    flags: [1]
}

describe('CountrySql', () => {
    describe('when COUNTRY is loaded by key', () => {
        describe('and the key is: 0', () => {
            it('should return: null', async() => {
                const countrySql = new CountrySql(db)
                const country = await countrySql.findById(0)

                expect(country).toBeNull()
            })
        })
        describe('and the key is: 1', () => {
            it('should return: Minimal country', async() => {
                const countrySql = new CountrySql(db)
                const country = await countrySql.findById(1)

                Helper.expectMatch(country, minimal)
            })
        })
    })
})
