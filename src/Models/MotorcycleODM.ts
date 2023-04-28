import { Schema, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async createNewMotorcycle(
    motorcycle: IMotorcycle,
  ): Promise<IMotorcycle> {
    const newMotorcycle = await this.model.create({ ...motorcycle });
    return newMotorcycle;
  }

  public async getAllMotorcycles(): Promise<IMotorcycle[]> {
    const getAllMotorcycles = await this.model.find({});
    return getAllMotorcycles;
  }

  public async getMotorcycleById(id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const motorcycle = await this.model.findById(id);
    return motorcycle;
  }

  public async updateMotorcycleById(
    id: string,
    motorcycle: Motorcycle,
  ): Promise<IMotorcycle | null> {
    const updatedMotorcycle = await this.model.findByIdAndUpdate(
      id,
      motorcycle,
      {
        new: true,
      },
    );
    return updatedMotorcycle;
  }
}

export default MotorcycleODM;
