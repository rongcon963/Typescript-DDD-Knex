import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants/types';
import { ApplicationError } from '../../core/ApplicationError';
import { ICategoryProductRepository } from '../../domain/category_product/ICategoryProductRepository';
import { CategoryProductDto } from './dtos/CategoryProductDto';
import { CategoryProduct } from '../../domain/category_product/CategoryProduct';

@injectable()
export class CategoryProductApplication {
    constructor(
        @inject(TYPES.CategoryProductRepository)
        private readonly categoryProductRepository: ICategoryProductRepository,
    ) {}

    async getAllCategoryProducts(): Promise<any[]> {
        const cateProducts = await this.categoryProductRepository.findAll();
        
        return cateProducts.map(product => new CategoryProductDto(product.guid, product.categoryId, product.productId));
    }

    async getCategoryProductRelation(id: string): Promise<any[] | null> {
        const cateProducts = await this.categoryProductRepository.findById(id);
        console.log(cateProducts);
        
        if (!cateProducts) throw new ApplicationError('404', 404, 'The category product with the requested ID does not exist');
        return cateProducts.map(product => new CategoryProductDto(product.guid, product.categoryId, product.productId));
    }

    async getCategoryProductById(id: string): Promise<any | null> {
        const cateProduct = await this.categoryProductRepository.findOneById(id);
        if (!cateProduct) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return new CategoryProductDto(cateProduct.guid, cateProduct.productId, cateProduct.categoryId);
    }

    async createCategoryProduct({ category_id, product_id }: any): Promise<void> {
        const product = CategoryProduct.create({ category_id, product_id });
        
        await this.categoryProductRepository.save(product);
    }

    async updateCategoryProductById(id: string,{ categoryId, productId }: any ): Promise<void> {
        const cateProduct = await this.categoryProductRepository.findOneById(id);
        if (!cateProduct) throw 'Category Product not found';
        
        Object.assign(cateProduct, { categoryId, productId });

        await this.categoryProductRepository.save(cateProduct);
    }

    async deleteCategoryProductById(id: string): Promise<void> {
        await this.categoryProductRepository.delete(id);
    }
}
