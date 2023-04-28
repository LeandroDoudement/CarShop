import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async createNewCar(car: ICar): Promise<ICar> {
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

  public async updateCarById(id: string, car: Car): Promise<ICar | null> {
    const updateCar = await this.model.findByIdAndUpdate(id, car, {
      new: true,
    });
    return updateCar;
  }
}

export default CarODM;
