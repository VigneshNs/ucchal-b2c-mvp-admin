import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { UploadDocumentComponent } from './upload-document/upload-document.component';

const routes: Routes = [
  {
    path: 'vendorRegistration',
    component: RegistrationComponent
  },
  {
    path: 'viewAllVendor',
    component: ViewVendorComponent
  },
  {
    path: 'uploadDocument',
    component: UploadDocumentComponent
  },
  {
    path: 'overallAddress',
    component: AccountDetailsComponent,
    children: [
      {
        path: 'viewVendorProfile',
        component: ViewSingleVendorComponent
      },
      {
        path: 'editOfficeAddress',
        component: EditOfficeAddressComponent
      },
      {
        path: 'editSupplyAddress',
        component: EditSupplyLocationAddressComponent
      },
      {
        path: 'editPaymentDetails',
        component: EditPaymentDetailsComponent
      },
      {
        path: 'editDeliveryDetails',
        component: EditDeliveryDetailsComponent
      },
      {
        path: 'editPerformanceDetails',
        component: EditPerformanceDetailsComponent
      },
      {
        path: 'editSignatureDetails',
        component: EditSignatureDetailsComponent
      },
      {
        path: 'editUploadImage',
        component: EditUploadImagesComponent
      }
    ]
  },
  {
    path: 'setting',
    component: SettingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
