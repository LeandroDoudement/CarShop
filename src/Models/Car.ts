import { Model, model, Schema, models } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      id: { type: String, required: false },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async createNewCar(car: Car): Promise<ICar> {
    const newCar = await this.model.create({ ...car });
    return newCar;
  }
}

export default CarODM;
