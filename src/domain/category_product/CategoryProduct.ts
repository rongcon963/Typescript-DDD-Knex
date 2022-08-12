import { Entity } from '../../core/Entity';
import { IAggregateRoot } from '../../core/IAggregateRoot';

export interface ICategoryProductProps {
    category_id: number;
    product_id: number;
}

export class 
CategoryProduct extends Entity<ICategoryProductProps> implements IAggregateRoot {
    private _categoryId: number;
    private _productId: number;

    constructor({ category_id, product_id}: ICategoryProductProps, guid?: string) {
        super(guid);
        this._categoryId = category_id;
        this._productId = product_id;
    }
    
    get categoryId() {
        return this._categoryId;
    }

    set categoryId(category_id: number) {
        this._categoryId = category_id;
    }

    get productId() {
        return this._productId;
    }

    set productId(product_id: number) {
        this._productId = product_id;
    }

    public static create(props: ICategoryProductProps, guid?: string) {
        return new CategoryProduct(props, guid);
    }
}