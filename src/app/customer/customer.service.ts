import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { CustomerModel } from './view-customer/customer.model';
import { Order } from '../sales/orders/order.model';
import {Inquiry} from '../shared/model/inquiry.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerServiceUrl: string = AppSetting.customerSerivceUrl;
  commerceServiceUrl: string = AppSetting.commerceOrderServiceUrl;
  constructor(private http: HttpClient) { }
  getAllCustomer(): Observable<any> {                     // Retrieve All Customer Details
    const categoryUrl = 'getallcustomer';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<CustomerModel>(url);
  }
  getAllCustomerCount(): Observable<any> {                     // Retrieve All Customer Count
    const categoryUrl = 'getcustomeroverallcount';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getTodayCustomerCount(): Observable<any> {                     // Retrieve Today Customer Count
    const categoryUrl = 'gettodayregisteredcustomer';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getSingleCustomer(id): Observable<any> {                     // Retrieve Single Customer
    const categoryUrl = 'getcustomerprofile/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.http.get<CustomerModel>(url);
  }
  uploadCustomerAddress(data, id): Observable<any> {                     // Upload Customer Address
    const categoryUrl = 'updateaddressdetails/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.http.put<CustomerModel>(url, data);
  }
  customerAddressDelete(userId, addressId): Observable<any> {
    const urlprofile = this.customerServiceUrl + 'deletecustomeraddress/' + userId + '/delete/' + addressId;
    return this.http.delete<CustomerModel>(urlprofile);
  }
  createCustomerAccount(data): Observable<any> {                     // create Customer Account
    const categoryUrl = 'createcustomerbyadmin';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.post<CustomerModel>(url, data);
  }
  updateCustomerAccount(data, id): Observable<any> {                     // Update Customer Account
    const categoryUrl = 'updateprofiledetails/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.http.put<CustomerModel>(url, data);
  }
  deleteCustomerAccount(id): Observable<any> {                     // Delete Customer Account
    const categoryUrl = 'deletecustomeraccount/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.http.delete<CustomerModel>(url);
  }
  changeCustomerStatus(data, id): Observable<any> {                     // change Customer status
    const categoryUrl = 'changestatusofcustomer/';
    const url: string = this.customerServiceUrl + categoryUrl + id;
    return this.http.put<CustomerModel>(url, data);
  }
  getCustomerOrderDetails(userId): Observable<Order> {
    const cartUrl = 'orders/';
    const url: string = this.commerceServiceUrl + cartUrl + userId;
    return this.http.get<Order>(url);
  }

  getInquiry(): Observable<Inquiry[]> {
    const cartUrl = 'getallinquiry/';
    const url: string = this.customerServiceUrl + cartUrl;
    return this.http.get<Inquiry[]>(url);
  }

  getAllSubscriber(): Observable<CustomerModel[]> {
    const cartUrl = 'getallsubscriber';
    const url: string = this.customerServiceUrl + cartUrl;
    return this.http.get<CustomerModel[]>(url);
  }
}
