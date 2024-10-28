export default class About
{
    constructor({id, createdAt, updatedAt, paragraphs = [], images = []} = {}) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        
        this.paragraphs = paragraphs
        this.images = images
    }
}