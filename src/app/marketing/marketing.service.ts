import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../product/add-product/product.model';
import { SuperCategory } from '../category/super-category/superCategory.model';
import { DiscountModel } from './discount/discount.model';
import { Coupon } from './firstTimeCoupon/add-first-time-coupon/coupon.model';
@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  productServiceUrl: string = AppSetting.productServiceUrl;
  marketingServiceUrl: string = AppSetting.marketingServiceUrl;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const productUrl = 'product';
    const url: string = this.productServiceUrl + productUrl;
    return this.http.get<Product>(url);
  }
  getSuperCategory(): Observable<any> {
    const categoryUrl = 'viewCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.http.get<SuperCategory>(url);
  }
  createDiscount(data): Observable<any> {
    const categoryUrl = 'creatediscount';
    const url: string = this.marketingServiceUrl + categoryUrl;
    return this.http.post<DiscountModel>(url, data);
  }
  getDiscount(): Observable<any> {
    const categoryUrl = 'getdiscount';
    const url: string = this.marketingServiceUrl + categoryUrl;
    return this.http.get<DiscountModel>(url);
  }
  deleteSingleDiscount(id): Observable<any> {
    const categoryUrl = 'deletesinglediscount/';
    const url: string = this.marketingServiceUrl + categoryUrl + id ;
    return this.http.delete<DiscountModel>(url);
  }
  // Coupon
  createFirstTimeCoupon(coupon): Observable<any> {
    const marketingUrl = 'createfirsttimecoupon';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.post<Coupon>(url, coupon);
  }
  getFirstTimeCoupon(): Observable<any> {
    const marketingUrl = 'getfirsttimecoupon';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.get<Coupon>(url);
  }
  createFlexibleCoupon(coupon): Observable<any> {
    const marketingUrl = 'createflexiblecoupon';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.post<Coupon>(url, coupon);
  }
  getFlexibleCoupon(): Observable<any> {
    const marketingUrl = 'getflexiblecoupon';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.get<Coupon>(url);
  }
  getSingleFlexibleCoupon(id): Observable<any> {
    const marketingUrl = 'getsingleflexiblecoupon/';
    const url: string = this.marketingServiceUrl + marketingUrl + id;
    return this.http.get<Coupon>(url);
  }
  updateFlexibleCoupon(coupon, id): Observable<any> {
    const marketingUrl = 'updateflexiblecoupon/';
    const url: string = this.marketingServiceUrl + marketingUrl + id;
    return this.http.put<Coupon>(url, coupon);
  }
  deleteFlexibleCoupon(id): Observable<any> {
    const marketingUrl = 'deleteflexiblecoupon/';
    const url: string = this.marketingServiceUrl + marketingUrl + id;
    return this.http.delete<Coupon>(url);
  }
   // Wallet
   getWalletForAdmin(): Observable<any> {
    const marketingUrl = 'getwalletForadmin';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.get<any>(url);
  }
  addWalletByAdmin(data): Observable<any> {
    const marketingUrl = 'addwalletbyadmin';
    const url: string = this.marketingServiceUrl + marketingUrl;
    return this.http.post<any>(url, data);
  }
}
