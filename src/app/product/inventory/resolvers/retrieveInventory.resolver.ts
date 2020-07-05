import { Observable, of } from 'rxjs';
import { ProductService } from '../../product.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationEnd
} from '@angular/router';

@Injectable()
export class RetrieveInventory implements Resolve<any> {
  paginatorPages: {
    pageNo: number,
    perPage: number,
  };
  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
   const pageObj: any = {};
   const vendorObj: any = {};
   const obj: any = {};
    if (route.queryParamMap.get('pageNo')) {
      const pageNumber = parseInt(route.queryParamMap.get('pageNo'));
      pageObj.page = pageNumber;
      pageObj.title = 'pageNo'
    } 
    if (route.queryParamMap.get('vendId')) {
        const vendId = route.queryParamMap.get('vendId');
        vendorObj.title = 'vendor';
        vendorObj.vendorId = vendId;
    }
    obj.condition = [];
    obj.condition.push(pageObj);
    obj.condition.push(vendorObj);
    return this.productService.retrieveInventory(obj);
  }
}

