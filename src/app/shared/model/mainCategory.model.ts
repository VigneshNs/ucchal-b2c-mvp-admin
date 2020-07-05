import { SubCategory } from './sub-category.model';
import { FieldValue } from './field-value';
export class MainCategory {
    _id: string;
    mainCategoryName: string;
    mainCategoryDescription: string;
    mainCategoryNameError: boolean;
    subCategory: [SubCategory];
    attribute: [FieldValue];
    status: string;
    mainCategoryImageName: string;
}
