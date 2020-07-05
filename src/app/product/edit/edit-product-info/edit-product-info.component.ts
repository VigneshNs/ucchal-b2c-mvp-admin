import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EditProduct } from './../edit-product/edit.model';
import { Product } from './../../../product/add-product/product.model';
import { FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ProductTag } from '../../settings/product-tags/add-product-tag/productTag.model';
import { Child } from '../../add-product/child.model';

@Component({
  selector: 'app-edit-product-info',
  templateUrl: './edit-product-info.component.html',
  styleUrls: ['./edit-product-info.component.css']
})
export class EditProductInfoComponent {
  @Input() editProductModel: EditProduct;
  @Input() productModel: Product;
  @Input() productForm: FormGroup;
  @Input() superCategoryModel: any;
  @Input() material;
  @Input() color;
  @Input() productTagModel: ProductTag;
  @Input() occasion;
  @Output() editProductInfoDetails =  new EventEmitter<any>();
  tailor = ['Yes', 'No'];
  colorHolder;
  isColorChange = false;
  colorId: any;
  prouductData;
  constructor( private productService: ProductService) { }

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
    this.editProductModel.productDetailsEdit = true;
    if (this.productModel.subCategoryId) {
      this.superCategoryModel.forEach(a => {
        if (a._id === this.productModel.superCategoryId) {
          a.mainCategory.forEach(b => {
            if (b._id === this.productModel.mainCategoryId) {
              b.subCategory.forEach(c => {
                if (c._id === this.productModel.subCategoryId) {
                  console.log(c.attribute);
                  c.attribute.forEach(el => {
                    if (el.fieldName === 'color') {
                      console.log(el);
                      this.colorHolder = el.fieldValue;
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      this.superCategoryModel.forEach(a => {
        if (a._id === this.productModel.superCategoryId) {
          console.log(a.attribute);
          a.attribute.forEach(el => {
            if (el.fieldName === 'color') {
              console.log(el);
              this.colorHolder = el.fieldValue;
            }
          });
        }
      });
    }
    console.log(this.colorHolder);
  }
  selectedColor(color, holder) {
    this.isColorChange = true;
    holder.forEach(element => {
      if (element.fieldAttributeValue === color.value) {
        this.colorId = element._id;
      }
    });
  }

updateChildInfo(productName, productDescription, hsnCode, manufactureInfo,  sku, vp, sp, quantity, discount, 
                variation, styleCode, variantType, weight,  sizeVariant, fabric,
                ttsPortol, ttsVendor, mrp, color, pattern, toFitWaist,
                searchTerms1,  searchTerms2, searchTerms3, searchTerms4, searchTerms5, ptn, tailor)   {
    this.prouductData = new Product();
  /*   this.productModel.productName = productName;
    this.productModel.productDescription = productDescription;
    this.productModel.manufacturer = manufactureInfo;
    this.productModel.bulletPoints = bulletPoints;
    this.productModel.height = height;
    this.productModel.weight = weight;
    this.productModel.length = length;
    this.productModel.breath = breath;
    this.productModel.material = material;
    this.productModel.occassion = occassion;
    this.productModel.color = colorName;*/
    this.prouductData.tailoringService = tailor;
    this.prouductData.PINTsku = ptn;
    this.prouductData.quantity = quantity;
    this.prouductData.productName = productName;
    this.prouductData.manufactureInfo = manufactureInfo;
    this.prouductData.variation  = variation;
    this.prouductData.hsnCode  = hsnCode;
    /* this.productModel.gstIn   = gstIn, */
    this.prouductData.sku   = sku;
    this.prouductData.styleCode  = styleCode;
    /* this.productModel.productsType   = productsType, */
    this.prouductData.variationType   = variantType;
    this.prouductData.sizeVariant = sizeVariant;
    /* this.productModel.quantity = qty, */
    /* this.productModel.size   = size, */
    this.prouductData.weight  = weight;
    this.prouductData.fabric   = fabric;
    /* this.productModel.washCare   = washCare, */
    /* this.productModel.productDimension   = productDimension, */
    /* this.productModel.packingDimension   = packingDimension, */
    this.prouductData.discount   = discount;
    this.prouductData.ttsPortol   = ttsPortol;
    this.prouductData.ttsVendor   = ttsVendor;
    this.prouductData.vp   = vp;
    this.prouductData.sp  = sp;
    this.prouductData.mrp   = mrp;
    this.prouductData.color   = color;
    this.prouductData.pattern   = pattern;
    this.prouductData.productDescription   = productDescription;
    this.prouductData.toFitWaist   =  toFitWaist;
    this.prouductData.searchTerms1   = searchTerms1;
    this.prouductData.searchTerms2   = searchTerms2;
    this.prouductData.searchTerms3   = searchTerms3;
    this.prouductData.searchTerms4   = searchTerms4;
    this.prouductData.searchTerms5   = searchTerms5;
    if (this.isColorChange === true) {
      this.prouductData.colorId = this.colorId;
    } else {
      this.prouductData.colorId = this.productModel.colorId;
    }

    this.editProductInfoDetails.emit(this.prouductData);
  }
}
