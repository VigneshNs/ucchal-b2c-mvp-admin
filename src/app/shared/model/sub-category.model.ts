import { FieldAttributeValue } from './field-attribute-value.model';

export class SubCategory {
    _id: string;
    subCategoryName: string;
    subCategoryImageName: string;
    subCategoryDescription: string;
    metaTagTitle: string;
    status: string;
    isDispatch: boolean;
    metaTagDescription: string;
    metaTagKeyword: string;
    attribute: [{fieldName: string, fieldType: string, fieldSetting, fieldEnable: boolean,fieldEnableValue: boolean,
                 fieldValue: FieldAttributeValue}];
}
