import { injectable } from 'inversify';
import { IDataMapper } from '../../core/IDataMapper';
import { Category } from '../../domain/category/Category';

@injectable()
export class CategoryDataMapper implements IDataMapper<Category> {
  toDomain(category: any) {
    const {
      guid,
      name,
    } = category;
    return Category.create({ name }, guid);
  }

  toDalEntity(categoryEntity: Category) {
    return {
      guid: categoryEntity.guid,
      name: categoryEntity.name,
    };
  }
}