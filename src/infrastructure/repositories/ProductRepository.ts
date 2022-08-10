import { TYPES } from '../../constants/types';
import { IDataMapper } from '../../core/IDataMapper';
import { IProductRepository } from '../../domain/product/IProductRepository';
import { Product } from '../../domain/product/Product';
import { inject } from 'inversify';
//import { Db } from 'mongodb';
import { Knex, knex } from 'knex';
import { Repository } from './Repository';

export class ProductRepository extends Repository<Product> implements IProductRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Knex,
    @inject(TYPES.ProductDataMapper) private readonly userDataMapper: IDataMapper<Product>
  ) {
    super('product',db, userDataMapper);
  }
}