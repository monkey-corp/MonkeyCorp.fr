import { ImageAggreg, ParagraphAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

interface About extends ParagraphAggreg, ImageAggreg {}
class About extends BaseModel 
{
    constructor(
        {id, createdAt, updatedAt, paragraphs = [], images = []}: 
        BaseModel.CtorProps & {
            paragraphs?: number[],
            images?:number[]
        } = {paragraphs: [], images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})

        this.paragraphs = paragraphs
        this.images = images
    }
}

export default About
