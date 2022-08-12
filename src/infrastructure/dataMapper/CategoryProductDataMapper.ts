import { injectable } from 'inversify';
import { IDataMapper } from '../../core/IDataMapper';
import { CategoryProduct } from '../../domain/category_product/CategoryProduct';

@injectable()
export class CategoryProductDataMapper implements IDataMapper<CategoryProduct> {
  toDomain(categoryProduct: any) {
    const {
      guid,
      category_id,
      product_id,
    } = categoryProduct;
    
    return CategoryProduct.create({ category_id, product_id }, guid);
  }

  toDalEntity(categoryProductEntity: CategoryProduct) {
    return {
      guid: categoryProductEntity.guid,
      category_id: categoryProductEntity.categoryId,
      product_id: categoryProductEntity.productId,
    };
  }
}