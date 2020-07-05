import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { MarketingRoutingModule } from './marketing-routing.module';
import { DiscountComponent } from './discount/discount.component';
import { ViewDiscountComponent } from './view-discount/view-discount.component';
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import { AddFirstTimeCouponComponent } from './firstTimeCoupon/add-first-time-coupon/add-first-time-coupon.component';
import { EditFirstTimeCouponComponent } from './firstTimeCoupon/edit-first-time-coupon/edit-first-time-coupon.component';
import { ViewFirstTimeCouponComponent } from './firstTimeCoupon/view-first-time-coupon/view-first-time-coupon.component';
import { AddFlexibleCouponComponent } from './flexibleCoupon/add-flexible-coupon/add-flexible-coupon.component';
import { EditFlexibleCouponComponent } from './flexibleCoupon/edit-flexible-coupon/edit-flexible-coupon.component';
import { ViewFlexibleCouponComponent } from './flexibleCoupon/view-flexible-coupon/view-flexible-coupon.component';
import { ViewWalletComponent } from './wallet/view-wallet/view-wallet.component';
import { AddWalletComponent } from './wallet/add-wallet/add-wallet.component';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';


@NgModule({
  declarations: [DiscountComponent, ViewDiscountComponent, AddFirstTimeCouponComponent, EditFirstTimeCouponComponent,
                 ViewFirstTimeCouponComponent, AddFlexibleCouponComponent, EditFlexibleCouponComponent,
                 ViewFlexibleCouponComponent, ViewWalletComponent, AddWalletComponent,
                 EditWalletComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteConfirmBoxComponent],
})
export class MarketingModule { }
