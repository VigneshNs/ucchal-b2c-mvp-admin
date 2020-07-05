import { MeasurementStyle } from './measurementStyle.model';
import { MeasurementValue } from './measurementValue.model';

export class BottomMeasurement {
    bottomStyle: [MeasurementStyle];
    fitOption: [string];
    aroundWaist: [MeasurementValue];
    aroundThigh: [MeasurementValue];
    aroundKnee: [MeasurementValue];
    aroundCalf: [MeasurementValue];
    aroundBottom: [MeasurementValue];
    bottomLength: [MeasurementValue];
    waistClosingSide: [string];
    waistClosingWith: [string];
}
