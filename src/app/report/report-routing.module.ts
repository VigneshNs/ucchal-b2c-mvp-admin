import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTabComponent } from './orderSummery/main-tab/main-tab.component';
import { OrderStatusComponent } from './orderSummery/order-status/order-status.component';
import { PaymentModeStatusComponent } from './orderSummery/payment-mode-status/payment-mode-status.component';
import { FinancialStatusComponent } from './orderSummery/financial-status/financial-status.component';
import { RecentOrderComponent } from './recent-order/recent-order.component';
import { TopCustomersComponent } from './top-customers/top-customers.component';

const routes: Routes = [
  {
    path: 'ordersummary',
    component: MainTabComponent,
    children: [
      {
        path: 'orderstatus',
        component: OrderStatusComponent
      },
      {
        path: 'financialstatus',
        component: FinancialStatusComponent
      },
      {
        path: 'paymentmodestatus',
        component: PaymentModeStatusComponent
      }
    ]
  },
  {
    path: 'recentorder',
    component: RecentOrderComponent
  },
  {
    path: 'topcustomers',
    component: TopCustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
