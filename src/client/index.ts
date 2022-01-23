import { ClientEntity } from "./clientEntity";
import { spawn, Thread, Worker } from "threads";
import { Task } from "./interfrace";

export class ClientEntityCluster {
    private clients: Array<ClientEntity> = [];
    private tasks: Array<Task> = [];

    constructor() {

    }

    addEntity(entity: ClientEntity) {
        this.clients.push(entity)
        return this.clients.length
    }

    stopTask(id: string) {
        const task = this.tasks.find((task) => {
            return task.id === id
        })

        this.tasks = this.tasks.filter(t => t !== task)

        console.log(`stop task for ${id}`)
        return Thread.terminate(task.thread)
    }

    async addTask(id: string, amount: number, duration: number)
    {
        if(amount > this.clients.length) {
            return JSON.stringify({ok: false, message: `the maximum number of viewers at the moment is ${this.clients.length}`})
        }

        const task = await spawn(new Worker('../core/index'))

        const data: Task = {
            id: id,
            amount: amount,
            duration: duration,
            thread: task
        }

        this.tasks.push(data)

        const clients: Array<ClientEntity> = clientEntityCluster.get(amount);
        const param: Array<Object> = [];

        clients.forEach(clients => param.push({
            proxy: clients.device['proxy'],
            device: {
                userAgent: clients.device['userAgent']
            }
        }))

        task.start(id, amount, duration, param)

        Thread.events(task).subscribe(event => console.log('Thread event:', event))
        setTimeout(() => this.stopTask(id), duration * 1000);
    }

    get length() {
        return this.clients.length;
    }

    get instances() {
        return this.clients
    }

    get(amount) {
        return this.clients.slice(0, this.clients.length < amount ? this.clients.length : amount)
    }

}

export const clientEntityCluster = new ClientEntityCluster();