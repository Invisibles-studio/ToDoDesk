interface TaskEntry {
    deskId: string,
    columnName: string,
    name: string,
    description: string,
    repeat: number,
    comments: [],
    id: string
}

export class Task{
    deskId: string
    columnName: string
    name: string
    description: string
    repeat: number
    comments: []
    id: string


    constructor(data: TaskEntry) {
        Object.assign(this, data)
    }

}