import { Model, Schema, model, models } from 'mongoose';

export default class AbstractODM<T> {
  private schema: Schema;
  protected modelName: string;
  protected model: Model<T>;
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }
}
