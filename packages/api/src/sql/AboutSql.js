import BaseSql from "./BaseSql"
import About from '../model/About.js'
import SqlQueryError from '../error/SqlQueryError.js'

export default class AboutSql extends BaseSql
{
    #db

    constructor(db) {
        super()
        this.#db = db
    }

    async findById(id) { 
        // get ABOUT from the database
        const sql = `
            SELECT A.ID, A.CREATED_AT, A.UPDATED_AT, AI.IMAGE_ID, AP.PARAGRAPH_ID
            FROM ABOUT A
            LEFT JOIN ABOUT_IMAGE AI ON A.ID = AI.ABOUT_ID   
            LEFT JOIN ABOUT_PARAGRAPH AP ON A.ID = AP.ABOUT_ID
            WHERE A.ID=?
        `
        let res = undefined, fields = undefined
        try {
            [res, fields] = await this.#db.execute(sql, [id])
        } 
        catch(err) {
            throw new SqlQueryError(err)
        }
        
        if(res.lenght == 0) return null

        // initialize the return object
        const about = new About({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT
        })
        // put forein keys in arrays
        for(let line of res) {
            if(line.PARAGRAPH_ID != null)
                about.paragraphs.push(line.PARAGRAPH_ID)

            if(line.IMAGE_ID != null)
                about.images.push(line.IMAGE_ID)
        }
        return about
    }
}