import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import Category from "./category.entity";
export default class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    createCategory(category: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, category: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
