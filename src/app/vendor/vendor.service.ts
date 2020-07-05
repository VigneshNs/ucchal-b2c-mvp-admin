import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { VendorModel } from './registration/vendor.model';
import { AddressDetails } from './registration/addressDetails.model';
import { OfficeAddressDetails } from './registration/officeAddressDetails.model';
import { WareHouseAddress } from './registration/wareHouseAddressDetail.model';
import { Setting } from './registration/setting.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  vendorServiceUrl: string = AppSetting.customerSerivceUrl;
  imageServiceUrl: string = AppSetting.imageUploadServiceUrl;
  constructor(private http: HttpClient) { }

  registration(data): Observable<any> {                     // Register vendor
    const categoryUrl = 'createvendor';
    const url: string = this.vendorServiceUrl + categoryUrl;
    return this.http.post<any>(url, data);
  }

  uploadCancelCheque(data, id): Observable<any> {                       // upload cancelled cheque image
    const categoryUrl = 'createcancelchequeimage/';
    const url: string = this.imageServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }

  storeCancelChequeName(data, id): Observable<any> {                       // add cancelled cheque image Name
    const categoryUrl = 'storecancelchequename/';
    const url: string = this.vendorServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }

  uploadDigitalSignature(data, id): Observable<any> {                       // upload digital signature image
    const categoryUrl = 'createdigitalsignatureimage/';
    const url: string = this.imageServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }

  storeDigitalSignatureName(data, id): Observable<any> {                       // add digital signature image Name
    const categoryUrl = 'storedigitalsignaturename/';
    const url: string = this.vendorServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }


  getAllVendor(): Observable<any> {                     // Get All vendor
    const categoryUrl = 'getallvendor';
    const url: string = this.vendorServiceUrl + categoryUrl;
    return this.http.get<VendorModel>(url);
  }
  deleteSingleVendor(id): Observable<any> {                     // Delete Single vendor
    const categoryUrl = 'deleteSingleVendor/';
    const url: string = this.vendorServiceUrl + categoryUrl + id;
    return this.http.delete<VendorModel>(url);
  }
  vendorAddressUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendoraddress/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  getSingleVendorDetails(userId): Observable<VendorModel> {
    const urlprofile = this.vendorServiceUrl + 'getvendorprofile/' + userId;
    return this.http.get<VendorModel>(urlprofile);
  }
  vendorAddressDelete(userId, addressId): Observable<VendorModel> {
    const urlprofile = this.vendorServiceUrl + 'deletevendoraddress/' + userId + '/delete/' + addressId;
    return this.http.delete<VendorModel>(urlprofile);
  }
  getaddressDetails(addressHolder, userId): Observable<AddressDetails> {
    const urladdress = this.vendorServiceUrl + 'uploadvendoraddressdetails/' + userId;
    return this.http.put<AddressDetails>(urladdress, addressHolder);
  }
  registrationByUpload(data): Observable<any> {                     // Register vendor By Upload XLSX
    const categoryUrl = 'createvendorbyupload';
    const url: string = this.vendorServiceUrl + categoryUrl;
    return this.http.post<any>(url, data);
  }
  // edit
  vendorOfficeAddressUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorofficeaddress/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorSupplyAddressUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorsupplyaddress/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorPaymentUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorpayment/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorDeliveryUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendordelivery/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorPerformanceUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorperformance/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorSignatureUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorsignature/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }


  vendorOfficeAddressDelete(userId, addressId): Observable<VendorModel> {
    const urlprofile = this.vendorServiceUrl + 'deletevendorofficeaddress/' + userId + '/delete/' + addressId;
    return this.http.delete<VendorModel>(urlprofile);
  }
  getOfficeaddressDetails(addressHolder, userId): Observable<OfficeAddressDetails> {
    const urladdress = this.vendorServiceUrl + 'uploadvendorofficeaddressdetails/' + userId;
    return this.http.put<OfficeAddressDetails>(urladdress, addressHolder);
  }

  vendorWareHouseAddressUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.vendorServiceUrl + 'editvendorwarehouseaddress/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  vendorWareHouseAddressDelete(userId, addressId): Observable<VendorModel> {
    const urlprofile = this.vendorServiceUrl + 'deletevendorwarehouseaddress/' + userId + '/delete/' + addressId;
    return this.http.delete<VendorModel>(urlprofile);
  }
  getWareHouseaddressDetails(addressHolder, userId): Observable<WareHouseAddress> {
    const urladdress = this.vendorServiceUrl + 'uploadvendorwarehouseaddressdetails/' + userId;
    return this.http.put<WareHouseAddress>(urladdress, addressHolder);
  }
  updateVendorContractDetials(addressHolder, userId): Observable<VendorModel> {
    const urladdress = this.vendorServiceUrl + 'updatevendorcontractdetails/' + userId;
    return this.http.put<VendorModel>(urladdress, addressHolder);
  }
  updateVendorPaymentDetails(addressHolder, userId): Observable<VendorModel> {
    const urladdress = this.vendorServiceUrl + 'updatevendorpaymentdetails/' + userId;
    return this.http.put<VendorModel>(urladdress, addressHolder);
  }
  updateVendorOtherDetails(addressHolder, userId): Observable<VendorModel> {
    const urladdress = this.vendorServiceUrl + 'updatevendorotherdetails/' + userId;
    return this.http.put<VendorModel>(urladdress, addressHolder);
  }
  updateCancelCheque(data, id): Observable<any> {                       // update cancelled cheque image
    const categoryUrl = 'createcancelchequeimage/';
    const url: string = this.imageServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }
  updateDigitalSignature(data, id): Observable<any> {                       // update Digital Signature image
    const categoryUrl = 'createdigitalsignatureimage/';
    const url: string = this.imageServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }
  updateCancelChequeName(data, id): Observable<any> {                       // update Cancel Cheque image Name
    const categoryUrl = 'updatecancelchequename/';
    const url: string = this.vendorServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }
  updateDigitalSignatureName(data, id): Observable<any> {                       // update Cancel Cheque image Name
    const categoryUrl = 'updatedigitalsignaturename/';
    const url: string = this.vendorServiceUrl + categoryUrl + id;
    return this.http.put<VendorModel>(url, data);
  }

  // Setting
  getAllSetting(): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'getallsetting';
    return this.http.get<Setting>(urladdress);
  }
  uploadVendorType(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadvendorType';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteVendorType(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletevendorType/' + data;
    return this.http.delete<Setting>(urladdress);
  }

  uploadCompanyStatus(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadcompanystatus';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteCompanyStatus(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletecompanystatus/' + data;
    return this.http.delete<Setting>(urladdress);
  }


  uploadCurrency(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadcurrency';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteCurrency(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletecurrency/' + data;
    return this.http.delete<Setting>(urladdress);
  }

  uploadTaxesType(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadtaxestype';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteTaxesType(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletetaxestype/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadModeOfPayment(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadmodeofpayment';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteModeOfPayment(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletemodeofpayment/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadDeliveryMode(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploaddeliverymode';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteDeliveryMode(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletedeliverymode/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadReturnsOfGoods(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadreturnsofgoods';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteReturnsOfGoods(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletereturnsofgoods/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadMerchandiseDivision(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadmerchandisedivision';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteMerchandiseDivision(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletemerchandisedivision/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadPaymentDay(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadpaymentday';
    return this.http.post<Setting>(urladdress, data);
  }
  deletePaymentDay(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletepaymentday/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadTransportCostBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadtransportcostby';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteTransportCostBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletetransportcostby/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadCatalogueImageArrangeBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadcatalogueimagearrangeby';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteCatalogueImageArrangeBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletecatalogueimagearrangeby/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadChargesOfPhotoshopBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadchargesofphotoshopby';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteChargesOfPhotoshopBy(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletechargesofphotoshopby/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadBusinessModel(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploadbusinessmodel';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteBusinessModel(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletebusinessmodel/' + data;
    return this.http.delete<Setting>(urladdress);
  }
  uploadDefaultDeliveryLocation(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'uploaddefaultdeliverylocation';
    return this.http.post<Setting>(urladdress, data);
  }
  deleteDefaultDeliveryLocation(data): Observable<any> {
    const urladdress = this.vendorServiceUrl + 'deletedefaultdeliverylocation/' + data;
    return this.http.delete<Setting>(urladdress);
  }
}
