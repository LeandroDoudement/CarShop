import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/Car';

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
      console.log(car);
      return this.res.status(201).json(car);
    } catch (error) {
      return this.next(error);
    }
  }
}
