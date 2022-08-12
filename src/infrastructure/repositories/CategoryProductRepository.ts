import { TYPES } from '../../constants/types';
import { IDataMapper } from '../../core/IDataMapper';
import { ICategoryProductRepository } from '../../domain/category_product/ICategoryProductRepository';
import { CategoryProduct } from '../../domain/category_product/CategoryProduct';
import { inject } from 'inversify';
//import { Db } from 'mongodb';
import { Knex, knex } from 'knex';
import { Repository } from './Repository';

export class CategoryProductRepository extends Repository<CategoryProduct> implements ICategoryProductRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Knex,
    @inject(TYPES.CategoryProductDataMapper) private readonly userDataMapper: IDataMapper<CategoryProduct>
  ) {
    super('category_product',db, userDataMapper);
  }
}