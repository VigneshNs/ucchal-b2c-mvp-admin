import { MainCategory } from './../main-category/mainCategory.model';
import {FieldAttributeValue} from './../sub-category/field-attribute-value.model'
export class SuperCategory {
    // tslint:disable-next-line: variable-name
    _id: string;
    categoryName: string;
    categoryImageName: string;
    categoryDescription: string;
    sortOrder: number;
    status: string;
    checkCategoryName: boolean;
    mainCategory: [MainCategory];
    attribute: [{fieldName: String, fieldType: String, fieldSetting: String, fieldValue: FieldAttributeValue}];
}
