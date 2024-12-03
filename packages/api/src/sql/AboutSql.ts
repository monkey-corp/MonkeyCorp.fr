import BaseSql, { BaseRows } from "./BaseSql.ts"
import About from '../model/About.ts'
import { Connection } from "mysql2/promise"
import { ImageAggregRow, ParagraphAggregRow } from './AggregationsSql.ts'

interface AboutRows extends BaseRows, ParagraphAggregRow, ImageAggregRow {}

export default class AboutSql extends BaseSql<About, AboutRows>
{
    constructor(db: Connection) {
        super(db)
    }

    protected getSelect() {
        return `
            SELECT A.ID, A.CREATED_AT, A.UPDATED_AT, AI.IMAGE_ID, AP.PARAGRAPH_ID
            FROM ABOUT A
            LEFT JOIN ABOUT_IMAGE AI ON A.ID = AI.ABOUT_ID   
            LEFT JOIN ABOUT_PARAGRAPH AP ON A.ID = AP.ABOUT_ID
        `
    }

    public async findById(id: number): Promise<About> { 
        // get ABOUT from the database
        const sql = this.getSelect() + 'WHERE A.ID=?'
        const res = await this.execute(sql, id)
        
        if(res.length == 0) return null

        // initialize the return object
        const about = new About({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT
        })
        
        return this.fillForeignKeys(about, res)
    }
}
