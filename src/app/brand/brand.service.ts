
import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { BrandModel } from './add-brand/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  productServiceUrl: string = AppSetting.productServiceUrl;
  imageUploadServiceUrl: string = AppSetting.imageUploadServiceUrl;
  constructor(private http: HttpClient) { }

  //  Brand Module

  createBrand(data): Observable<any> {                                 // Create new Brand
    const brandUrl = 'addbrand';
    const url: string = this.productServiceUrl + brandUrl;
    return this.http.post<BrandModel>(url, data);
  }
  uploadBrandImage(data, id): Observable<any> {                          //  Upload Brand
    const brandUrl = 'brandimagesthree/';
    const url: string = this.imageUploadServiceUrl + brandUrl + id;
    return this.http.put<BrandModel>(url, data);
  }
  editBrandImageName(data, id): Observable<any> {                          //  Upload Brand
    const brandUrl = 'brandimage/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.http.put<BrandModel>(url, data);
  }
  getAllBrand(): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'getbrand';
    const url: string = this.productServiceUrl + brandUrl;
    return this.http.get<BrandModel>(url);
  }
  deleteSingleBrand(id): Observable<any> {                              // Delete Single Brand
    const brandUrl = 'deletebrand/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.http.delete<BrandModel>(url);
  }
  updateSingleBrand(id, data): Observable<any> {                              // Delete Single Brand
    const brandUrl = 'updatebrand/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.http.put<BrandModel>(url, data);
  }
  getSingleBrand(id): Observable<any> {                              // Delete Single Brand
    const brandUrl = 'getsinglebrand/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.http.get<BrandModel>(url);
  }
}
