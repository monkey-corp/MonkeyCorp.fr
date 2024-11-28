export default class Fight
{
    constructor({
        id, createdAt, updatedAt, 
        title, summary,
        paragraphs = [], images = [], persons = []
    } = {}){
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt

        this.title = title
        this.summary = summary

        this.paragraphs = paragraphs
        this.images = images
        this.persons = persons
    }
}
