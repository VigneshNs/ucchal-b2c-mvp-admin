import { Observable, of } from 'rxjs';
import { ProductService } from '../product.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationEnd
} from '@angular/router';
import { Product } from '../add-product/product.model';

@Injectable()
export class AllProductResolver implements Resolve<Product> {
  paginatorPages: {
    pageNo: number,
    perPage: number,
  };
  constructor(
    private productService: ProductService,
    private router: Router
  ) {
   /*  this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  };
  this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
    }
}); */
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const brandID = route.paramMap.get('id');
    if (route.queryParamMap.get('pageNo')) {
      const pageNumber = parseInt(route.queryParamMap.get('pageNo'));
      // const perPages = parseInt(route.queryParamMap.get('perPage'));
      this.paginatorPages = {
        pageNo: pageNumber,
        perPage: 30,
      };
      
    } else {
        this.paginatorPages = {
          pageNo : 1,
          perPage : 30,
        };
       
    }
    console.log(brandID);
    return this.productService.getProducts(this.paginatorPages);
  }
}

