
interface UserEntry {
    firstname: string,
    lastname: string,
    mail: string,
    username: string,
    role: string,
    id: string,
    createrId: string
}

export class User{
    constructor(data: UserEntry) {
        Object.assign(this, data)
    }
}