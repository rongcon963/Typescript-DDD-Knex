import { IRepository } from '../../core/IRepository';
import { CategoryProduct } from './CategoryProduct';

export interface ICategoryProductRepository extends IRepository<CategoryProduct> {
    findById(id: string): Promise<CategoryProduct[] | null>;
}