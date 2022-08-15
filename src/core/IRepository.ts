export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T | null>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}