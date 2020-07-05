import { CholiMeasurement } from './choliMeasurement..model';
import { LehengaMeasure } from './lehengaMeasure.model';
export class LehengaMeasurement {
    superCategoryId: string;
    measurementName: string;
    measurementType: [{ typeName: string, typeDescription: string}];
    creationDate: Date;
    modifiedDate: Date;
    price: number;
    discount: number;
    choliMeasurement: [CholiMeasurement];
    lehengaMeasurement: [LehengaMeasure];
}
