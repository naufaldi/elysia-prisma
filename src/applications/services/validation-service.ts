import gjv from 'geojson-validation';

export class ValidationService {
  static validateCoffeeshopData(data: any): boolean {
    return gjv.valid(data.geojson);
  }
}
