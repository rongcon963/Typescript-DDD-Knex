import { Entity } from '../../core/Entity';
import { IAggregateRoot } from '../../core/IAggregateRoot';

export interface ICategoryProps {
    name: string;
}

export class Category extends Entity<ICategoryProps> implements IAggregateRoot {
    private _name: string;

    constructor({ name }: ICategoryProps, guid?: string) {
        super(guid);
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    public static create(props: ICategoryProps, guid?: string) {
        return new Category(props, guid);
    }
}