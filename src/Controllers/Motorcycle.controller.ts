import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import MotorcycleService from '../Services/Motorcycle.service';

export default class MotorcycleController {
  private motorcycleService: MotorcycleService;
  private res: Response;
  private req: Request;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.motorcycleService = new MotorcycleService();
    this.res = res;
    this.req = req;
    this.next = next;
  }

  public async createMotorcycle() {
    const newMotorcycle = this.req.body;
    try {
      const motorcycle = await this.motorcycleService.createMotorcycleService(
        newMotorcycle,
      );
      return this.res.status(201).json(motorcycle);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getAllMotorcycles() {
    try {
      const allMotorcycles = await this.motorcycleService.getAllMotorcyclesService();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getMotorcycleById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const motorcycle = await this.motorcycleService.getMotorcycleByIdService(
        id,
      );
      if (motorcycle === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateMotorcycleById() {
    const newMotorcycle = this.req.body;
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const updatedMotorcycle = await this.motorcycleService.updateMotorcycleByIdService(
        id,
        newMotorcycle,
      );
      if (updatedMotorcycle === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }
}
