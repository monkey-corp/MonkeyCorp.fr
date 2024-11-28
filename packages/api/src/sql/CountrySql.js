import SqlQueryError from "../error/SqlQueryError.js";
import BaseSql from "./BaseSql.js";
import Country from '../model/Country.js'

export default class CountrySql extends BaseSql
{
    #db

    constructor(db) {
        super()
        this.#db = db
    }

    _getSelect() {
        return `
            SELECT C.ID, C.CREATED_AT, C.UPDATED_AT, C.NAME, CI.IMAGE_ID
            FROM COUNTRY C
            LEFT JOIN COUNTRY_IMAGE CI ON C.ID = CI.COUNTRY_ID
        `
    }

    async findById(id) {
        // get COUNTRY from the database
        const sql = this._getSelect() + 'WHERE C.ID=?'
        const res = await this._execute(this.#db, sql, id)

        if(res.length == 0) return null;

        // initialize the return object
        let country = new Country({
            id: res[0].ID,
            createdAt: res[0].CREATED_AT,
            updatedAt: res[0].UPDATED_AT,
            name: res[0].NAME
        })
        country = this._fillForeinKeys(country, res)

        // image list is named `flags`, fill the array here
        for(let line of res) {
            if(line.IMAGE_ID != null)
                country.flags.push(line.IMAGE_ID)
        }

        return country
    }
}
