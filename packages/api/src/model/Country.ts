import { ImageAggreg } from "./Aggregations.ts"
import {BaseModel} from "./BaseModel.ts"

interface Country extends ImageAggreg {}
class Country extends BaseModel
{
    public name?: string | null

    constructor(
        {id, createdAt, updatedAt, name, images = []}:
        BaseModel.CtorProps & {
            name?: string | null,
            images?: number[]
        } = {images: []}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})

        this.name = name
        this.images = images
    }
}

export default Country
