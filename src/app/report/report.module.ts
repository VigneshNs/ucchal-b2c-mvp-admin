import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ReportRoutingModule } from './report-routing.module';
import { OrderStatusComponent } from './orderSummery/order-status/order-status.component';
import { FinancialStatusComponent } from './orderSummery/financial-status/financial-status.component';
import { PaymentModeStatusComponent } from './orderSummery/payment-mode-status/payment-mode-status.component';
import { MainTabComponent } from './orderSummery/main-tab/main-tab.component';
import { RecentOrderComponent } from './recent-order/recent-order.component';
import { TopCustomersComponent } from './top-customers/top-customers.component';

@NgModule({
  declarations: [OrderStatusComponent, FinancialStatusComponent, PaymentModeStatusComponent, MainTabComponent,
                 RecentOrderComponent, TopCustomersComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
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
  ReactiveFormsModule
  ]
})
export class ReportModule { }
