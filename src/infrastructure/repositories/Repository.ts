import { IRepository } from '../../core/IRepository';
import { unmanaged, injectable } from 'inversify';
import { Knex, knex } from 'knex';
import { IDataMapper } from '../../core/IDataMapper';

@injectable()
export class Repository<TDomainEntity>
implements IRepository<TDomainEntity> {
  private readonly tableName: string;
  private readonly collectionInstance: Knex;
  private readonly dataMapper: IDataMapper<TDomainEntity>;

  constructor(
    @unmanaged() tableName: string,
    @unmanaged() collectionInstance: Knex,
    @unmanaged() dataMapper: IDataMapper<TDomainEntity>,
  ) {
    this.tableName = tableName;
    this.collectionInstance = collectionInstance;
    this.dataMapper = dataMapper;
  }

  async findAll(): Promise<TDomainEntity[]> {
    const dbResult = await this.collectionInstance.select('*').from(this.tableName);
    
    return dbResult.map((result) => this.dataMapper.toDomain(result));
  }

  async findOneById(guid: string): Promise<TDomainEntity | null> {
    const dbResult = await this.collectionInstance(this.tableName).where('guid', guid);
    
    if (!dbResult) return null;
    return this.dataMapper.toDomain((dbResult as any)[0]);
  }

  async doesExists(guid: string): Promise<boolean> {
    const dbResult = await this.collectionInstance(this.tableName).where('guid', guid);
    return !!dbResult;
  }

  async save(entity: TDomainEntity): Promise<void> {
    const guid = (entity as any).guid;
    const exists = await this.doesExists(guid);
    
    if(exists) {
      await this.collectionInstance(this.tableName).insert(this.dataMapper.toDalEntity(entity));
      return;
    }
    await this.collectionInstance(this.tableName).where('guid', guid).update(this.dataMapper.toDalEntity(entity));
  }

  async delete(id: string): Promise<void> {
    await this.collectionInstance(this.tableName).where('guid', id).del();
  }
}