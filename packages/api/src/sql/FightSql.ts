import { Connection } from "mysql2/promise"
import Fight from "../model/Fight.ts"
import BaseSql from "./BaseSql.ts"
import { BaseRow } from "./BaseSql.ts"
import { ImageAggregRow, ParagraphAggregRow, PersonAggregRow } from "./AggregationsSql.ts"

interface FightRow extends BaseRow, ParagraphAggregRow, ImageAggregRow, PersonAggregRow
{
    TITLE: string,
    SUMMARY: string
}

export default class FightSql extends BaseSql<Fight, FightRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect() {
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

    public override async findById(id: number): Promise<Fight> {
        // get FIGHT from the database
        const sql = this.getSelect() + 'WHERE F.ID=?'
        const res = await this.execute(sql, id)

        if(res.length == 0) return null
        
        // initialize the return object
        const fight = new Fight({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT,

            title: res[0].TITLE,
            summary: res[0].SUMMARY
        })
        return this.fillForeignKeysFromLines(fight, res)
    }
}
