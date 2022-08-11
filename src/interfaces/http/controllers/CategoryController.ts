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
import { CategoryApplication } from '../../../application/category/CategoryApplication';

@controller('/api/v1/categories')
export class CategoryController {
    constructor(
        @inject(TYPES.CategoryApplication)
        private readonly service: CategoryApplication
      ) {}

    @httpGet('/')
    async getAllCategories(@request() req: Request, @response() res: Response) {
        const categories = await this.service.getAllCategories();
        return res.json(ok(categories, 'Successfully retrieved all categories with Knex'));
    }

    @httpGet('/:id')
    async getCategoryById(@request() req: Request, @response() res: Response) {
        const category = await this.service.getCategoryById(req.params.id);
        return res.json(ok(category, `Successfully retrieved a category with an ID of ${req.params.id}`));
    }

    @httpPut('/:id')
    async UpdateCategory(@request() req: Request, @response() res: Response) {
        const { body } = req;
        const category = await this.service.updateCategoryById(req.params.id, body);
        return res.json(ok(category, `Successfully retrieved a category with an ID of ${req.params.id}`));
    }

    @httpDelete('/:id')
    async deleteCategoryById(@request() req: Request, @response() res: Response) {
        const category = await this.service.deleteCategoryById(req.params.id);

        return res.json(ok(category, `Successfully delete a category with an ID of ${req.params.id}`));
    }
    
    @httpPost('/')
    async createCategory(@request() req: Request, @response() res: Response) {
        const { body } = req;
        
        await this.service.createCategory(body);
        return res.json({
        status: '000',
        message: 'Success'
        });
    }

}