import { Component, OnInit } from '@angular/core';
import { Product } from '../add-product/product.model';
import { Child } from '../add-product/child.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { MatTabChangeEvent, MatTab } from '@angular/material';

@Component({
  selector: 'app-add-child-product',
  templateUrl: './add-child-product.component.html',
  styleUrls: ['./add-child-product.component.css']
})
export class AddChildProductComponent implements OnInit {
  id: string;
  category: any;
  productForm: FormGroup;
  attributeModel: any[];
  attributeForm: FormGroup;
  selectedIndex = 0;
  matTab: MatTab;
  productTagModel;
  isAttri = false;
  variantType = [{name: 'None', id: 1}, {name: 'Size', id: 2}, {name: 'Color', id: 3}, {name: 'SizeColor', id: 4}]

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private fb: FormBuilder) {
                this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
                  this.id = params.get('id');
                });
                this.getCategoryByProductID();
               }

  ngOnInit() {
    this.createForm();
  }
  getCategoryByProductID() {
    this.productService.getCategoryUsingProductID(this.id).subscribe(data => {
      this.category = data;
      console.log(data);
      this.getAttribute(data.attribute);
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.productForm = this.fb.group({
      productName: [''],
      productDescription: [''],
      sku: [''],
      variationType: [''],
      manufacturer:  [''],
      weight: [''],
      packOf: [''],
      washCare: [''],
      hsn: [''],
      fabric: [''],
      styleCode: [''],
      discount: [''],
      pattern: [''],
      productDimension: [''],
      packingDimension: [''],
      ttsPortal: [''],
      searchTerms1: [''],
      searchTerms2: [''],
      searchTerms3: [''],
      searchTerms4: [''],
      searchTerms5: [''],
      mrp: [''],
      color:  [''],
      sp: [''],
      vp: [''],
      sizeVariant: [''],
      ttsVendor: [''],
      costIncludes: [''],
      tags: [''],
      price:  [''],
      quantity: [''],
      productImage: this.fb.array([]),
      child: this.fb.array([]),
      optionValue: this.fb.array([])
      /*  sizeVariant: this.fb.array([
       ]) */
    });
  }
  addImageForm() {
    const productImage = this.fb.group({
      productImageName: ['']
    });
    this.productImageForm.push(productImage);
  }
  deleteImageForm(i) {
  this.productImageForm.removeAt(i);
  }
  get  productImageForm() {
  return this.productForm.get('productImage') as FormArray;
  }
  getAttribute(attribute) {
    console.log(attribute);
    let key;
    let obj = {};
    const temp = [];
    const array = [];
    for (const attri of attribute) {
      const keys = [];
      for (key in attri) {
        if (attri.hasOwnProperty(key)) {
         /*  obj[key] = ''; */
          keys.push({name: key, value: attri[key]});
        }
      }
      temp.push(keys);
    }
    for (const first of temp) {
      for (const second of first) {
        obj[second.name] = second.value;
      }
      array.push(obj);
      obj = {};
    }
    console.log(array);
    this.attributeModel = array;
    this.createDynamicForm();
  }
  createDynamicForm() {
    const group = {};
    this.attributeModel.forEach(element => {
      group[element.fieldName]  = new FormControl('');
    });
    this.attributeForm = new FormGroup(group);
    this.isAttri = true;
  }
  saveAttri() {
    console.log(this.attributeForm.controls);
    const array = [];
    let obj: any = {};
    for (const attri of this.attributeModel) {
      if (attri.fieldType === 'Dropdown') {
        obj.attributeId = attri._id;
        obj.attributeFieldId = this.attributeForm.controls[attri.fieldName].value._id;
        obj[attri.fieldName] = this.attributeForm.controls[attri.fieldName].value.fieldAttributeValue;
      } else {
        obj.attributeId = attri._id;
        obj.attributeFieldId = 'None';
        obj[attri.fieldName] = this.attributeForm.controls[attri.fieldName].value;
      }
      array.push(obj);
      obj = {};
    }
    console.log(array);
    this.saveProduct(array);
  }
  saveProduct(attribute) {
    const temp = new Product();
    temp.productName = this.productForm.controls.productName.value;
    temp.productDescription = this.productForm.controls.productDescription.value;
    temp.manufactureInfo = this.productForm.controls.manufacturer.value;
    temp.hsnCode = this.productForm.controls.hsn.value;
    temp.sku = this.productForm.controls.sku.value;
    /* temp.styleCode = this.productForm.controls.styleCode.value; */
    temp.variationType = this.productForm.controls.variationType.value.name;
    temp.variationId = this.productForm.controls.variationType.value.id;
    temp.weight = this.productForm.controls.weight.value;
    temp.packOf = this.productForm.controls.packOf.value;
    temp.washCare = this.productForm.controls.washCare.value;
    temp.sp = this.productForm.controls.sp.value;
    temp.productDimension = this.productForm.controls.productDimension.value;
    temp.packingDimension = this.productForm.controls.packingDimension.value;
    temp.discount = this.productForm.controls.discount.value;
    temp.mrp = this.productForm.controls.mrp.value;
    /* temp.superCategoryId = this.supCategoryId === undefined ? 'None' : this.supCategoryId;
    temp.superCategoryName = this.supCategoryName === undefined ? 'None' : this.supCategoryName;
    temp.mainCategoryId = this.mainCategoryId === undefined ? 'None' : this.mainCategoryId;
    temp.mainCategoryName = this.mainCategoryName === undefined ? 'None' : this.mainCategoryName;
    temp.subCategoryId = this.subCategoryId === undefined ? 'None' : this.subCategoryId;
    temp.subCategoryName = this.subCategoryName === undefined ? 'None' : this.subCategoryName; */
    temp.searchTerms1 = this.productForm.controls.searchTerms1.value;
    temp.searchTerms2 = this.productForm.controls.searchTerms2.value;
    temp.searchTerms3 = this.productForm.controls.searchTerms3.value;
    temp.searchTerms4 = this.productForm.controls.searchTerms4.value;
    temp.searchTerms5 = this.productForm.controls.searchTerms5.value;
    temp.price = this.productForm.controls.price.value;
    temp.pattern = this.productForm.controls.pattern.value;
    temp.ttsPortol = this.productForm.controls.ttsPortal.value;
    temp.ttsVendor = this.productForm.controls.ttsVendor.value;
    temp.vp = this.productForm.controls.vp.value;
    temp.costIncludes = this.productForm.controls.costIncludes.value;
    temp.tags = this.productForm.controls.tags.value;
    temp.quantity = this.productForm.controls.quantity.value;
    for (const attri of attribute) {
      if (attri.fieldName === 'color') {
        temp.color = attri.color;
        temp.colorId = attri.attributeFieldId;
      } else {
        temp.color = 'None';
        temp.colorId = 'None';
      }
      if (attri.fieldName === 'fabric') {
        temp.fabric = attri.fabric;
      } else {
        temp.fabric = 'None';
      }
      if (attri.fieldName === 'size') {
        temp.sizeVariant = attri.size;
        temp.sizeVariantId = attri.attributeFieldId;
      } else {
        temp.sizeVariant = 'None';
        temp.sizeVariantId = 'None';
      }
    }
    temp.attribute = attribute;
    temp.productImage = this.productForm.controls.productImage.value;
    console.log(temp);
    this.productService.uploadSingleChildProduct(temp, this.id).subscribe(data => {
      console.log(data);
      this.router.navigate(['product/viewproduct']);
    }, error => {
      console.log(error);
    });
  }
  cancelProduct() {
    this.router.navigate(['product/viewproduct']);
  }
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
}
