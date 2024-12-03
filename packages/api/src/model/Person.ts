import { BaseModel } from "./BaseModel.ts"

export default class Person extends BaseModel
{
    public name?: string | null
    public surname?: string | null
    public email?: string | null
    public phone?: string | null
    public gender?: string | null
        
    constructor(
        {id, createdAt, updatedAt, name, surname, email, phone, gender}:
        BaseModel.CtorParams & {
            name?: string | null
            surname?: string | null
            email?: string | null
            phone?: string | null
            gender?: string | null
        } = {}
    ) {
        super({id: id, createdAt: createdAt, updatedAt: updatedAt})
        
        this.name = name
        this.surname = surname
        this.email = email
        this.phone = phone
        this.gender = gender
    }
}
