import { DiscountCondition } from './discountCondition.model';

export class DiscountModel {
    name: string;
    ruleType: string;
    amountType: string;
    typeValue: number;
    applyOn: string;
    conditions: [DiscountCondition];
    discountStatus: boolean;
    advanceSettings: boolean;
    startDate: Date;
    endDate: Date;
    creationDate: Date;
}
