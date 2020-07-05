import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
  MatSliderModule
} from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { VendorService } from './vendor.service';
import { VendorRoutingModule } from './vendor-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ViewSingleVendorComponent } from './view-single-vendor/view-single-vendor.component';
import { EditOfficeAddressComponent } from './edit-office-address/edit-office-address.component';
import { EditSupplyLocationAddressComponent } from './edit-supply-location-address/edit-supply-location-address.component';
import { EditPaymentDetailsComponent } from './edit-payment-details/edit-payment-details.component';
import { EditDeliveryDetailsComponent } from './edit-delivery-details/edit-delivery-details.component';
import { EditPerformanceDetailsComponent } from './edit-performance-details/edit-performance-details.component';
import { EditSignatureDetailsComponent } from './edit-signature-details/edit-signature-details.component';
import { SettingComponent } from './setting/setting.component';
import { EditUploadImagesComponent } from './edit-upload-images/edit-upload-images.component';
import { SearchComponent } from './search/search.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import { PaymentSettlementComponent } from './payment-settlement/payment-settlement.component';


@NgModule({
  declarations: [RegistrationComponent, ViewVendorComponent,
    AccountDetailsComponent, ViewSingleVendorComponent, EditOfficeAddressComponent,
    EditSupplyLocationAddressComponent, EditPaymentDetailsComponent,
    EditDeliveryDetailsComponent, EditPerformanceDetailsComponent,
    EditSignatureDetailsComponent, SettingComponent, EditUploadImagesComponent, SearchComponent, UploadDocumentComponent, PaymentSettlementComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
    MatSliderModule
  ],
  providers: [VendorService],
  entryComponents: [AccountDetailsComponent,DeleteConfirmBoxComponent ]
})
export class VendorModule { }
