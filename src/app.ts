import express from 'express';
import carRouter from './Routes/Car';
import motorcycleRouter from './Routes/Motorcycle';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

export default app;
