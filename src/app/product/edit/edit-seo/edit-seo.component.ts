import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditProduct } from './../edit-product/edit.model';
import { Product } from './../../../product/add-product/product.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-seo',
  templateUrl: './edit-seo.component.html',
  styleUrls: ['./edit-seo.component.css']
})
export class EditSeoComponent {

  @Input() editProductModel: EditProduct;
  @Input() productModel: Product;
  @Input() productForm: FormGroup;

  @Output() editProductSeoDetails =  new EventEmitter<any>();
  constructor() { }

  cancel() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = false;
  }
  editProductInfo() {
    this.editProductModel = new EditProduct();
    this.editProductModel.seoEdit = true;
  }
  updateProductSeoEvent(metaTitle, metaDescription, metaKeyword) {
    this.productModel = new Product();
    this.productModel.metaTitle = metaTitle;
    this.productModel.metaDescription = metaDescription;
    this.productModel.metaKeyword = metaKeyword;
    this.editProductSeoDetails.emit(this.productModel);
  }
}
