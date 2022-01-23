import * as task from 'threads'

export interface Task {
    id: string,
    amount: number,
    duration: number,
    thread: task.Thread,
}