import Task from "./task.entity";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";
import { Repository } from "typeorm";
export default class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    getTaskByClientId(clientId: number, limitnum: number): Promise<any>;
    createTask(task: CreateTaskDto): Promise<Task>;
    updateTask(id: number, task: UpdateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<void>;
}
