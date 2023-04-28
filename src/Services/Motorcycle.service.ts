import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(
    motorcycle: IMotorcycle | null,
  ): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycleService(
    motorcycle: IMotorcycle,
  ): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.createNewMotorcycle(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcyclesService(): Promise<Motorcycle | unknown> {
    const motorcycleODM = new MotorcycleODM();
    const AllMotorcycles = await motorcycleODM.getAllMotorcycles();
    const result = AllMotorcycles.map((motorcycle) =>
      this.createMotorcycleDomain(motorcycle));
    return result;
  }

  public async getMotorcycleByIdService(
    id: string,
  ): Promise<Motorcycle | unknown> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getMotorcycleById(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycleByIdService(
    id: string,
    motorcycle: Motorcycle,
  ): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.updateMotorcycleById(
      id,
      motorcycle,
    );
    return this.createMotorcycleDomain(newMotorcycle);
  }
}
