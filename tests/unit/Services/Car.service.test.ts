import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import { allCarsMock, mareaMock, newCarMock } from './mocks/Car.mocks';
import CarService from '../../../src/Services/Car.service';
import Car from '../../../src/Domains/Car';

describe('Testes do Car.service', function () {
  it('Na rota POST /cars cria um novo carro com sucesso', async function () {
    const newCarOutput = new Car({
      id: '644857d4272792331dd928d6',
      ...newCarMock,
    });
    sinon.stub(Model, 'create').resolves(newCarOutput);
    const service = new CarService();
    const result = await service.createCarService(newCarMock);
    expect(result).to.be.deep.equal(newCarOutput);
  });
  it('Na rota GET /cars lista todos os carros registrados', async function () {
    sinon.stub(Model, 'find').resolves(allCarsMock);
    const service = new CarService();
    const result = await service.getAllCarsService();
    expect(result).to.have.lengthOf(allCarsMock.length);
  });
  it('Na rota GET /cars:id lista um carro especifico', async function () {
    const carOutput = new Car({
      id: '634852326b35b59438fbea2f',
      ...mareaMock,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);
    const service = new CarService();
    const result = await service.getCarByIdService('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(carOutput);
  });
});
