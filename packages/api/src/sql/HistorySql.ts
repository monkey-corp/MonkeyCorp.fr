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

        const histories: History[] = []; let history: History
        // fill the return array with unique HISTORY
        for(let i = 0; i < res.length; i++) {
            // continue if ID already done (possible with ORDER BY)
            if(i != 0 && res[i - 1].ID == res[i].ID) continue

            // create model object
            history = new History({
                id: res[i].ID,
                createdAt: res[i].CREATED_AT,
                updatedAt: res[i].UPDATED_AT,

                title: res[i].TITLE
            })
            // get lines with same ID and fill foreign keys
            for(let j = i; j < res.length && res[j].ID == res[i].ID; j++)
                history = this.fillForeignKeys(history, res[j])

            histories.push(history)
        }

        return histories
    }
}
