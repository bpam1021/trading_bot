import Upload from "./upload.entity";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";
import { Repository } from "typeorm";
export default class UploadsService {
    private uploadsRepository;
    constructor(uploadsRepository: Repository<Upload>);
    getAllTasks(): Promise<Upload[]>;
    getTaskById(id: number): Promise<Upload>;
    getTaskByClientId(clientId: number): Promise<Upload>;
    createTask(task: CreateTaskDto): Promise<Upload>;
    updateTask(id: number, task: UpdateTaskDto): Promise<Upload>;
    deleteTask(id: number): Promise<void>;
}
