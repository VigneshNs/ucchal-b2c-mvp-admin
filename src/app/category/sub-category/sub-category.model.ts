import {FieldAttributeValue} from './field-attribute-value.model';
export class SubCategory {
    _id: string;
    subCategoryName: string;
    subCategoryImageName: string;
    subCategoryDescription: string;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeyword: string;
    status: string;
    isDispatch: boolean;
    attribute: [{fieldName: String, fieldType: String, fieldSetting: String, fieldValue: FieldAttributeValue}];
}
