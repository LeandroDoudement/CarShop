import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/Car.service';

export default class CarController {
  private carService: CarService;
  private res: Response;
  private req: Request;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.carService = new CarService();
    this.res = res;
    this.req = req;
    this.next = next;
  }

  public async createCar() {
    const newCar = this.req.body;
    try {
      const car = await this.carService.createCarService(newCar);
      return this.res.status(201).json(car);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.carService.getAllCarsService();
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });
      const car = await this.carService.getCarByIdService(id);
      if (car === null) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(car);
    } catch (error) {
      return this.next(error);
    }
  }
}
