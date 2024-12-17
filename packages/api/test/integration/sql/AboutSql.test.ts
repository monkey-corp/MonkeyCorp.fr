import { beforeAll, afterAll, describe, it } from '@jest/globals'
import AboutSql from '../../../src/sql/AboutSql.ts'
import Helper from '../Helper.ts'
import { Connection } from 'mysql2/promise'
import { expect } from '@jest/globals'
import { AboutObjects } from '../../TestObjects.ts'

let db: Connection

beforeAll(async () => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if (db) await db.end()
})

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

                Helper.expectMatch(about, AboutObjects.minimal)
            })
        })
        describe('and the key is: 2', () => {
            it('should return: Small about', async() => {
                const aboutSql = new AboutSql(db)
                const about = await aboutSql.findById(2)

                Helper.expectMatch(about, AboutObjects.small)
            })
        })
    })
})
