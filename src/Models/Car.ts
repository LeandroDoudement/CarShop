import { Model, model, Schema, models, isValidObjectId } from 'mongoose';
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

  public async getAllCars(): Promise<ICar[]> {
    const allCars = await this.model.find({});
    return allCars;
  }

  public async getCarById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const car = await this.model.findById(id);
    return car;
  }
}

export default CarODM;
