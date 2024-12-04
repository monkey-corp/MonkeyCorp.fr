import { ImageAggreg, ParagraphAggreg } from "./Aggregations.ts"
import { BaseModel } from "./BaseModel.ts"

interface History extends ParagraphAggreg, ImageAggreg {}
class History extends BaseModel
{
    public title?: string | null

    constructor(
        {id, createdAt, updatedAt, title, paragraphs = [], images = []}:
        BaseModel.CtorProps & {
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

export default History
