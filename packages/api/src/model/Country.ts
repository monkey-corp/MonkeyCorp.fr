import { ImageAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

export default class Country extends BaseModel implements ImageAggreg
{
    public name?: string | null
    public images: number[]

    constructor(
        {id, createdAt, updatedAt, name, images = []}:
        BaseModel.CtorParams & {
            name?: string | null,
            images?: number[]
        } = {images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})

        this.name = name
        this.images = images
    }
}
