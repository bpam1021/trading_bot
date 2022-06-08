import CategoriesService from "./categories.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import FindOneParams from "../utils/findOneParams";
export default class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<import("./category.entity").default[]>;
    getCategoryById({ id }: FindOneParams): Promise<import("./category.entity").default>;
    createCategory(category: CreateCategoryDto): Promise<import("./category.entity").default>;
    updateCategory({ id }: FindOneParams, category: UpdateCategoryDto): Promise<import("./category.entity").default>;
    deleteCategory({ id }: FindOneParams): Promise<void>;
}
