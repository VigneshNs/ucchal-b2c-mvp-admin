export class BombinoPickupEntry {
    AccountId: string;
    UserId: string;
    Password: string;
    Origin: string;
    Destination: string;
    Shipper_Name: string;
    Shipper_Add1: string;
    Shipper_Pin: string;
    Shipper_Email: string;
    Shipper_Mobile: string;
    Consignee_Name: string;
    Consignee_Add1: string;
    Consignee_State: string;
    Consignee_Pin: string;
    Consignee_Mobile: string;
    Consignee_Email: string;
    Seller_ID: string;
    Service_Type: string;
    Pcs: number;
    Weight: number;
    Dox_Spx: string;
    Content: string;
    Shipment_Value: number;
    Shipment_Currency: string;
    PickupDate: Date;
    No_of_Item: number;
    Mode: string;
    Items: [{
        Item_Description: string;
        Item_Value: number;
        Item_Weight: number;
    }];
  BookedBy: string;
  Consignee_Contact: any;
  Consignee_Add2: any;
  Consignee_Add3: any;
  Consignee_TelNo: string;
  Consignee_FaxNo: string;
  Shipper_Add2: string;
  Shipper_Add3: string;
  Instruction: string;
  COD_Amount: string;

}
