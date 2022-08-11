export const TYPES = {
    // Dependencies
    Db: Symbol('Db'),
  
    // Repositories
    ProductRepository: Symbol('ProductRepository'),
    CategoryRepository: Symbol('CategoryRepository'),
  
    // Data Mappers
    ProductDataMapper: Symbol('ProductDataMapper'),
    CategoryDataMapper: Symbol('CategoryDataMapper'),
  
    // Application Services
    ProductApplication: Symbol('ProductApplication'),
    CategoryApplication: Symbol('CategoryApplication'),
};