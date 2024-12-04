import { BaseModel } from "./BaseModel.ts"

enum Gender { M, F, O }
namespace Gender {
    export function fromString(str: string): Gender {
        switch(str) {
            case 'M': return Gender.M
            case 'F': return Gender.F
            case 'O': return Gender.O
        }
        return undefined
    }
}
export {Gender}

export default class Person extends BaseModel
{

    public name?: string | null
    public surname?: string | null
    public email?: string | null
    public phone?: string | null
    public gender?: Gender | null
        
    constructor(
        {id, createdAt, updatedAt, name, surname, email, phone, gender}:
        BaseModel.CtorProps & {
            name?: string | null
            surname?: string | null
            email?: string | null
            phone?: string | null
            gender?: Gender | null
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
