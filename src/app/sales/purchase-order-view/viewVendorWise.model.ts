import { PurchaseOrderItem } from './purchase-orderItem.model';

export class VendorWisePO {
    poNumber: string;
    poStatus: string;
    poType: string;
    poDate: Date;
    poExpiryDate: Date;
    netAmount: number;
    freight: number;
    tax: number;
    totalAmount: number;
    specialInstruction: string;
    vendorName: string;
    vendorCode: string;
    vendorAddress: string;
    vendorEmailId: string;
    vendorCSTNo: string;
    vendorGStNo: string;
    vendorCurrencyType: string;
    vendorItems: [PurchaseOrderItem];
    totalCGSTamt: number;
    totalSGSTamt: number;
    totalIGSTamt: number;
    totalQuantity: number;
    totalNetamt: number;
    emailStatus: boolean;
}
