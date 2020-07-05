import { SubCategory } from './../sub-category/sub-category.model';
export class MainCategory {
    _id: string;
    mainCategoryName: string;
    mainCategoryDescription: string;
    mainCategoryNameError: boolean;
    status: string;
    subCategory: [SubCategory];
}
