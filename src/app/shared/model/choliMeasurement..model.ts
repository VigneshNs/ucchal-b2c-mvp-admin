import { MeasurementStyle } from './measurementStyle.model';
import { MeasurementValue } from './measurementValue.model';

export class CholiMeasurement {
    aroundBust: [MeasurementValue];
    aroundAboveWaist: [MeasurementValue];
    choliLength: [MeasurementValue];
    frontNeckStyle: [MeasurementStyle];
    backNeckStyle: [MeasurementStyle];
    sleeveStyle: [MeasurementStyle];
    choliClosingSide: [string];
    choliClosingWith: [string];
    lining: [string];
}
