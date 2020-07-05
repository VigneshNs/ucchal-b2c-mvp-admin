import { Condition } from './condition.model';

export class Coupon {
    couponCode: string;
    description: string;
    amountType: string;
    typeValue: number;
    conditions: [Condition];
    couponStatus: boolean;
    advanceSettings: boolean;
    startDate: Date;
    endDate: Date;
    creationDate: Date;
    modificationDate: Date;
    maximumUsage: number;
}
