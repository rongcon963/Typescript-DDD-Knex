import { TYPES } from '../../constants/types';
import { IDataMapper } from '../../core/IDataMapper';
import { ICategoryRepository } from '../../domain/category/ICategoryRepository';
import { Category } from '../../domain/category/Category';
import { inject } from 'inversify';
//import { Db } from 'mongodb';
import { Knex, knex } from 'knex';
import { Repository } from './Repository';

export class CategoryRepository extends Repository<Category> implements ICategoryRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Knex,
    @inject(TYPES.CategoryDataMapper) private readonly userDataMapper: IDataMapper<Category>
  ) {
    super('category',db, userDataMapper);
  }
}