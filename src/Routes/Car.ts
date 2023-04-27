import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const carRouter = Router();

carRouter.post('/', (req, res, next) =>
  new CarController(req, res, next).createCar());

carRouter.get('/', (req, res, next) =>
  new CarController(req, res, next).getAllCars());

carRouter.get('/:id', (req, res, next) =>
  new CarController(req, res, next).getCarById());

carRouter.put('/:id', (req, res, next) =>
  new CarController(req, res, next).updateCarById());

export default carRouter;
