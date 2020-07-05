import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandRoutingModule } from './brand-routing.module';
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
  MatTableModule
} from '@angular/material';

import { ReactiveFormsModule} from '@angular/forms';
/* import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; */
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';

@NgModule({
  declarations: [AddBrandComponent, ViewBrandComponent, EditBrandComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrandRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    SharedModule,
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
    /* HttpClientModule */
  ],
  entryComponents: [DeleteConfirmBoxComponent ]
})
export class BrandModule { }
