import { Connection } from "mysql2/promise";
import Paragraph from "../model/Paragraph.ts";
import BaseSql, { BaseRow } from "./BaseSql.ts";

interface ParagraphRow extends BaseRow
{
    CONTENT: string
}

export default class ParagraphSql extends BaseSql<Paragraph, ParagraphRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect(): string {
        return `
            SELECT P.ID, P.CREATED_AT, P.UPDATED_AT, P.CONTENT
            FROM PARAGRAPH P
        `
    }

    public override async findByIds(ids: number[]): Promise<Paragraph[]> {
        // get PARAGRAPH from the database
        const sql = this.getSelect() + 'WHERE P.ID IN (' + ids.map(id => '?').join(',') + ')'
        const res = await this.execute(sql, ...ids)

        return this.fill(res, (row) => 
            new Paragraph({
                id: row.ID,
                createdAt: row.CREATED_AT,
                updatedAt: row.UPDATED_AT,
                
                content: row.CONTENT
            })
        )
    }
}
