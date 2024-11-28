import FightSql from "../../../src/sql/FightSql"
import Helper from "../Helper"

let db = null

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if(db) await db.end()
})

const minimal = {
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
