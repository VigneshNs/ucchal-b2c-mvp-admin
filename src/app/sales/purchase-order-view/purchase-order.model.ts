import { VendorWisePO } from './viewVendorWise.model';

export class PurchaseOrder {
    contactNo: string;
    gstNo: string;
    orderId: string;
    billTo: string;
    generatePO: [ VendorWisePO ];
}
