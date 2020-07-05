import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverallDashboardComponent } from './overall-dashboard/overall-dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { VendorCountResolver } from './guard/vendor-count.resolver';
import { ProductCountResolver } from './guard/product-count.resolver';
import { InventoryQtyResolver } from './guard/inventory-qty.resolver';
import { CategoryWiseCountResolver } from './guard/category-wise-count.resolver';
import { PurchaseOrderCountResolver } from './guard/purchase-order-count.resolver';
import { OutofStockCountResolver } from './guard/outOfStock-count.resolver';
import { CustomerChartResolver } from './guard/customer-chart.resolver';
import { OrderChartResolver } from './guard/order-chart.resolver';

const routes: Routes = [
  {
    path: 'overalldashboard',
    component: OverallDashboardComponent
  },
  {
    path: 'maindashboard',
    component: MainDashboardComponent,
    resolve: {
      vendorCount: VendorCountResolver, productCount: ProductCountResolver,
      inventoryQty: InventoryQtyResolver, categoryWiseCount: CategoryWiseCountResolver,
      poCount: PurchaseOrderCountResolver, outOfStock: OutofStockCountResolver,
      customerDate: CustomerChartResolver, orderDate: OrderChartResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
