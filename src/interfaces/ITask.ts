import { IProject } from '@/interfaces/IProject';

export interface ITask {
    id: number,
    description: string,
    durationInSeconds: number,
    project: IProject
}
