import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormArray  } from '@angular/forms';
import { EditProduct } from './../edit-product/edit.model';
import { Product } from './../../../product/add-product/product.model';
import { FormGroup } from '@angular/forms';
import { ProductOption } from './../../settings/product-option/add-product-option/product-option.model';
import { Child } from '../../add-product/child.model';
import { SizeGuide } from '../../size-guide/size-guide.model';

@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.css']
})
export class EditSizeComponent  {
  @Input() editProductModel: EditProduct;
  @Input() productModel: Product;
  @Input() productOptionModel: ProductOption;
  @Input() productForm: FormGroup;
  @Input() sizeguideData: SizeGuide;
  @Input() productOptionValueForms: FormArray;
  @Input() productOptionValue: ProductOption;
  @Output() add  =  new EventEmitter<any>();
  @Output() delete  =  new EventEmitter<any>();
  @Output() addProductVariantDetails  =  new EventEmitter<any>();
  @Output() editProductVariantDetails =  new EventEmitter<any>();
  @Output() deleteProductVariantDetails = new EventEmitter<any>();
  @Output() editProductSizeGuide = new EventEmitter<any>();
  sizeVariantData: Child[];
  sizeVariant: Child;
  showSave = false;
  holder: Product;
  constructor() {
   }

  addForm() {
    this.add.emit();
  }
  deleteVariant(id, productId) {
    this.sizeVariant = new Child();
    this.sizeVariant._id = id;
    this.sizeVariant.productId = productId;
    this.deleteProductVariantDetails.emit(this.sizeVariant);
  }
  addProductVariant(productForm, id) {
    this.sizeVariantData  = productForm.controls.optionValue.value;
    this.sizeVariantData.forEach(element => {
      element.productId  = id;
    });
    this.addProductVariantDetails.emit(this.sizeVariantData);
    productForm.controls.optionValue.clear();
  }

  editProductVariant(productId, id, sizeName, sizeQuantity, sizePrice) {
    this.sizeVariant = new Child();
    this.sizeVariant._id = id;
    this.sizeVariant.productId = productId;
    this.sizeVariant.sizeName = sizeName;
    this.editProductVariantDetails.emit(this.sizeVariant);
  }
  deleteForm() {
    this.delete.emit();
  }
  edit(editVariant, id )   {
    editVariant.forEach(element => {
      if (element._id === id ) {
        element.showDiv = true;
      } else {
        element.showDiv = false;
      }
    });
  }
  cancelVariant(editVariant) {
    editVariant.forEach(element => {
        element.showDiv = false;
    });
  }
  sizeGuideEdit(data) {
    data.guideEdit = true;
  }
  saveSizeGuide(row) {
    this.holder = new Product();
    this.holder.sizeGuideId = row._id;
    this.holder.sizeGuideName = row.title;
    this.editProductSizeGuide.emit(this.holder);
  }
}
