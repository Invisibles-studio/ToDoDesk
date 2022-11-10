interface TaskEntry {
    deskId: string,
    columnName: string,
    name: string,
    description: string,
    repeat: number,
    comments: [],
    id: string,
    executor: string,
    finalDone: boolean,
    doneTime: number
}

export class Task{
    deskId: string
    columnName: string
    name: string
    description: string
    repeat: number
    comments: []
    id: string
    executor: string
    finalDone: boolean
    doneTime: number


    constructor(data: TaskEntry) {
        Object.assign(this, data)
    }

}