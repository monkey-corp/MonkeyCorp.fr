import { Connection } from "mysql2/promise";
import Person, { Gender } from "../model/Person.ts";
import BaseSql, { BaseRow } from "./BaseSql.ts";

interface PersonRow extends BaseRow
{
    NAME: string;
    SURNAME: string,
    EMAIL: string,
    PHONE: string,
    GENDER: string
}

export default class PersonSql extends BaseSql<Person, PersonRow>
{
    constructor(db: Connection) {
        super(db)
    }

    protected override getSelect(): string {
        return `
            SELECT P.ID, P.CREATED_AT, P.UPDATED_AT, 
                P.NAME, P.SURNAME, P.EMAIL, P.PHONE, P.GENDER
            FROM PERSON P
        `
    }

    public override async findByIds(ids: number[]): Promise<Person[]> {
        // get IMAGES from the database
        const sql = this.getSelect() + 'WHERE P.ID IN(' + ids.map(id => '?').join(',') + ')'
        const res = await this.execute(sql, ...ids)

        return this.fill(res, (row) => 
            new Person({
                id: row.ID,
                createdAt: row.CREATED_AT,
                updatedAt: row.UPDATED_AT,

                name: row.NAME,
                surname: row.SURNAME,
                email: row.EMAIL,
                phone: row.PHONE,
                gender: Gender.fromString(row.GENDER)
            })
        )
    }
}
