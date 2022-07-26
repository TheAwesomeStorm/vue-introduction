import { IProject } from '@/interfaces/IProject';

export interface ITask {
    description: string,
    durationInSeconds: number,
    project: IProject
}
