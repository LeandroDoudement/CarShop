import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const motorcycleRouter = Router();

motorcycleRouter.post('/', (req, res, next) =>
  new MotorcycleController(req, res, next).createMotorcycle());

motorcycleRouter.get('/', (req, res, next) =>
  new MotorcycleController(req, res, next).getAllMotorcycles());

motorcycleRouter.get('/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).getMotorcycleById());

motorcycleRouter.put('/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).updateMotorcycleById());

export default motorcycleRouter;
