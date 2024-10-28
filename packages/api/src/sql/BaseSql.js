import NotImplementedError from "../error/NotImplementedError";

export default class BaseSql
{
    async findById(id){throw new NotImplementedError(`Method BaseSql.findByKey(key) must be implemented for class ${this.constructor.name}`)}
    async findByIds(ids){throw new NotImplementedError(`Method BaseSql.findByKeys(keys) must be implemented for class ${this.constructor.name}`)}
    async findAll(){throw new NotImplementedError(`Method BaseSql.findAll() must be implemented for class ${this.constructor.name}`)}
}