import { Model, FindOptions, WhereOptions } from "sequelize";

export abstract class BaseRepository<T extends Model> {
  protected model: any;
  protected defaultLimit = 20;
  protected defaultOffset = 0;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: any): Promise<T> {
    const instance = await this.model.create(data);
    return instance.get({ plain: true });
  }

  async findById(id: number): Promise<T | null> {
    const instance = await this.model.findByPk(id);
    return instance ? instance.get({ plain: true }) : null; 
  }

  async findAll(options?: {
    where?: WhereOptions;
    limit?: number;
    offset?: number;
    order?: any[];
  }): Promise<T[]> {
    const { where, limit, offset, order } = options || {};

    const instances = await this.model.findAll({
      where,
      limit: limit ?? this.defaultLimit,
      offset: offset ?? this.defaultOffset,
      order,
    });
    
    return instances.map((instance: any) => instance.get({ plain: true }));
  }

  async update(id: number, data: any): Promise<T | null> {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.update(data);
    return record.get({ plain: true });
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}