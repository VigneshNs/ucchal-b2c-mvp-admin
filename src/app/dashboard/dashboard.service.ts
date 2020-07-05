import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  productServiceUrl: string = AppSetting.productServiceUrl;
  customerServiceUrl: string = AppSetting.customerSerivceUrl;
  commerceServiceUrl: string = AppSetting.commerceOrderServiceUrl;
  constructor(private http: HttpClient) { }

  getAllProductCount(): Observable<any> {                     // Retrieve All Product Count
    const categoryUrl = 'productoverallcount';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getAllCustomerCount(): Observable<any> {                     // Retrieve All Customer Count
    const categoryUrl = 'getcustomeroverallcount';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getRecentRegisteredCustomer(): Observable<any> {                     // Retrieve All Customer Count
    const categoryUrl = 'getrecentregisteredcustomer';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getVendorCounting(): Observable<any> {                     // Retrieve All Customer Count
    const categoryUrl = 'getvendorcount';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getInventoryQty(): Observable<any> {
    const categoryUrl = 'getinventoryquantity';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getAllCategoryWiseCount(): Observable<any> {
    const categoryUrl = 'getcategorywiseproductcount';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getPOCount(): Observable<any> {
    const categoryUrl = 'getpurchaseordercount';
    const url: string = this.commerceServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getOutOfStockCount(): Observable<any> {
    const categoryUrl = 'getoutofstockqtycount';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getCustomerWithDate(): Observable<any> {
    const categoryUrl = 'getcustomeraddeddate';
    const url: string = this.customerServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  getAllOrderWithDate(): Observable<any> {
    const categoryUrl = 'getallorderwithdate';
    const url: string = this.commerceServiceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
}
