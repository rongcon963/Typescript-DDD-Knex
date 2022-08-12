import { Knex, knex } from 'knex';
import { TYPES } from '../constants/types';
import config from '../config/main';
import { IDataMapper } from '../core/IDataMapper';
import { IProductRepository } from '../domain/product/IProductRepository';
import { ICategoryRepository } from '../domain/category/ICategoryRepository';
import { ICategoryProductRepository } from '../domain/category_product/ICategoryProductRepository';
import { Product } from '../domain/product/Product';
import { Category } from '../domain/category/Category';
import { CategoryProduct } from '../domain/category_product/CategoryProduct';
import { AsyncContainerModule, interfaces } from 'inversify';
import { ProductDataMapper } from './dataMapper/ProductDataMapper';
import { CategoryDataMapper } from './dataMapper/CategoryDataMapper';
import { CategoryProductDataMapper } from './dataMapper/CategoryProductDataMapper';
import { createMysqlConnection } from './db/mysql';
import { ProductRepository } from './repositories/ProductRepository';
import { CategoryRepository } from './repositories/CategoryRepository';
import { CategoryProductRepository } from './repositories/CategoryProductRepository';

export const infrastructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) => {
  const db: Knex = await createMysqlConnection(config.DB_HOST);
  bind<Knex>(TYPES.Db).toConstantValue(db);
  bind<IDataMapper<Product>>(TYPES.ProductDataMapper).to(ProductDataMapper);
  bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
  bind<IDataMapper<Category>>(TYPES.CategoryDataMapper).to(CategoryDataMapper);
  bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
  bind<IDataMapper<CategoryProduct>>(TYPES.CategoryProductDataMapper).to(CategoryProductDataMapper);
  bind<ICategoryProductRepository>(TYPES.CategoryProductRepository).to(CategoryProductRepository);
});