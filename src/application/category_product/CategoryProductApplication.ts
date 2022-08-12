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
        const products = await this.categoryProductRepository.findAll();
        
        return products.map(product => new CategoryProductDto(product.guid, product.categoryId, product.productId));
    }

    async getCategoryProductRelation(id: string): Promise<any[] | null> {
        const products = await this.categoryProductRepository.findById(id);
        console.log(products);
        
        if (!products) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return products.map(product => new CategoryProductDto(product.guid, product.categoryId, product.productId));
        //return new CategoryProductDto(product.guid, product.productId, product.categoryId);
    }

    async getCategoryProductById(id: string): Promise<any | null> {
        const product = await this.categoryProductRepository.findOneById(id);
        if (!product) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return new CategoryProductDto(product.guid, product.productId, product.categoryId);
    }

    async createCategoryProduct({ category_id, product_id }: any): Promise<void> {
        const product = CategoryProduct.create({ category_id, product_id });
        
        await this.categoryProductRepository.save(product);
    }

    async updateCategoryProductById(id: string,{ categoryId, productId }: any ): Promise<void> {
        const product = await this.categoryProductRepository.findOneById(id);
        if (!product) throw 'Product not found';
        
        // copy userParam properties to user
        Object.assign(product, { categoryId, productId });

        await this.categoryProductRepository.save(product);
    }

    async deleteCategoryProductById(id: string): Promise<void> {
        await this.categoryProductRepository.delete(id);
    }
}
