import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ViewSingleOrderComponent } from './view-single-order/view-single-order.component';
import { PurchaseOrderSettingComponent } from './purchase-order-setting/purchase-order-setting.component';
import { PurchaseOrderViewComponent } from './purchase-order-view/purchase-order-view.component';
import { ViewAllPurchaseOrderComponent } from './view-all-purchase-order/view-all-purchase-order.component';
import { ShipmentSettingComponent } from './shipment-setting/shipment-setting.component';
import { ShippingFeesComponent } from './shipping-fees/shipping-fees.component';
import { ViewPurchaseOrderComponent } from './view-purchase-order/view-purchase-order.component';
import { ViewSinglePurchaseOrderComponent } from './view-single-purchase-order/view-single-purchase-order.component';
import { ViewReturnOrderComponent } from './return-order/view-return-order/view-return-order.component';
import { ViewSingleReturnOrderComponent } from './return-order/view-single-return-order/view-single-return-order.component';
import {  CustomerInvoiceSettingComponent } from './invoice/customer-invoice-setting/customer-invoice-setting.component';

const routes: Routes = [{
  path: 'vieworders',
  component: OrdersComponent
}, {
  path: 'viewsingleorder/:id',
  component: ViewSingleOrderComponent
}, {
  path: 'purchaseOrderSettting',
   component: PurchaseOrderSettingComponent
}, {
  path: 'purchaseOrderView/:id',
  component: PurchaseOrderViewComponent
}, {
  path: 'viewPurchaseOrder',
  component: ViewAllPurchaseOrderComponent
}, {
  path: 'shipmentsetting',
  component: ShipmentSettingComponent
}, {
  path: 'shipmentFees',
  component: ShippingFeesComponent
},
{
  path: 'viewpurchaseorder',
  component: ViewPurchaseOrderComponent
},
{
  path: 'singleViewPurchaseOrder',
  component: ViewSinglePurchaseOrderComponent
},
{
  path: 'viewReturnOrder',
  component: ViewReturnOrderComponent
},
{
  path: 'invoice-customer',
  component: CustomerInvoiceSettingComponent
},
{
  path: 'viewsinglereturnorder/:id',
  component: ViewSingleReturnOrderComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
