import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule} from '@angular/forms';
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
  MatSortModule,
  MatTabsModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import {SalesRoutingModule} from './sales-routing.module';
import {SalesService} from './sales.service';
import { OrdersComponent } from './orders/orders.component';
import { ViewSingleOrderComponent } from './view-single-order/view-single-order.component';
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import { PurchaseOrderSettingComponent } from './purchase-order-setting/purchase-order-setting.component';
import { PurchaseOrderViewComponent } from './purchase-order-view/purchase-order-view.component';
import { ViewAllPurchaseOrderComponent } from './view-all-purchase-order/view-all-purchase-order.component';
import { ShipmentSettingComponent } from './shipment-setting/shipment-setting.component';
import { ViewTailoringDetailComponent } from './view-tailoring-detail/view-tailoring-detail.component';
import { TailoringDetailService } from './view-tailoring-detail/tailoring-detail.service';
import { ShippingFeesComponent } from './shipping-fees/shipping-fees.component';
import { ReviewPopupComponent } from './review-popup/review-popup.component';
import { ViewPurchaseOrderComponent } from './view-purchase-order/view-purchase-order.component';
import { ViewSinglePurchaseOrderComponent } from './view-single-purchase-order/view-single-purchase-order.component';
import { ViewPurchaseOrderService } from './view-single-purchase-order/view-purchase-order.service';
import { PickupDatePopupComponent } from './pickup-date-popup/pickup-date-popup.component';
import { PickupDateService } from './pickup-date-popup/pickup-date.service';
import { PopupCancelReasonComponent } from './popup-cancel-reason/popup-cancel-reason.component';
import { PopupCancelService } from './popup-cancel-reason/popup-cancel.service';
import { PopupRefundComponent } from './popup-refund/popup-refund.component';
import { PopupRefundService } from './popup-refund/popup-refund.service';
import { ViewReturnOrderComponent } from './return-order/view-return-order/view-return-order.component';
import { ViewSingleReturnOrderComponent } from './return-order/view-single-return-order/view-single-return-order.component';
import { ViewReasonPopupComponent } from './return-order/view-reason-popup/view-reason-popup.component';
import { ReasonPopService } from './return-order/view-reason-popup/reason-pop.service';
import { CustomerInvoiceSettingComponent } from './invoice/customer-invoice-setting/customer-invoice-setting.component';

@NgModule({
  declarations: [OrdersComponent, ViewSingleOrderComponent, PurchaseOrderSettingComponent,
     PurchaseOrderViewComponent, ViewAllPurchaseOrderComponent, ShipmentSettingComponent,
     ViewTailoringDetailComponent,
     ShippingFeesComponent,
     ReviewPopupComponent,
     ViewPurchaseOrderComponent,
     ViewSinglePurchaseOrderComponent,
     PickupDatePopupComponent,
     PopupCancelReasonComponent,
     PopupRefundComponent,
     ViewReturnOrderComponent,
     ViewSingleReturnOrderComponent,
     ViewReasonPopupComponent,
     CustomerInvoiceSettingComponent ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  entryComponents: [DeleteConfirmBoxComponent, ViewTailoringDetailComponent, PopupCancelReasonComponent,
                    ViewSingleOrderComponent, ReviewPopupComponent, PickupDatePopupComponent,
                    PopupRefundComponent, ViewReasonPopupComponent],
  providers: [
    SalesService, TailoringDetailService, ViewPurchaseOrderService, PickupDateService,
    PopupCancelService, PopupRefundService, ReasonPopService
  ]
})
export class SalesModule { }
