import { Connection } from "mysql2/promise";
import History from "../model/History.ts";
import { ImageAggregRow, ParagraphAggregRow } from "./AggregationsSql.ts";
import BaseSql, { BaseRow as BaseRow } from "./BaseSql.ts";

interface HistoryRow extends BaseRow, ImageAggregRow, ParagraphAggregRow
{
    TITLE: string
}

export default class HistorySql extends BaseSql<History, HistoryRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect(): string {
        return `
            SELECT H.ID, H.CREATED_AT, H.UPDATED_AT, H.TITLE, HP.PARAGRAPH_ID, HI.IMAGE_ID
            FROM HISTORY H
            LEFT JOIN HISTORY_IMAGE HI ON H.ID = HI.HISTORY_ID
            LEFT JOIN HISTORY_PARAGRAPH HP ON H.ID = HP.HISTORY_ID
        `
    }

    public override async findAll(): Promise<History[]> {
        // get all HISTORY from the database
        const sql = this.getSelect() + 'ORDER BY H.ID'
        const res = await this.execute(sql)

        return this.fill(res, (row) => 
             new History({
                id: row.ID,
                createdAt: row.CREATED_AT,
                updatedAt: row.UPDATED_AT,

                title: row.TITLE
            })
        )
    }
}
