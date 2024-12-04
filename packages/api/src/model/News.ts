import { ImageAggreg, ParagraphAggreg, PersonAggreg } from "./Aggregations.ts"
import { BaseModel } from "./BaseModel.ts"

interface News extends ParagraphAggreg, ImageAggreg {}
class News extends BaseModel
{
    public title?: string | null
    public summary?: string | null
    public author?:string | null
    
    constructor(
        {id, createdAt, updatedAt, title, summary, author, paragraphs = [], images = []}:
        BaseModel.CtorProps & {
            title?: string | null
            summary?: string | null
            author?:string | null
            paragraphs?: number[]
            images?: number[]
        } = {paragraphs: [], images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})
        
        this.title = title
        this.summary = summary
        this.author = author
        this.paragraphs = paragraphs
        this.images = images
    }
}

export default News
