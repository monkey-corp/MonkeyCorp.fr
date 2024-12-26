import { beforeAll, afterAll, describe, it, expect } from "@jest/globals"
import CountrySql from "../../../src/sql/CountrySql.ts"
import Helper from "../Helper.ts"
import { Connection } from "mysql2/promise"
import { CountryObjects } from "../../TestObjects.ts"

let db: Connection

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

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

                Helper.expectMatch(country, CountryObjects.minimal)
            })
        })
    })
})
