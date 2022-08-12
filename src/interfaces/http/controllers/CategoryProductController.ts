import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
  httpDelete,
  httpPut,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { ok } from '../processors/response';
import { CategoryProductApplication } from '../../../application/category_product/CategoryProductApplication';

@controller('/api/v1/category/product')
export class CategoryProductController {
    constructor(
        @inject(TYPES.CategoryProductApplication)
        private readonly service: CategoryProductApplication
      ) {}

    @httpGet('/')
    async getAllCategoryProducts(@request() req: Request, @response() res: Response) {
        const categories = await this.service.getAllCategoryProducts();
        
        return res.json(ok(categories, 'Successfully retrieved all category product with Knex'));
    }

    @httpGet('/relation/:id')
    async getCategoryProduct(@request() req: Request, @response() res: Response) {
        const categories = await this.service.getCategoryProductRelation(req.params.id);
        return res.json(ok(categories, 'Successfully retrieved all category product with Knex'));
    }

    @httpGet('/:id')
    async getCategoryProductById(@request() req: Request, @response() res: Response) {
        const category = await this.service.getCategoryProductById(req.params.id);
        return res.json(ok(category, `Successfully retrieved a category with an ID of ${req.params.id}`));
    }

    @httpPut('/:id')
    async UpdateCategoryProduct(@request() req: Request, @response() res: Response) {
        const { body } = req;
        const category = await this.service.updateCategoryProductById(req.params.id, body);
        return res.json(ok(category, `Successfully retrieved a category with an ID of ${req.params.id}`));
    }

    @httpDelete('/:id')
    async deleteCategoryProductById(@request() req: Request, @response() res: Response) {
        const category = await this.service.deleteCategoryProductById(req.params.id);

        return res.json(ok(category, `Successfully delete a category with an ID of ${req.params.id}`));
    }
    
    @httpPost('/')
    async createCategoryProduct(@request() req: Request, @response() res: Response) {
        const { body } = req;
        
        await this.service.createCategoryProduct(body);
        return res.json({
        status: '000',
        message: 'Success'
        });
    }

}