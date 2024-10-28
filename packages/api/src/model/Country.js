export default class Country
{
    constructor({id, createdAt, updatedAt, name, flags = []} = {}) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt

        this.name = name
        this.flags = flags
    }
}