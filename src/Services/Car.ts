import Car from '../Domains/Car';
import CarODM from '../Models/Car';

export default class CarService {
  public async createCarService(car: Car): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.createNewCar(car);
    return newCar ? new Car(newCar) : null;
  }
}
