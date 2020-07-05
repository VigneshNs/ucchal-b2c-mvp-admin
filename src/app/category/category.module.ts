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
} from '@angular/material';
/* import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; */
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryService} from './category.service';
import { SuperCategoryComponent } from './super-category/super-category.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditMainCategoryComponent } from '../category/edit-main-category/edit-main-category.component';
import { EditSubCategoryComponent } from '../category/edit-sub-category/edit-sub-category.component';
import { EditSuperCategoryComponent } from '../category/edit-super-category/edit-super-category.component';

import {DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import {SharedModule} from '../shared/shared.module';
import { CategoryTemplateComponent } from './../category/category-template/category-template.component';
import { SupercategoryResolver } from './../category/resolver/supercategory-product-resolver';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import {  AttributeEditService } from './attribute-edit/attribute-edit.service';
import { AddSuperCategoryComponent } from './add-super-category/add-super-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddMainCategoryComponent } from './add-main-category/add-main-category.component';
@NgModule({
  declarations: [SuperCategoryComponent, MainCategoryComponent, SubCategoryComponent, EditMainCategoryComponent, 
                 EditSubCategoryComponent, EditSuperCategoryComponent, CategoryTemplateComponent, AttributeEditComponent, AddSuperCategoryComponent, AddSubCategoryComponent, AddMainCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
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
    MatSlideToggleModule
  ],
  entryComponents: [AttributeEditComponent, DeleteConfirmBoxComponent],
  providers:
   [
    CategoryService,
    SupercategoryResolver,
    AttributeEditService
   ],
   
})
export class CategoryModule { }
