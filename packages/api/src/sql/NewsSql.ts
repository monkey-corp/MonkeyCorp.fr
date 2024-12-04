import { Connection } from "mysql2/promise";
import News from "../model/News.ts";
import { ParagraphAggregRow, ImageAggregRow, PersonAggregRow } from "./AggregationsSql.ts";
import BaseSql, { BaseRow } from "./BaseSql.ts";

interface NewsRow extends BaseRow, ParagraphAggregRow, ImageAggregRow, PersonAggregRow
{
    TITLE: string
    SUMMARY: string
}

export default class NewsSql extends BaseSql<News, NewsRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect(): string {
        return `
            SELECT
                N.ID, N.CREATED_AT, N.UPDATED_AT, N.TITLE, N.SUMMARY,
                NP.PARAGRAPH_ID, NI.IMAGE_ID, NPE.PERSON_ID
            FROM NEWS N
            LEFT JOIN NEWS_PARAGRAPH NP ON N.ID = NP.NEWS_ID
            LEFT JOIN NEWS_IMAGE NI ON N.ID = NI.NEWS_ID
            LEFT JOIN NEWS_PERSON NPE ON N.ID = NPE.NEWS_ID
        `
    }

    public override async findAll(): Promise<News[]> {
        // get all NEWS from the database
        const sql = this.getSelect() + 'ORDER BY N.ID'
        const res = await this.execute(sql)

        return this.fill(res, (row) => 
            new News({
                id: row.ID,
                createdAt: row.CREATED_AT,
                updatedAt: row.UPDATED_AT,

                title: row.TITLE,
                summary: row.SUMMARY
            })
        )
    }
}
