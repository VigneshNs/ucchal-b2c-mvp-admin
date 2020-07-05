import { BottomMeasurement } from './bottomMeasurement.model';
import { KameezMeasure } from './kameezMeas.model';
export class KameezMeasurement {
    superCategoryId: string;
    measurementName: string;
    measurementType: [{ typeName: string, typeDescription: string}];
    creationDate: Date;
    modifiedDate: Date;
    price: number;
    discount: number;
    kameezMeasurement: [KameezMeasure];
    bottomMeasurement: [BottomMeasurement];
}
