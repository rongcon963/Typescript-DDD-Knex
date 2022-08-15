import { TYPES } from '../../constants/types';
import { IDataMapper } from '../../core/IDataMapper';
import { ICategoryProductRepository } from '../../domain/category_product/ICategoryProductRepository';
import { CategoryProduct } from '../../domain/category_product/CategoryProduct';
import { inject } from 'inversify';
import { Knex, knex } from 'knex';
import { Repository } from './Repository';

export class CategoryProductRepository extends Repository<CategoryProduct> implements ICategoryProductRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Knex,
    @inject(TYPES.CategoryProductDataMapper) private readonly userDataMapper: IDataMapper<CategoryProduct>
  ) {
    super('category_product',db, userDataMapper);
  }

  async findById(id: string): Promise<CategoryProduct[] | null> {
    const dbResult = await this.db('category_product')
                    .join('category', `category_product.category_id`, '=', 'category.id')
                    .join('product', `category_product.product_id`, '=', 'product.id')
                    .select('*')
                    .where(`category_product.category_id`, id);
    
    if (!dbResult) return null;
    return dbResult.map((result) => this.userDataMapper.toDomain(result));
  }
}