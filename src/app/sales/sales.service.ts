import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Observer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Order} from './orders/order.model';
import {CustomerModel} from './view-single-order/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  productServiceUrl: string = AppSetting.productServiceUrl;
  commerceOrderServiceUrl: string = AppSetting.commerceOrderServiceUrl;
  customerServiceUrl: string = AppSetting.customerSerivceUrl;
  imageServiceUrl: string = AppSetting.imageUploadServiceUrl;
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<any> {
    const salesUrl = 'getOrders';
    const url: string = this.commerceOrderServiceUrl + salesUrl;
    return this.httpClient.get<Order>(url);
  }
  getOrderDetails(id): Observable<any> {
    const categoryUrl = 'singleorders/';
    const url: string = this.commerceOrderServiceUrl + categoryUrl + id;
    return this.httpClient.get<any>(url);
  }

  updateStatus(id, order: Order): Observable<any> {
    const categoryUrl = 'statusupdate/' + id;
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.put<Order>(url, order);
  }
  updateAWBStatus(id, order: Order): Observable<any> {
    const categoryUrl = 'awsstatusupdate/' + id;
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.put<Order>(url, order);
  }
  getSingleCustomer(id): Observable<any> {                     // Retrieve Single Customer
    const categoryUrl = 'getcustomerprofile/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.httpClient.get<CustomerModel>(url);
  }
  // PO Setting Start

  getPOsetting(): Observable<any> {                     // Get PO Setting
    const categoryUrl = 'getposetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.get<any>(url);
  }
  addCGSTrate(setting): Observable<any> {                     // add CGST Rate
    const categoryUrl = 'cgstsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addSGSTrate(setting): Observable<any> {                     // add SGST Rate
    const categoryUrl = 'sgstsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addIGSTrate(setting): Observable<any> {                     // add IGST Rate
    const categoryUrl = 'igstsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addTermsAndCondition(setting): Observable<any> {                     // add Terms and Condition
    const categoryUrl = 'termsandconditionsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addContactNumber(setting): Observable<any> {                     // add Contact Number
    const categoryUrl = 'addcontactnosetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addGSTNumber(setting): Observable<any> {                     // add GST Number
    const categoryUrl = 'gstinsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  addPOsetting(setting): Observable<any> {                     // add PO Setting
    const categoryUrl = 'potypesetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  deletePOsetting(setting): Observable<any> {                     // Delete PO Setting
    const categoryUrl = 'deletepotypesetting/';
    const url: string = this.commerceOrderServiceUrl + categoryUrl + setting;
    return this.httpClient.delete<any>(url);
  }
  addBillingAddress(setting): Observable<any> {                     // add Billing Address
    const categoryUrl = 'addbillingaddress';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, setting);
  }
  // PO Setting End
  getVendorByVendorID(array): Observable<any> {                     // get multiple  Vendor
    const categoryUrl = 'getvendorbyarray';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, array);
  }
  sendEmailWithPdf(data): Observable<any> {                           //  Send Email With Pdf
    const categoryUrl = 'sendpdfforemail';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, data);
  }
  savePurchaseOrder(data): Observable<any> {                           //  Save Purchase Order
    const categoryUrl = 'createpurchaseorder';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, data);
  }
  updatePurchaseOrderStatus(data, id): Observable<any> {                           //  update Purchase Order Status
    const categoryUrl = 'updatepurchaseorderstatus/';
    const url: string = this.commerceOrderServiceUrl + categoryUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getAllPurchaseOrder(): Observable<any> {                           //  update Purchase Order Status
    const categoryUrl = 'getallpurchaseorder';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.get<any>(url);
  }
  addShipmentSetting(data): Observable<any> {                           //  add Shipment Setting
    const categoryUrl = 'addshipmentsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.post<any>(url, data);
  }
  getAllShipmentSetting(): Observable<any> {                           //  get All shipment setting
    const categoryUrl = 'getallshipmentsetting';
    const url: string = this.commerceOrderServiceUrl + categoryUrl;
    return this.httpClient.get<any>(url);
  }
  getSelctedMeasurementByUser(id): Observable<any> {
    const productUrl = 'getselectedmeasurement/';
    const url: string = this.customerServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  addVendorInvoiceToPO(data, id): Observable<any> {
    const productUrl = 'addvendorinvoice/';
    const url: string = this.commerceOrderServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  approvePurchaseOrder(data, id): Observable<any> {
    const productUrl = 'approvepofororder/';
    const url: string = this.commerceOrderServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }

  // Shipping Fees

  getShippingFees(): Observable<any> {
    const productUrl = 'getshippingfees';
    const url: string = this.commerceOrderServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  addShippingFees(data): Observable<any> {
    const productUrl = 'addshippingfees';
    const url: string = this.commerceOrderServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  deleteShippingFees(id): Observable<any> {
    const path = 'deleteshippingfees/';
    const url: string = this.commerceOrderServiceUrl + path + id;
    return this.httpClient.delete<any>(url);
  }
  updateShippingFeesStatus(data, id): Observable<any> {
    const productUrl = 'changeshippingfeesstatus/';
    const url: string = this.commerceOrderServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getReviewByOrder(id): Observable<any> {
    const productUrl = 'getreviewbyorderid/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  getPOByOrder(id): Observable<any> {
    const productUrl = 'getpurchaseorderbyorderid/';
    const url: string = this.commerceOrderServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  getStyleByCategory(id): Observable<any> {
    const productUrl = 'getstyleinmeasurementbycategory/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  getAllVendor(): Observable<any> {                     // Get All vendor
    const categoryUrl = 'getallvendor';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.httpClient.get<any>(url);
  }
  getBase64OfS3(data, id): Observable<any> {                     // Get All vendor
    const categoryUrl = 'getobjectfromimage/';
    const url: string = this.imageServiceUrl + categoryUrl + id;
    return this.httpClient.post<any>(url, data);
  }
  downloadDropBoxImage(data): Observable<any> {
    const path = 'downloaddropboximage';
    const url: string = this.imageServiceUrl + path;
    return this.httpClient.put<any>(url, data);
}
pickupEntry(data): Observable<any> {
  const path = 'createbombinoorder';
  const url: string = this.commerceOrderServiceUrl + path;
  return this.httpClient.post<any>(url, data);
}
getCountryCode(): Observable<any> {
  return this.httpClient.get<any>('./../../assets/countryCode/countryCode.json');
}
getCityCode(): Observable<any> {
  return this.httpClient.get<any>('./../../assets/countryCode/cityCode.json');
}
saveBombinoResponse(data, id): Observable<any> {
  const path = 'addbombinoresponse/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.post<any>(url, data);
}
cancelBombinoOrder(data): Observable<any> {
  const path = 'cancelbombinoorder';
  const url: string = this.commerceOrderServiceUrl + path;
  return this.httpClient.post<any>(url, data);
}
updateCancelBombinoStatus(data, id): Observable<any> {
  const path = 'updateaftercancelbombino/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
getBombinoOrder(data): Observable<any> {
  const path = 'getbombinoresponse';
  const url: string = this.commerceOrderServiceUrl + path;
  return this.httpClient.post<any>(url, data);
}
getAllReturnOrder(): Observable<any> {
  const path = 'getallreturnorder';
  const url: string = this.commerceOrderServiceUrl + path;
  return this.httpClient.get<any>(url);
}
getSingleReturnOrder(id): Observable<any> {
  const path = 'getsinglereturnorder/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.get<any>(url);
}
saveResponseForReturnOrder(data): Observable<any> {
  const path = 'updateresoponeforreturnorder';
  const url: string = this.commerceOrderServiceUrl + path ;
  return this.httpClient.post<any>(url, data);
}
updateReturnStatusAfterShipping(data, id): Observable<any> {
  const path = 'changestatusaftershipping/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
getCountryWisePrice(): Observable<any> {
  const productUrl = 'getcountrywiseprice';
  const url: string = this.productServiceUrl + productUrl;
  return this.httpClient.get<any>(url);
}
// invoice

getInvoiceCustomerSetting(data): Observable<any> {
  const path = 'getinvoicesettingcustomer';
  const url: string = this.commerceOrderServiceUrl;
  return this.httpClient.get<any>(url, data);
}
addInvoiceCustomerSetting(data): Observable<any> {
  const path = 'addinvoicecustomersetting/';
  const url: string = this.commerceOrderServiceUrl + path;
  return this.httpClient.post<any>(url, data);
}
CGSTsetting(data, id): Observable<any> {
  const path = 'cgstinvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl+ path + id;
  return this.httpClient.put<any>(url, data);
}
domainSetting(data, id): Observable<any> {
  const path = 'domainvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
companyNameSetting(data, id): Observable<any> {
  const path = 'companynameinvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
SGSTsetting(data, id): Observable<any> {
  const path = 'sgstinvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
IGSTsetting(data, id): Observable<any> {
  const path = 'igstinvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl + id;
  return this.httpClient.put<any>(url, data);
}
GSTINsetting(data, id): Observable<any> {
  const path = 'gstininvoicecustomer/';
  const url: string = this.commerceOrderServiceUrl + id
  return this.httpClient.put<any>(url, data);
}
termsAndConditionsetting(data, id): Observable<any> {
  const path = 'termsandconditioninvoicecustomer/' + id;
  const url: string = this.commerceOrderServiceUrl + path + id;
  return this.httpClient.put<any>(url, data);
}
mobileNumberSetting(data, id): Observable<any> {
  const productUrl = 'mobilenumberinvoicecustomer/' + id;
  const url: string = this.productServiceUrl + productUrl;
  return this.httpClient.put<any>(url, data);
}
getRazorpayRefund(data): Observable<any> {
  const productUrl = 'refundrazorpaymentamount';
  const url: string = this.commerceOrderServiceUrl + productUrl;
  return this.httpClient.post<any>(url, data);
}
}
