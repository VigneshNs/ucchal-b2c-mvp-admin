import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewCustomerAddressComponent } from './view-customer-address/view-customer-address.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerOrderDetailsComponent } from './view-customer-order-details/view-customer-order-details.component';
import {ViewInquiriesComponent} from './view-inquiries/view-inquiries.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { ViewSingleCustomerComponent } from './view-single-customer/view-single-customer.component';

const routes: Routes = [
  {
    path: 'viewCustomer',
    component: ViewCustomerComponent
  },
  {
    path: 'viewcustomeraddress/:id',
    component: ViewCustomerAddressComponent
  },
  {
    path: 'addCustomer',
    component: AddCustomerComponent
  },
  {
    path: 'editCustomer/:id',
    component: EditCustomerComponent
  },
  {
    path: 'viewCustomerOrderDetial/:id',
    component: ViewCustomerOrderDetailsComponent
  },
  {
    path: 'viewinquiries',
    component: ViewInquiriesComponent
  },
  {
    path: 'viewsubscribers',
    component: ViewSubscriberComponent
  },
  {
    path: 'viewsinglecustomer/:id',
    component: ViewSingleCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
