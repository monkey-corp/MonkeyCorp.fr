import { BaseModel } from "./BaseModel.ts"

export default class Paragraph extends BaseModel
{
    public content?: string | null

    constructor(
        {id, createdAt, updatedAt, content}:
        BaseModel.CtorParams & {
            content?: string | null
        } = {}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})
        
        this.content = content
    }
}
