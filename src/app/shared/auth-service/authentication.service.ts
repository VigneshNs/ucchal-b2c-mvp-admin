
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSetting } from './../../config/appSetting';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  serviceUrl: string = AppSetting.productServiceUrl;
  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const url = this.serviceUrl + 'admin/validate';
    return this.http.post<any>(url, { userName, password });

  }
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('loginUser');
    sessionStorage.removeItem('token');
  }
}
