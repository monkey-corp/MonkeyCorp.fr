import Fight from "../model/Fight"
import BaseSql from "./BaseSql"

export default class FightSql extends BaseSql
{
    #db

    constructor(db) {
        super()
        this.#db = db
    }

    _getSelect() {
        return `
            SELECT 
                F.ID, F.CREATED_AT, F.UPDATED_AT,
                FP.PARAGRAPH_ID, FI.IMAGE_ID, FPE.PERSON_ID,
                F.TITLE, F.SUMMARY
            FROM FIGHT F
            LEFT JOIN FIGHT_PARAGRAPH FP ON F.ID = FP.FIGHT_ID
            LEFT JOIN FIGHT_IMAGE FI ON F.ID = FI.FIGHT_ID
            LEFT JOIN FIGHT_PERSON FPE  ON F.ID = FPE.FIGHT_ID
        `
    }

    async findById(id) {
        // get FIGHT from the database
        const sql = this._getSelect() + 'WHERE F.ID=?'
        const res = await this._execute(this.#db, sql, id)

        if(res.length == 0) return null
        
        // initialize the return object
        const fight = new Fight({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT,

            title: res[0].TITLE,
            summary: res[0].SUMMARY
        })
        return this._fillForeinKeys(fight, res)
    }
}
