import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../auth-service/authentication.service';
import { AppSetting } from './../../config/appSetting';

@Injectable({
    providedIn: 'root'
  })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        sessionStorage.setItem('app', AppSetting.appId);
        const appID = sessionStorage.getItem('app');
        if (appID) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${appID}`
                }
            });
            return next.handle(request);
        }
    }
}
