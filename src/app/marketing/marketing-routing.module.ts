import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountComponent } from './discount/discount.component';
import { ViewDiscountComponent } from './view-discount/view-discount.component';
import { AddFirstTimeCouponComponent } from './firstTimeCoupon/add-first-time-coupon/add-first-time-coupon.component';
import { ViewFirstTimeCouponComponent } from './firstTimeCoupon/view-first-time-coupon/view-first-time-coupon.component';
import { EditFirstTimeCouponComponent } from './firstTimeCoupon/edit-first-time-coupon/edit-first-time-coupon.component';
import { ViewFlexibleCouponComponent } from './flexibleCoupon/view-flexible-coupon/view-flexible-coupon.component';
import { AddFlexibleCouponComponent } from './flexibleCoupon/add-flexible-coupon/add-flexible-coupon.component';
import { EditFlexibleCouponComponent } from './flexibleCoupon/edit-flexible-coupon/edit-flexible-coupon.component';
import { ViewWalletComponent } from './wallet/view-wallet/view-wallet.component';
import { AddWalletComponent } from './wallet/add-wallet/add-wallet.component';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';

const routes: Routes = [
  {
    path: 'addDiscount',
    component: DiscountComponent
  },
  {
    path: 'viewDiscount',
    component: ViewDiscountComponent
  },
  {
    path: 'addfirsttimeCoupon',
    component: AddFirstTimeCouponComponent
  },
  {
    path: 'viewfirstcoupon',
    component: ViewFirstTimeCouponComponent
  },
  {
    path: 'editFirstTimeCoupon',
    component: EditFirstTimeCouponComponent
  },
  {
    path: 'viewFlexibleCoupon',
    component: ViewFlexibleCouponComponent
  },
  {
    path: 'addFlexibleCoupon',
    component: AddFlexibleCouponComponent
  },
  {
    path: 'editFlexibleCoupon/:id',
    component: EditFlexibleCouponComponent
  },
  {
    path: 'viewWallet',
    component: ViewWalletComponent
  },
  {
    path: 'addWallet',
    component: AddWalletComponent
  },
  {
    path: 'editWallet',
    component: EditWalletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
