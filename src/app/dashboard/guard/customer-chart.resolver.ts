import { Observable, of, from } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';



@Injectable()
export class CustomerChartResolver implements Resolve<any> {
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.dashboardService.getCustomerWithDate();
  }
}

