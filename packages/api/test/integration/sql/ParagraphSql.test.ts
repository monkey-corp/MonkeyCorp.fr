import { beforeAll, afterAll, describe, it } from "@jest/globals"
import { Connection } from "mysql2/promise"
import Helper from "../Helper"
import ParagraphSql from '../../../src/sql/ParagraphSql.ts'

let db: Connection

beforeAll(async() => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if(db) await db.end()
})

const minimal = {
    id: 2,
    content: 'A minimal paragraph'
}

describe('ParagraphSql', () => {
    describe('when PARAGRAPH are loaded with keys', () => { 
        describe('and the keys are: 2', () => {
            it('should return: minimal', async() => {
                const paragraphSql = new ParagraphSql(db)
                const paragraphs = await paragraphSql.findByIds([2])

                Helper.expectArray(paragraphs, [minimal])
            })
        })
     })
})
