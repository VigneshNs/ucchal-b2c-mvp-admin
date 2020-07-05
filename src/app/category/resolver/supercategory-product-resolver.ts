import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CategoryService } from './../category.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { SuperCategory } from '../../shared/model/superCategory.model';

@Injectable()
export class SupercategoryResolver implements Resolve<SuperCategory> {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SuperCategory> {
    const catId = route.paramMap.get('id');
    return this.categoryService.getSingleSuperCategory(catId); /* .pipe(
      catchError(_ => {
        this.router.navigate(['']);
        return of(new Product());
      })
    ); */
  }
}

