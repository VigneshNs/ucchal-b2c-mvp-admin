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
/* import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverallDashboardComponent } from './overall-dashboard/overall-dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { VendorCountResolver } from './guard/vendor-count.resolver';
import { ProductCountResolver } from './guard/product-count.resolver';
import { InventoryQtyResolver } from './guard/inventory-qty.resolver';
import { CategoryWiseCountResolver } from './guard/category-wise-count.resolver';
import { PurchaseOrderCountResolver } from './guard/purchase-order-count.resolver';
import { OutofStockCountResolver } from './guard/outOfStock-count.resolver';
import { CustomerChartResolver } from './guard/customer-chart.resolver';
import { OrderChartResolver } from './guard/order-chart.resolver';
@NgModule({
  declarations: [OverallDashboardComponent, MainDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
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
    MatTableModule
    /* HttpClientModule,
    HttpClientJsonpModule */
  ],
  providers: [ VendorCountResolver, ProductCountResolver, InventoryQtyResolver, CategoryWiseCountResolver,
               PurchaseOrderCountResolver, OutofStockCountResolver, CustomerChartResolver, OrderChartResolver ]
})
export class DashboardModule { }
