import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditProduct } from './../edit-product/edit.model';
import { SuperCategory } from '../../../category/super-category/superCategory.model';
import { MainCategory } from '../../../category/main-category/mainCategory.model';
import { SubCategory } from '../../../category/sub-category/sub-category.model';
import { BrandModel } from './../../../brand/add-brand/brand.model';
import { Product } from './../../../product/add-product/product.model';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  mainCategorySelected = false;
  subCategorySelected = false;
  supCategorySelected = false;
  supCategoryDetails: SuperCategory;
  mainCategoryDetails: MainCategory;
  subCategoryDetails: SubCategory;
  productModel: Product;
  supCategoryId;
  supCategoryName;
  mainCategoryId;
  mainCategoryName;
  subCategoryId;
  subCategoryName;
  @Input() editProductModel: EditProduct;
  @Input() superCategoryModel: SubCategory;
  @Output() editCategoryDetails =  new EventEmitter<any>();
  @Input() editCategoryName: string;
  @Input() productValue: any;
  @Input() editMainCategoryName: string;
  @Input() editSubCategoryName: string;
  constructor() { }

  ngOnInit() {
  }
  editCategory() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = true;
  }
  cancel() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = false;
    this.mainCategorySelected = false;
    this.subCategorySelected = false;
    this.supCategorySelected = false;
  }
  updateCategory()   {
    this.productModel = new Product();
    this.productModel.superCategoryId = this.supCategoryId;
    this.productModel.mainCategoryId = this.mainCategoryId;
    this.productModel.subCategoryId = this.subCategoryId;
    this.productModel.superCategoryName = this.supCategoryName;
    this.productModel.subCategoryName = this.subCategoryName;
    this.productModel.mainCategoryName = this.mainCategoryName;
    this.editCategoryDetails.emit(this.productModel);
  }
  categorySelected(e) {
    this.mainCategorySelected = true;
    this.supCategoryDetails = e.value;
    this.supCategoryId = this.supCategoryDetails._id;
    this.supCategoryName = this.supCategoryDetails.categoryName;
  }
  categoryMainCategory(e) {
    this.subCategorySelected = true;
    this.mainCategoryDetails = e.value;
    this.mainCategoryId = this.mainCategoryDetails._id;
    this.mainCategoryName = this.mainCategoryDetails.mainCategoryName;
  }
  categorySubCategory(e) {
    this.supCategorySelected = true;
    this.subCategoryDetails = e.value;
    this.subCategoryId = this.subCategoryDetails._id;
    this.subCategoryName = this.subCategoryDetails.subCategoryName;
  }
}
