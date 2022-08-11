import { TYPES } from '../constants/types';
import { ContainerModule, interfaces } from 'inversify';
import { ProductApplication } from './product/ProductApplication';
import { CategoryApplication } from './category/CategoryApplication';

export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    bind<ProductApplication>(TYPES.ProductApplication).to(ProductApplication);
    bind<CategoryApplication>(TYPES.CategoryApplication).to(CategoryApplication);
  }
);