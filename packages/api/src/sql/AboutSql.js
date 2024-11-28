import BaseSql from "./BaseSql"
import About from '../model/About.js'

export default class AboutSql extends BaseSql
{
    #db

    constructor(db) {
        super()
        this.#db = db
    }

    _getSelect() {
        return `
            SELECT A.ID, A.CREATED_AT, A.UPDATED_AT, AI.IMAGE_ID, AP.PARAGRAPH_ID
            FROM ABOUT A
            LEFT JOIN ABOUT_IMAGE AI ON A.ID = AI.ABOUT_ID   
            LEFT JOIN ABOUT_PARAGRAPH AP ON A.ID = AP.ABOUT_ID
        `
    }

    async findById(id) { 
        // get ABOUT from the database
        const sql = this._getSelect() + 'WHERE A.ID=?'
        const res = await this._execute(this.#db, sql, id)
        
        if(res.length == 0) return null

        // initialize the return object
        const about = new About({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT
        })
        return this._fillForeinKeys(about, res)
    }
}
