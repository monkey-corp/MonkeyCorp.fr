import About from '../../../src/model/About.js'
import AboutSql from '../../../src/sql/AboutSql.js'
import Helper from '../Helper.js'

let db = null

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

describe('AboutSql', () => {
    describe('when ABOUT is loaded by key', () => {
        describe('and the key is: 1', () => {
            it('should return: Minimal about (insert.sql:3)', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(1)

                expect(about).toMatchObject({
                    id: 1,
                    paragraphs: [1],
                    images: []
                })
                expect(about).toHaveProperty('createdAt')
                expect(about).toHaveProperty('updatedAt')
            })
        })
        describe('and the key is: 2', () => {
            it('should return: Small about (insert.sql:13)', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(2)

                expect(about).toMatchObject({
                    id: 2,
                    paragraphs: [2],
                    images: [1]
                })
                expect(about).toHaveProperty('createdAt')
                expect(about).toHaveProperty('updatedAt')
            })
        })
    })
})
