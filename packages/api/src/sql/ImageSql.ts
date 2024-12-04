import { Connection } from "mysql2/promise";
import Image from "../model/Image.ts";
import BaseSql, { BaseRow } from "./BaseSql.ts";

interface ImageRow extends BaseRow
{
    DATA: Buffer,
    ALT: string,
    CAPTION: string
}

export default class ImageSql extends BaseSql<Image, ImageRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect(): string {
        return `
            SELECT I.ID, I.CREATED_AT, I.UPDATED_AT, I.DATA, I.ALT, I.CAPTION
            FROM IMAGE I
        `
    }

    public override async findByIds(ids: number[]): Promise<Image[]> {
        // get IMAGES from the database
        const sql = this.getSelect() + 'WHERE I.ID IN(' + ids.map(id => '?').join(',') + ')'
        const res = await this.execute(sql, ...ids)

        return this.fill(res, (row) =>
            new Image({
                id: row.ID,
                createdAt: row.CREATED_AT,
                updatedAt: row.UPDATED_AT,

                data: row.DATA,
                alt: row.ALT,
                caption: row.CAPTION
            })
        )
    }
}
