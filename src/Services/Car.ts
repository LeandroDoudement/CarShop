import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCarService(car: Car): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.createNewCar(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCarsService(): Promise<Car | unknown> {
    const carODM = new CarODM();
    const allCars = await carODM.getAllCars();
    const result = allCars.map((car) => this.createCarDomain(car));
    return result;
  }

  public async getCarByIdService(id: string): Promise<Car | unknown> {
    const carODM = new CarODM();
    const car = await carODM.getCarById(id);
    return this.createCarDomain(car);
  }
}
