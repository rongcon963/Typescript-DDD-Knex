export class CategoryProductDto {
    constructor(
      public guid: string,
      public categoryId: number,
      public productId: number,
    ) {}
}