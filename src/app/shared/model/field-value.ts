import {FieldAttributeValue} from './field-attribute-value.model'
export class FieldValue {
    fieldName: string;
    fieldSetting: string;
    fieldType: string;
    fieldEnable: boolean;
    fieldEnableValue: boolean;
    sortOrder: number;
    fieldValue: FieldAttributeValue;
}
