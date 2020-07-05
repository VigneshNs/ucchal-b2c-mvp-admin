export class PurchaseOrderItem {
    catalogueName: string;
    vendorItemNo: string;
    sku: string;
    unitPrice: number;
    size: string;
    quantity: number;
    discount: number;
    unitOfMeasure: string;
    discountPercentage: number;
    cgstRate: number;
    sgstRate: number;
    igstRate: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    netAmount: number;
    estimatedShipmentDate: Date;
    INTsku: string;
    productImage: string;
    productId: string;
}
