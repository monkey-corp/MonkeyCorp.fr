import { ImageAggreg, ParagraphAggreg, PersonAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

interface Fight extends ParagraphAggreg, ImageAggreg, PersonAggreg {}
class Fight extends BaseModel
{
    public title?: string | null
    public summary?: string | null

    constructor(
        {
            id, createdAt, updatedAt, 
            title, summary,
            paragraphs = [], images = [], persons = []
        }:
        BaseModel.CtorProps & {
            title?: string | null,
            summary?: string | null,
            paragraphs?: number[],
            images?: number[],
            persons?: number[]
        } = {paragraphs: [], images: [], persons: []}
    ){
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})

        this.title = title
        this.summary = summary

        this.paragraphs = paragraphs
        this.images = images
        this.persons = persons
    }
}

export default Fight
