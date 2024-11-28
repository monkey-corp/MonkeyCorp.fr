import NotImplementedError from "../error/NotImplementedError";
import SqlQueryError from '../error/SqlQueryError.js'

export default class BaseSql
{
    _getSelect(){throw new NotImplementedError(`Method BaseSql.getSelect(key) must be implemented for class ${this.constructor.name}`)}
    
    async findById(id){throw new NotImplementedError(`Method BaseSql.findByKey(key) must be implemented for class ${this.constructor.name}`)}
    async findByIds(ids){throw new NotImplementedError(`Method BaseSql.findByKeys(keys) must be implemented for class ${this.constructor.name}`)}
    async findAll(){throw new NotImplementedError(`Method BaseSql.findAll() must be implemented for class ${this.constructor.name}`)}

    async _execute(db, sql, ...params) {
        let res, fields
        try {
            [res, fields] = await db.query(sql, [...params])
        }
        catch(err) {
            throw new SqlQueryError(err)
        }

        return res
    }

    /**
     * Puts forein keys in the relevant arrays
     */
    _fillForeinKeys(obj, lines) {
        for(let line of lines) {
            if(line.PARAGRAPH_ID != null && obj.paragraphs != null)
                obj.paragraphs.push(line.PARAGRAPH_ID)

            if(line.IMAGE_ID != null && obj.images != null)
                obj.images.push(line.IMAGE_ID)

            if(line.PERSON_ID != null && obj.persons != null)
                obj.persons.push(line.PERSON_ID)
        }
        return obj
    }
}
