import { IProject } from '@/interfaces/IProject';

export interface ITask {
    id: number,
    description: string,
    durationInSeconds: number,
    project: IProject
}

export class Task {
    public id: number
    public description: string
    public durationInSeconds: number
    public project: IProject
    constructor (task: ITask) {
        this.id = task.id;
        this.description = task.description;
        this.durationInSeconds = task.durationInSeconds;
        this.project = task.project;
    }
}
