import { ProductImage } from './productImage.model';
export class Child {
    _id: string;
    productName: string;
    productId: string;
    manufactureInfo: string;
    costIncludes: string;
    variantId: string;
    sizeVariantId: string;
    variantTypeId: string;
    colorId: string;
    vendorId: string;
    brandName: string;
    hsnCode: string;
    gstIn: string;
    headChild: boolean;
    sku: string;
    styleCode: string;
    variation: string;
    productsType: string;
    packOf: number;
    size: string;
    weight: string;
    fabric: string;
    washCare: string;
    productDimension: string;
    packingDimension: string;
    discount: number;
    sp: number;
    mrp: number;
    closure: string;
    pattern: string;
    productDescription: string;
    toFitWaist: string;
    searchTerms1: string;
    searchTerms2: string;
    searchTerms3: string;
    searchTerms4: string;
    searchTerms5: string;
    superCategoryId: string;
    superCategoryName: string;
    catalogueName: string;
    mainCategoryId: string;
    mainCategoryName: string;
    subCategoryId: string;
    subCategoryName: string;
    color: string;
    tags: string;
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    dateAdded: Date;
    dateModified: Date;
    brandId: string;
    variantType: string;
    publish: boolean;
    sizeName: string;
    sizeId: string;
    productImage: [ProductImage];
    attribute: any;
    length: string;
    breath: string;
    hsn: string;
    tp: string;
    ttsPortol: number;
    ttsVendor: number;
    PINTsku: string;
    tailoringService: string;
}
