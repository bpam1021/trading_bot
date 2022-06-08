declare class CreateTaskDto {
    content?: string;
    title?: string;
    ownerId?: number;
    status: number;
    clientId?: number;
    attachFiles?: number;
    uploadFiles?: number;
    taskType?: string;
    dueDate?: Date;
}
export default CreateTaskDto;
