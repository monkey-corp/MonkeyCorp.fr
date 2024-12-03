namespace BaseModel
{
    export type CtorParams = {
        id?: number,
        createdAt?: string | null,
        updatedAt?: string | null
    }
}

abstract class BaseModel
{
    public id?: number
    public createdAt?: string | null
    public updatedAt?: string | null

    constructor({id, createdAt, updatedAt}: BaseModel.CtorParams = {}) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {BaseModel}
