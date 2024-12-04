import BaseSql, { BaseRow } from "./BaseSql.ts";
import Country from '../model/Country.ts'
import { Connection } from "mysql2/promise";
import { ImageAggregRow } from "./AggregationsSql.ts";

interface CountryRow extends BaseRow, ImageAggregRow
{
    NAME: string
}

export default class CountrySql extends BaseSql<Country, CountryRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect() {
        return `
            SELECT C.ID, C.CREATED_AT, C.UPDATED_AT, C.NAME, CI.IMAGE_ID
            FROM COUNTRY C
            LEFT JOIN COUNTRY_IMAGE CI ON C.ID = CI.COUNTRY_ID
        `
    }

    public override async findById(id: number): Promise<Country> {
        // get COUNTRY from the database
        const sql = this.getSelect() + 'WHERE C.ID=?'
        const res = await this.execute(sql, id)

        if(res.length == 0) return null;

        // initialize the return object
        let country = new Country({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT,
            name: res[0].NAME
        })
        return this.fillForeignKeysFromLines(country, res)
    }
}
