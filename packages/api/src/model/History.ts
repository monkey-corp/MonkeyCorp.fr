import { BaseModel } from "./BaseModel.ts"

export default class History extends BaseModel
{
    public title?: string | null
    public paragraphs: number[]
    public images: number[]

    constructor(
        {id, createdAt, updatedAt, title, paragraphs, images}:
        BaseModel.CtorParams & {
            title?: string | null,
            paragraphs?: number[],
            images?: number[]
        } = {paragraphs: [], images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})
        
        this.title = title
        this.paragraphs = paragraphs
        this.images = images
    }
}
