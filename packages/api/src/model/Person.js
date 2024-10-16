export default class Person
{
    constructor({key, name, surname, email, phone, gender} = {}) {
        this.key = key
        this.name = name
        this.surname = surname
        this.email = email
        this.phone = phone
        this.gender = gender
    }
}