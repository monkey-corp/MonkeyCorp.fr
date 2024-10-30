export default class Encyclopedia
{
    constructor({
        key, 
        species, name,
        size_min, size_max, weight,
        description, habitat, country,
        trivia, source
    } = {}) {
        this.key = key
        this.species = species
        this.name = name
        this.size_min = size_min
        this.size_max = size_max
        this.weight = weight
        this.description = description
        this.habitat = habitat
        this.country = country
        this.trivia = trivia
        this.source = source
    }
}