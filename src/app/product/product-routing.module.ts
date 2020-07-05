import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import {ProductSettingsComponent} from './product-settings/product-settings.component';
import { AddProductOptionComponent } from './settings/product-option/add-product-option/add-product-option.component';
import { ViewProductOptionComponent } from './settings/product-option/view-product-option/view-product-option.component';
import { EditProductOptionComponent } from './settings/product-option/edit-product-option/edit-product-option.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditImageComponent } from './edit/edit-image/edit-image.component';
import { AddProductTagComponent } from './settings/product-tags/add-product-tag/add-product-tag.component';
/* import { EditProductComponent } from './edit-product/edit-product.component'; */
import { EditProductComponent } from './edit/edit-product/edit-product.component';
import { ViewProductTagComponent } from './settings/product-tags/view-product-tag/view-product-tag.component';
import { EditProductTagComponent } from './settings/product-tags/edit-product-tag/edit-product-tag.component';
import {SizeGuideComponent} from './size-guide/size-guide.component';
import { ImageProductComponent } from './image-product/image-product.component';
import { ViewProductReviewComponent } from './view-product-review/view-product-review.component';
import { ViewSingleProductReviewComponent } from './view-single-product-review/view-single-product-review.component';
import { AddChildProductComponent } from './add-child-product/add-child-product.component';
import { ColorSettingComponent } from './settings/color-setting/color-setting.component';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { EditSizeGuideComponent } from './edit-size-guide/edit-size-guide.component';
import { DispatchSettingComponent } from './settings/dispatch-setting/dispatch-setting.component';
import { DiscountSettingComponent } from './settings/discount-setting/discount-setting.component';
import { ReadyToWearComponent } from './tailoring-service/ready-to-wear/ready-to-wear.component';
import { ViewReadyToWearComponent } from './tailoring-service/view-ready-to-wear/view-ready-to-wear.component';
import { EditReadyToWearComponent } from './tailoring-service/edit-ready-to-wear/edit-ready-to-wear.component';
import { ViewMeasurementComponent } from './tailoring-service/measurement/view-measurement/view-measurement.component';
import { AddMeasurementComponent } from './tailoring-service/measurement/add-measurement/add-measurement.component';
import { AddMeasurementStyleComponent } from './tailoring-service/measurement/add-measurement-style/add-measurement-style.component';
import { EditMeasurementComponent } from './tailoring-service/measurement/edit-measurement/edit-measurement.component';
import { ViewUploadedProductChildComponent } from './view-uploaded-product-child/view-uploaded-product-child.component';
import { ViewUploadedProductParentComponent} from './view-uploaded-product-parent/view-uploaded-product-parent.component';
/* import { AddBrandComponent } from './add-brand/add-brand.component';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
 */
import { CreateKameezMeasurementComponent } from './tailoring-service/kameez-measurement/create-kameez-measurement/create-kameez-measurement.component';
import { AddKameezMeasurementStyleComponent } from './tailoring-service/kameez-measurement/add-kameez-measurement-style/add-kameez-measurement-style.component';
import { EditKameezMeasurementComponent } from './tailoring-service/kameez-measurement/edit-kameez-measurement/edit-kameez-measurement.component';
import { ViewKameezMeasurementComponent } from './tailoring-service/kameez-measurement/view-kameez-measurement/view-kameez-measurement.component';
import { IncrementRateComponent } from './price-calculation/increment-rate/increment-rate.component';
import { PriceRateComponent } from './price-calculation/price-rate/price-rate.component';
import { AllProductResolver } from './gaurds/all-product.resolver';
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
import { AddBodyHeightComponent } from './price-calculation/body-height/add-body-height/add-body-height.component';
import { ViewBodyHeightComponent } from './price-calculation/body-height/view-body-height/view-body-height.component';
import { AddSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/add-size-wise-increment/add-size-wise-increment.component';
import { ViewSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/view-size-wise-increment/view-size-wise-increment.component';
import { EditSizeWiseIncrementComponent } from './price-calculation/size-wise-increment/edit-size-wise-increment/edit-size-wise-increment.component';
import { CreateNewArrivalComponent } from './newArrival/create-new-arrival/create-new-arrival.component';
import { ViewNewArrivalComponent } from './newArrival/view-new-arrival/view-new-arrival.component';
import { UpdateNewArrivalComponent } from './newArrival/update-new-arrival/update-new-arrival.component';
import { UpdateImageUrlComponent } from './update-image-url/update-image-url.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { RetrieveInventory } from './inventory/resolvers/retrieveInventory.resolver';

const routes: Routes = [{
  path: 'addproduct',
  component: AddProductComponent
},
{
  path: 'viewcolor',
  component: ColorSettingComponent
},
{
  path: 'test',
  component: ImageProductComponent
},
{
  path: 'dispatch',
  component: DispatchSettingComponent
},
{
  path: 'discount',
  component: DiscountSettingComponent
},
{
  path: 'editproduct/:id',
  component: EditProductComponent
},
{
  path: 'viewproduct',
  component: ViewProductComponent,
  /* resolve: {
    product: AllProductResolver
  } */
},
{
  path: 'productsettings',
  component: ProductSettingsComponent
},
{
  path: 'categorynote',
  component: CategoryNoteComponent
},
{
  path: 'addproductoption',
  component: AddProductOptionComponent
},
{
  path: 'viewproductoption',
  component: ViewProductOptionComponent
},
{
  path: 'editproductoption/:id',
  component: EditProductOptionComponent
},
{
  path: 'editimageproduct/:id',
  component: EditImageComponent
},
{
  path: 'addproducttags',
  component: AddProductTagComponent
},
{
  path: 'viewProductTag',
  component: ViewProductTagComponent
},
{
  path: 'editproductTag/:id',
  component: EditProductTagComponent
},
{
  path: 'sizeguide',
  component: SizeGuideComponent
},
{
  path: 'howtomeasure',
  component: HowToMeasureComponent
},
{
  path: 'edithowtomeasure/:id',
  component: EditHowToMeasureComponent
},
{
  path: 'viewProductReview',
  component: ViewProductReviewComponent
},
{
  path: 'uploadproduct',
  component: UploadProductComponent
},
{
  path: 'editsizeguide/:id',
  component: EditSizeGuideComponent
},

 {
  path: 'readyToWear',
  component: ReadyToWearComponent
},
{
  path: 'viewreadytowear',
  component: ViewReadyToWearComponent
},
{
  path: 'editReadyToWear/:id',
  component: EditReadyToWearComponent
},
{
  path: 'viewMeasurement',
  component: ViewMeasurementComponent
},
{
  path: 'addMeasurement',
  component: AddMeasurementComponent
},
{
  path: 'addMeasurementStyle/:id',
  component: AddMeasurementStyleComponent
},
{
  path: 'viewuploadproductchild/:id/:childId',
  component: ViewUploadedProductChildComponent
},
{
  path: 'viewuploadproductparent/:id',
  component: ViewUploadedProductParentComponent
},
{
  path: 'editMeasurement/:id',
  component: EditMeasurementComponent
},
{
  path: 'createkameezmeasurement',
  component: CreateKameezMeasurementComponent
},
{
  path: 'addkameezmeasurementstyle/:id',
  component: AddKameezMeasurementStyleComponent
},
{
  path: 'editkameezmeasurement/:id',
  component: EditKameezMeasurementComponent
},
{
  path: 'viewkameezmeasurement',
  component: ViewKameezMeasurementComponent
},
{
  path: 'incrementrate',
  component: IncrementRateComponent
},
{
  path: 'pricerate',
  component: PriceRateComponent
},
{
  path: 'createlehengameasurement',
  component: CreateLehengaMeasurementComponent
},
{
  path: 'addlehengameasurementstyle/:id',
  component: AddLehengaMeasurementStyleComponent
},
{
  path: 'editlehengameasurement/:id',
  component: EditLehengaMeasurementComponent
},
{
  path: 'viewlehengameasurement',
  component: ViewLehengaMeasurementComponent
},
{
  path: 'updateproduct',
  component: UpdateProductComponent
},
{
  path: 'productSequence',
  component: ProductSequenceComponent
},
{
  path: 'addplussize',
  component: AddPlusSizeComponent
},
{
  path: 'viewplussize',
  component: ViewPlusSizeComponent
},
{
  path: 'addbodyheight',
  component: AddBodyHeightComponent
},
{
  path: 'viewbodyheight',
  component: ViewBodyHeightComponent
},
{
  path: 'addsizewiseincrement',
  component: AddSizeWiseIncrementComponent
},
{
  path: 'viewsizewiseincrement',
  component: ViewSizeWiseIncrementComponent
},
{
  path: 'editsizewiseincrement/:id',
  component: EditSizeWiseIncrementComponent
},
{
  path: 'addsinglechildupload/:id',
  component: AddChildProductComponent
},
{
  path: 'createNewArrival',
  component: CreateNewArrivalComponent
},
{
  path: 'viewNewArrival',
  component: ViewNewArrivalComponent
},
{
  path: 'editNewArrival/:id',
  component: UpdateNewArrivalComponent
},
{
  path: 'updateimage',
  component: UpdateImageUrlComponent
},
{
  path: 'viewinventory',
  component: ViewInventoryComponent, resolve:{inventory: RetrieveInventory}
}

/*
{
  path: 'editbrand/:id',
  component: EditBrandComponent
} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
