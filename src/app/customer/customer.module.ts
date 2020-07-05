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
} from '@angular/material';
/* import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; */

import { CustomerRoutingModule } from './customer-routing.module';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewCustomerAddressComponent } from './view-customer-address/view-customer-address.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerOrderDetailsComponent } from './view-customer-order-details/view-customer-order-details.component';
import {DeleteConfirmBoxComponent } from '../shared/delete-confirm-box/delete-confirm-box.component';
import { SharedModule} from '../shared/shared.module';
import { ViewInquiriesComponent } from './view-inquiries/view-inquiries.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { ViewSingleCustomerComponent } from './view-single-customer/view-single-customer.component';

@NgModule({
  declarations: [ViewCustomerComponent, ViewCustomerAddressComponent, AddCustomerComponent,
                  EditCustomerComponent, ViewCustomerOrderDetailsComponent, ViewInquiriesComponent,
                  ViewSubscriberComponent, ViewSingleCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule,
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
    MatTableModule
    /* HttpClientModule,
    HttpClientJsonpModule */
  ],
  entryComponents: [DeleteConfirmBoxComponent],
})
export class CustomerModule { }
