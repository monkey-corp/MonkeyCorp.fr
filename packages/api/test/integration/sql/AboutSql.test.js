import AboutSql from '../../../src/sql/AboutSql.js'
import Helper from '../Helper.js'

let db = null

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

const minimal = {
    id: 1,
    paragraphs: [1],
    images: []
}
const small = {
    id: 2,
    paragraphs: [1],
    images: [1]
}

describe('AboutSql', () => {
    describe('when ABOUT is loaded by key', () => {
        describe('and the key is: 0', () => {
            it('should return: null', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(0)

                expect(about).toBeNull()
            })
        })
        describe('and the key is: 1', () => {
            it('should return: Minimal about', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(1)

                Helper.expectMatch(about, minimal)
            })
        })
        describe('and the key is: 2', () => {
            it('should return: Small about', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(2)

                Helper.expectMatch(about, small)
            })
        })
    })
})
