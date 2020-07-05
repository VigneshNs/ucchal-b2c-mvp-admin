import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatRadioButton,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTabsModule
} from '@angular/material';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './product.service';
import { AddProductOptionComponent } from './settings/product-option/add-product-option/add-product-option.component';
import { ViewProductOptionComponent } from './settings/product-option/view-product-option/view-product-option.component';
import { EditProductOptionComponent } from './settings/product-option/edit-product-option/edit-product-option.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit/edit-product/edit-product.component';
import { EditCategoryComponent } from './edit/edit-category/edit-category.component';
import { EditBrandComponent } from './edit/edit-brand/edit-brand.component';
import { EditImageComponent } from './edit/edit-image/edit-image.component';
import { EditProductInfoComponent } from './edit/edit-product-info/edit-product-info.component';
import { EditSeoComponent } from './edit/edit-seo/edit-seo.component';
import { EditSizeComponent } from './edit/edit-size/edit-size.component';
import { AddProductTagComponent } from './settings/product-tags/add-product-tag/add-product-tag.component';
import { ViewProductTagComponent } from './settings/product-tags/view-product-tag/view-product-tag.component';
import { EditProductTagComponent } from './settings/product-tags/edit-product-tag/edit-product-tag.component';
import { SizeGuideComponent } from './size-guide/size-guide.component';
import { ViewSizeGuideComponent } from './view-size-guide/view-size-guide.component';
import { ImageProductComponent } from './image-product/image-product.component';
import { ColorPaletteComponent } from './settings/color-picker/color-palette/color-palette.component';
import { ColorSliderComponent } from './settings/color-picker/color-slider/color-slider.component';
import { ViewProductReviewComponent } from './view-product-review/view-product-review.component';
import { ViewSingleProductReviewComponent } from './view-single-product-review/view-single-product-review.component';
import { ProductReviewService } from './view-single-product-review/product-review.service';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { ColorSettingComponent } from './settings/color-setting/color-setting.component';
import { HttpClientModule } from '@angular/common/http';
import {EditSizeGuideComponent} from '../product/edit-size-guide/edit-size-guide.component';
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import { DispatchSettingComponent } from './settings/dispatch-setting/dispatch-setting.component';
import { DiscountSettingComponent } from './settings/discount-setting/discount-setting.component';
import { ReadyToWearComponent } from './tailoring-service/ready-to-wear/ready-to-wear.component';
import { ViewReadyToWearComponent } from './tailoring-service/view-ready-to-wear/view-ready-to-wear.component';
import { EditReadyToWearComponent } from './tailoring-service/edit-ready-to-wear/edit-ready-to-wear.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ViewMeasurementComponent } from './tailoring-service/measurement/view-measurement/view-measurement.component';
import { AddMeasurementComponent } from './tailoring-service/measurement/add-measurement/add-measurement.component';
import { AddMeasurementStyleComponent } from './tailoring-service/measurement/add-measurement-style/add-measurement-style.component';
import { EditMeasurementComponent } from './tailoring-service/measurement/edit-measurement/edit-measurement.component';
import { CreateKameezMeasurementComponent } from './tailoring-service/kameez-measurement/create-kameez-measurement/create-kameez-measurement.component';
import { AddKameezMeasurementStyleComponent } from './tailoring-service/kameez-measurement/add-kameez-measurement-style/add-kameez-measurement-style.component';
import { EditKameezMeasurementComponent } from './tailoring-service/kameez-measurement/edit-kameez-measurement/edit-kameez-measurement.component';
import { ViewKameezMeasurementComponent } from './tailoring-service/kameez-measurement/view-kameez-measurement/view-kameez-measurement.component';
import {CarouselItemComponent} from './carousel-item/carousel-item.component';
import {CarouselItemDirective} from './carousel-item/carousel-item.directive';
import { ViewUploadedProductParentComponent } from './view-uploaded-product-parent/view-uploaded-product-parent.component';
import { ViewUploadedProductChildComponent } from './view-uploaded-product-child/view-uploaded-product-child.component';
import { IncrementRateComponent } from './price-calculation/increment-rate/increment-rate.component';
import { PriceRateComponent } from './price-calculation/price-rate/price-rate.component';
import { AllProductResolver } from './gaurds/all-product.resolver';
import { EditAttributeComponent } from './edit/edit-attribute/edit-attribute.component';
import { AddLehengaMeasurementStyleComponent } from './tailoring-service/lehenga-measurement/add-lehenga-measurement-style/add-lehenga-measurement-style.component';
import { CreateLehengaMeasurementComponent } from './tailoring-service/lehenga-measurement/create-lehenga-measurement/create-lehenga-measurement.component';
import { EditLehengaMeasurementComponent } from './tailoring-service/lehenga-measurement/edit-lehenga-measurement/edit-lehenga-measurement.component';
import { ViewLehengaMeasurementComponent } from './tailoring-service/lehenga-measurement/view-lehenga-measurement/view-lehenga-measurement.component';
import { CategoryNoteComponent } from './category-note/category-note.component';
import { HowToMeasureComponent } from './how-to-measure/how-to-measure.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { EditHowToMeasureComponent } from './edit-how-to-measure/edit-how-to-measure.component';
import { ProductSequenceComponent } from './product-sequence/product-sequence.component';
import { AddPlusSizeComponent } from './plus-size/add-plus-size/add-plus-size.component';
import { ViewPlusSizeComponent } from './plus-size/view-plus-size/view-plus-size.component';
import { PlusSizeService } from './plus-size/add-plus-size/plus-size.service';
import { AddBodyHeightComponent } from './price-calculation/body-height/add-body-height/add-body-height.component';
import { ViewBodyHeightComponent } from './price-calculation/body-height/view-body-height/view-body-height.component';
import { EditBodyHeightComponent } from './price-calculation/body-height/edit-body-height/edit-body-height.component';
import { BodyHeightService } from './price-calculation/body-height/edit-body-height/body-height.service';
import { AddSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/add-size-wise-increment/add-size-wise-increment.component';
import { ViewSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/view-size-wise-increment/view-size-wise-increment.component';
import { EditSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/edit-size-wise-increment/edit-size-wise-increment.component';
import { SizeWiseIncrementService } from './price-calculation/size-wise-increment/edit-size-wise-increment/size-wise-increment.service';
import { SizeGuideService } from './edit-size-guide/size-guide.service';
import { PriceRatePopupComponent } from './price-calculation/price-rate-popup/price-rate-popup.component';
import { PriceRateService } from './price-calculation/price-rate-popup/price-rate.service';
import { DownloadProductPopupComponent } from './download-product-popup/download-product-popup.component';
import { DownloadProductService } from './download-product-popup/download-product.service';
import { AddChildProductComponent } from './add-child-product/add-child-product.component';
import { CreateNewArrivalComponent } from './newArrival/create-new-arrival/create-new-arrival.component';
import { ViewNewArrivalComponent } from './newArrival/view-new-arrival/view-new-arrival.component';
import { UpdateNewArrivalComponent } from './newArrival/update-new-arrival/update-new-arrival.component';
import { UpdateImageUrlComponent } from './update-image-url/update-image-url.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { RetrieveInventory } from './inventory/resolvers/retrieveInventory.resolver';
import { PricePopupComponent } from './inventory/price-popup/price-popup.component';
import { QtyPopupComponent } from './inventory/qty-popup/qty-popup.component';
import { PricePopupService } from './inventory/price-popup/price-popup.service';
import { QtyPopupService } from './inventory/qty-popup/qty-popup.service';
import { UploadInventoryComponent } from './inventory/upload-inventory/upload-inventory.component';
import { UploadInventoryService } from './inventory/upload-inventory/upload-inventory.service';
/* import { CategoryTemplateComponent } from './category-template/category-template.component'; */
@NgModule({
  declarations: [AddProductComponent, ProductSettingsComponent,
    AddProductOptionComponent, ViewProductOptionComponent,
    EditProductOptionComponent, ViewProductComponent, EditProductComponent,
    EditCategoryComponent, ReadyToWearComponent,
    EditBrandComponent,
    EditImageComponent,
    EditProductInfoComponent,
    EditSeoComponent,
    EditSizeComponent,
    CarouselItemComponent,
    CarouselItemDirective,
    AddProductTagComponent,
    ViewProductTagComponent,
    EditProductTagComponent,
    SizeGuideComponent,
    ViewSizeGuideComponent,
    ImageProductComponent,
    ColorPaletteComponent,
    ColorSliderComponent,
    AddChildProductComponent,
    ViewProductReviewComponent,
    ViewSingleProductReviewComponent,
    UploadProductComponent,
    EditSizeGuideComponent,
    ColorSettingComponent,
    DispatchSettingComponent,
    DiscountSettingComponent,
    ViewReadyToWearComponent,
    EditReadyToWearComponent,
    ViewMeasurementComponent,
    AddMeasurementComponent,
    AddMeasurementStyleComponent,
    EditMeasurementComponent,
    CreateKameezMeasurementComponent,
    AddKameezMeasurementStyleComponent,
    EditKameezMeasurementComponent,
    ViewKameezMeasurementComponent,
    ViewUploadedProductParentComponent,
    ViewUploadedProductChildComponent,
    IncrementRateComponent,
    PriceRateComponent,
    EditAttributeComponent,
    CategoryNoteComponent,
    AddLehengaMeasurementStyleComponent,
    CreateLehengaMeasurementComponent,
    EditLehengaMeasurementComponent,
    ViewLehengaMeasurementComponent,
    HowToMeasureComponent,
    UpdateProductComponent,
    EditHowToMeasureComponent,
    ProductSequenceComponent,
    AddPlusSizeComponent,
    ViewPlusSizeComponent,
    AddBodyHeightComponent,
    ViewBodyHeightComponent,
    EditBodyHeightComponent,
    AddSizeWiseIncrementComponent,
    ViewSizeWiseIncrementComponent,
    EditSizeWiseIncrementComponent,
    PriceRatePopupComponent,
    DownloadProductPopupComponent,
    CreateNewArrivalComponent,
    ViewNewArrivalComponent,
    UpdateNewArrivalComponent,
    UpdateImageUrlComponent,
    ViewInventoryComponent,
    PricePopupComponent,
    QtyPopupComponent,
    UploadInventoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
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
    FormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    HttpClientModule,
    MatAutocompleteModule
  ],
  providers:
    [
      ProductService, ProductReviewService, AllProductResolver, PlusSizeService, BodyHeightService, RetrieveInventory,
      UploadInventoryService,
      SizeWiseIncrementService, SizeGuideService, PriceRateService, DownloadProductService, PricePopupService, QtyPopupService
    ],
    entryComponents: [ ViewSingleProductReviewComponent, DeleteConfirmBoxComponent, ViewPlusSizeComponent,
                       EditBodyHeightComponent, EditSizeWiseIncrementComponent, EditSizeGuideComponent,
                       PricePopupComponent, QtyPopupComponent, UploadInventoryComponent,
                       PriceRatePopupComponent, DownloadProductPopupComponent]
})
export class ProductModule { }
