import TasksService from "./tasks.service";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";
import FindOneParams from "../utils/findOneParams";
import ClientTaskParams from "../utils/clientTaskParams";
export default class CategoriesController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Promise<import("./task.entity").default[]>;
    getTasksByClientId({ clientId, limit }: ClientTaskParams): Promise<any>;
    createTask(task: CreateTaskDto): Promise<import("./task.entity").default>;
    updateTask({ id }: FindOneParams, task: UpdateTaskDto): Promise<import("./task.entity").default>;
    deleteTask({ id }: FindOneParams): Promise<void>;
}
