import { MeasurementStyle } from './measurementStyle.model';
import { MeasurementValue } from './measurementValue.model';

export class KameezMeasure {
    aroundBust: [MeasurementValue];
    aroundAboveWaist: [MeasurementValue];
    aroundHip: [MeasurementValue];
    kameezLength: [MeasurementValue];
    frontNeckStyle: [MeasurementStyle];
    frontNeckDepth: [MeasurementValue];
    backNeckStyle: [MeasurementStyle];
    backNeckDepth: [MeasurementValue];
    sleeveStyle: [MeasurementStyle];
    sleeveLength: [MeasurementValue];
    aroundArm: [MeasurementValue];
    kameezClosingSide: [string];
    kameezClosingWith: [string];
}
