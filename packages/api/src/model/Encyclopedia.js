export default class Encyclopedia
{
    constructor({
        id, createdAt, updatedAt,
        species, name,
        size_min, size_max, weight,
        description, habitat, countries = [],
        images = [], trivias = [], source = []
    } = {}) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt

        this.species = species
        this.name = name
        this.size_min = size_min
        this.size_max = size_max
        this.weight = weight
        this.description = description
        this.habitat = habitat

        this.countries = countries
        this.images = images
        this.trivias = trivias
        this.sources = source
    }
}