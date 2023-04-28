export default interface IVehicle extends Partial<Document> {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
}
