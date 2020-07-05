import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavSidebarComponent } from './shared/nav-sidebar/nav-sidebar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'

},
  {
    path: '',
    component: NavSidebarComponent,
    children: [
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule',
        data: { title: 'category'}
      },
      {
        path: 'cms',
        loadChildren: './cms/cms.module#CmsModule'
      },
      {
        path: 'brand',
        loadChildren: './brand/brand.module#BrandModule',
        data: { title: 'brand'}
      },
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule',
        data: { title: 'product'}
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule',
        data: { title: 'sales'}
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'marketing',
        loadChildren: './marketing/marketing.module#MarketingModule'
      },
      {
        path: 'vendor',
        loadChildren: './vendor/vendor.module#VendorModule'
      },
      {
        path: 'report',
        loadChildren: './report/report.module#ReportModule'
      },
    ]
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },  {
    path: '',
    redirectTo: 'product/addproduct',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
