import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants/types';
import { ApplicationError } from '../../core/ApplicationError';
import { ICategoryRepository } from '../../domain/category/ICategoryRepository';
import { CategoryDto } from './dtos/CategoryDto';
import { Category } from '../../domain/category/Category';

@injectable()
export class CategoryApplication {
    constructor(
        @inject(TYPES.CategoryRepository)
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async getAllCategories(): Promise<any[]> {
        const categories = await this.categoryRepository.findAll();
        return categories.map(category => new CategoryDto(category.guid, category.name ));
    }

    async getCategoryById(id: string): Promise<any | null> {
        const category = await this.categoryRepository.findOneById(id);
        if (!category) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return new CategoryDto(category.guid, category.name);
    }

    async createCategory({ name }: any): Promise<void> {
        const category = Category.create({ name });
        
        await this.categoryRepository.save(category);
    }

    async updateCategoryById(id: string,{ name }: any ): Promise<void> {
        const category = await this.categoryRepository.findOneById(id);
        if (!category) throw 'Category not found';
        
        // copy userParam properties to user
        Object.assign(category, { name });

        await this.categoryRepository.save(category);
    }

    async deleteCategoryById(id: string): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
