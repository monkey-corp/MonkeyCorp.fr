import { ImageAggreg, ParagraphAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

export default class About extends BaseModel implements ParagraphAggreg, ImageAggreg
{
    public paragraphs: number[]
    public images: number[]

    constructor(
        {id, createdAt, updatedAt, paragraphs = [], images = []}: 
        BaseModel.CtorParams & {
            paragraphs?: number[],
            images?:number[]
        } = {paragraphs: [], images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})

        this.paragraphs = paragraphs
        this.images = images
    }
}
