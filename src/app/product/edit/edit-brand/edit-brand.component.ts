import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditProduct } from './../edit-product/edit.model';
import { BrandModel } from './../../../brand/add-brand/brand.model';
import { Product } from './../../add-product/product.model';
import { AppSetting } from '../../../config/appSetting';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  @Input() editProductModel: EditProduct;
  @Input() brandModel: BrandModel;
  @Input() brandId: string;
  @Output() editBrandId =  new EventEmitter<any>();
  selectedBrand: BrandModel;
  productModel: Product;
  selectedBrandId: string;
  brandImageUrl: string;
  constructor() {
    this.brandImageUrl = AppSetting.brandImageUrl;
  }

  ngOnInit() {
    console.log(this.brandModel);
  }

  brandEdit() {
    this.editProductModel = new EditProduct();
    this.editProductModel.brandEdit = true;
  }
  /* brandSelected(brand) {
    this.selectedBrand = brand.value;
    this.selectedBrandId = brand.value._id;
  } */
  updateBrandEvent(brand, brandValue) {
    this.selectedBrand = brandValue;
    this.selectedBrand = brandValue.find(e => e._id === brand.value);
    this.selectedBrandId = brand.value._id;
    this.productModel = new Product();
    this.productModel.brandId = brand.value;
    this.editBrandId.emit(this.productModel);
  }
}
