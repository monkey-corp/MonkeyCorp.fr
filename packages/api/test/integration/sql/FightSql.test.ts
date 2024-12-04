import { beforeAll, afterAll, describe, it, expect } from "@jest/globals"
import FightSql from "../../../src/sql/FightSql.ts"
import Helper from "../Helper.ts"
import { Connection } from "mysql2/promise"

let db: Connection 

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if(db) await db.end()
})

const minimal = {
    id: 1,
    title: 'Minimal title',
    summary: 'Minimal summary',
    persons: [1],
    paragraphs: [1]
}

describe('FightSql', () => {
    describe('when FIGHT is loaded by key', () => {
        describe('and the key is: 0', () => {
            it('should return: null', async() => {
                const fightSql = new FightSql(db)
                const fight = await fightSql.findById(0)

                expect(fight).toBeNull()
            })
        })
        describe('and the key is: 1', () => {
            it('should return: Minimal fight', async () => {
                const fightSql = new FightSql(db)
                const fight = await fightSql.findById(1)

                Helper.expectMatch(fight, minimal)
            })
        })
    })
})
