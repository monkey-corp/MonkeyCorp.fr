export default class News
{
    constructor({key, title, summary, author, paragraphs, images} = {}) {
        this.key = key
        this.title = title
        this.summary = summary
        this.author = author
        this.paragraphs = paragraphs
        this.images = images
    }
}