import { MainCategory } from './mainCategory.model';
import { FieldValue } from './field-value';

export class SuperCategory {
    // tslint:disable-next-line: variable-name
    _id: string;
    categoryName: string;
    categoryImageName: string;
    categoryDescription: string;
    sortOrder: number;
    status: string;
    isDispatch: boolean;
    checkCategoryName: boolean;
    mainCategory: [MainCategory];
    attribute: [FieldValue];
}
