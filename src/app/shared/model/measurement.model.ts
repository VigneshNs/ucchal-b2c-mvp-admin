import { MeasurementStyle } from './measurementStyle.model';
import { MeasurementValue } from './measurementValue.model';

export class Measurement {
    price: number;
    discount: number;
    superCategoryId: string;
    mainCategoryId: string;
    subCategoryId: string;
    measurementName: string;
    measurementType: [{ typeName: string, typeDescription: string}];
    aroundBust: [MeasurementValue];
    aroundAboveWaist: [MeasurementValue];
    blouseLength: [MeasurementValue];
    frontNeckStyle: [MeasurementStyle];
    frontNeckDepth: [MeasurementValue];
    backNeckStyle: [MeasurementStyle];
    backNeckDepth: [MeasurementValue];
    sleeveStyle: [MeasurementStyle];
    sleeveLength: [MeasurementValue];
    aroundArm: [MeasurementValue];
    closingSide: [string];
    closingWith: [string];
    lining: string;
    specialComment: string;
    creationDate: Date;
    modifiedDate: Date;
}
