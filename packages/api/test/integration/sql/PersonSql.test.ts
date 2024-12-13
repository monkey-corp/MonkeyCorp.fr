import { beforeAll, afterAll, describe, it } from "@jest/globals"
import { Connection } from "mysql2/promise"
import Helper from "../Helper"
import { Gender } from '../../../src/model/Person.ts'
import PersonSql from '../../../src/sql/PersonSql.ts'

let db: Connection

beforeAll(async() => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if(db) await db.end()
})

const minimal = {
    id: 2,
    name: 'Minimal',
    surname: 'Person',
    email: 'minimal.person@mail.com',
    gender: Gender.O
}

describe('PersonSql', () => {
    describe('when PERSON are loaded with keys', () => {
        describe('and the keys are: 2', () => {
            it('should return: minimal', async() => {
                const personSql = new PersonSql(db)
                const persons = await personSql.findByIds([2])

                Helper.expectArray(persons, [minimal])
            })
        })
    })
})
