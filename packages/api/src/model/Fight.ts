import { ImageAggreg, ParagraphAggreg, PersonAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

export default class Fight extends BaseModel implements ParagraphAggreg, ImageAggreg, PersonAggreg
{
    public title?: string | null
    public summary?: string | null

    public paragraphs: number[]
    public images: number[]
    public persons: number[]

    constructor(
        {
            id, createdAt, updatedAt, 
            title, summary,
            paragraphs = [], images = [], persons = []
        }:
        BaseModel.CtorParams & {
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
