import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  customerServiceUrl: string = AppSetting.customerSerivceUrl;
  constructor(private httpClient: HttpClient) { }
  checkLogin(data): Observable<any> {                                // Check login
    const accUrl = 'erplogin';
    const url: string = this.customerServiceUrl + accUrl;
    return this.httpClient.post<any>(url, data);
  }
}
