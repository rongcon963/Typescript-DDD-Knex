export const TYPES = {
    // Dependencies
    Db: Symbol('Db'),
  
    // Repositories
    ProductRepository: Symbol('ProductRepository'),
    CategoryRepository: Symbol('CategoryRepository'),
    CategoryProductRepository: Symbol('CategoryProductRepository'),
  
    // Data Mappers
    ProductDataMapper: Symbol('ProductDataMapper'),
    CategoryDataMapper: Symbol('CategoryDataMapper'),
    CategoryProductDataMapper: Symbol('CategoryProductDataMapper'),
  
    // Application Services
    ProductApplication: Symbol('ProductApplication'),
    CategoryApplication: Symbol('CategoryApplication'),
    CategoryProductApplication: Symbol('CategoryProductApplication'),
};