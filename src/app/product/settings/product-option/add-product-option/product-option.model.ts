import { ProductOptionValue } from './product-option-value.model';

export class ProductOption {
    _id: string;
    optionName: string;
    optionValue: [ProductOptionValue];
}
