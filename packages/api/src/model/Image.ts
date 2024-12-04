import { BaseModel } from "./BaseModel.ts"

export default class Image extends BaseModel
{
    public data?: Blob | null
    public alt?: string | null
    public caption?: string | null

    constructor(
        {id, createdAt, updatedAt, data, alt, caption} :
        BaseModel.CtorProps & {
            data?: Blob | null
            alt?: string | null
            caption?: string | null
        } = {}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})
        
        this.data = data
        this.alt = alt
        this.caption = caption
    }
}
