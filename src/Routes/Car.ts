import { Router } from 'express';
import CarController from '../Controllers/Car';

const carRouter = Router();

carRouter.post('/', (req, res, next) =>
  new CarController(req, res, next).createCar());

export default carRouter;
