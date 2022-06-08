declare class Task {
    id: number;
    title: string;
    content: string;
    ownerId: number;
    clientId: number;
    status: number;
    uploadFiles?: number;
    attachFiles?: number;
    taskType: string;
    dueDate: Date;
}
export default Task;
