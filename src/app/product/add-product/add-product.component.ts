import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { Child } from './child.model';
import { ProductOption } from './../settings/product-option/add-product-option/product-option.model';
import { BrandModel } from './../../brand/add-brand/brand.model';
import { ProductOptionValue } from './../settings/product-option/add-product-option/product-option-value.model';
import { ProductSettings } from './../product-settings/product-settings.model';
import { SuperCategory } from '../../category/super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { SubCategory } from '../../category/sub-category/sub-category.model';
import { priceValue } from '../../shared/validation/price-validation';

/* import { Size } from './size.model'; */
import { MatTabChangeEvent, MatTab } from '@angular/material';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 tabItems = [{item: 'Category'}, {item: 'Brand'}, {item: 'Product Info'}, {item: 'Images'}, {item: 'Size'}, {item: 'SEO'} ];
  selectedItemTab = this.tabItems[0].item;
  selectedIndex = 0;
  matTab: MatTab;
  productForm: FormGroup;
  productModel: Product;
  productDetail: Product[];
  productOptionModel: ProductOption;
  productOptionValue: ProductOptionValue;
  size: Child[];
  productOptionModelId: any;
  productSettingsModel: ProductSettings;
  brandModel: BrandModel;
  mainCategoryModel = new Array();
  subCategoryModel = new Array();
  superCategoryModel: SuperCategory[];
  filteredSuperCategory = new Array();
  filteredMainCategory = new Array();
  selectedBrand: BrandModel;
  selectedBrandId: string;
  selectValueOptions = false;
  message;
  action;
  imageError: boolean;
  fileLength;
  fileToUpload;
  urls = new Array<string>();
  confirmSize: any = [];
  sizeFilter = [];
  reader: FileReader = new FileReader();
  material;
  color;
  sizeDetail;
  occasion;
  supCategoryDetails;
  mainCategoryDetails;
  subCategoryDetails;
  supCategoryId;
  mainCategoryId;
  subCategoryId;
  supCategoryName;
  subCategoryName;
  variantType = [{name: 'None', id: 1}, {name: 'Size', id: 2}, {name: 'Color', id: 3}, {name: 'SizeColor', id: 4}]
  attributeForm: FormGroup;
  mainCategoryName;
  mainCategorySelected = false;
  subCategorySelected = false;
  sizeError = false;
  isAttri = false;
  tagsDetail: any;
  productTagModel: any;
  sizeguideData: MatTableDataSource<any>;
  brandImageUrl: string;
  attributeModel: any[];
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService,
              private snackBar: MatSnackBar) {
                
               }

  ngOnInit() {
    this.createForm();
    this.showSuperCategory();
    this.getProducts();
    this.getProductSettings();
    this.getAllBrand();
    /* this.addProducts(); */
    this.getAllProductOption();
    this.getAllProductTag();
    this.getColor();
    this.getSizeGuide();
    this.brandImageUrl = AppSetting.brandImageUrl;
  }
  createForm() {
    this.productForm = this.fb.group({
      productName: [''],
      productDescription: [''],
      brandName: [''],
      productType: [''],
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
    temp.styleCode = this.productForm.controls.styleCode.value;
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
    temp.superCategoryId = this.supCategoryId;
    temp.superCategoryName = this.supCategoryName;
    temp.mainCategoryId = this.mainCategoryId;
    temp.mainCategoryName = this.mainCategoryName;
    temp.subCategoryId = this.subCategoryId;
    temp.subCategoryName = this.subCategoryName;
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
    this.productService.uploadSingleProduct(temp).subscribe(data => {
      console.log(data);
      this.router.navigate(['product/viewproduct']);
    }, error => {
      console.log(error);
    });
  }
  getAllBrand() {                                        // Retrieve All Brand
    this.productService.getAllBrand().subscribe(data => {
      this.brandModel = data;
    }, error => {
      console.log(error);
    });
  }
  getAllProductTag() {
    this.productService.allProductTag().subscribe(data => {
      this.productTagModel = data;
    }, error => {
      console.log(error);
    });
  }
  addForm() {
    if (!this.productOptionValue) {
      this.selectValueOptions  = true;
    } else {
    this.selectValueOptions  = false;
    const productoptionValue = this.fb.group({
      sizeName: [''],
      sku: [''],
      sizeQuantity: [''],
      sizePrice: [0],
    });
    this.productOptionValueForms.push(productoptionValue);
  }
  }
  selectOptionValueName(sizeData) {
    const totalSizeValue =  this.productOptionValueForms.getRawValue();
  }
  selectOptionValue(e) {
    this.productOptionModelId = e.value;
    this.productOptionValue = e.value.optionValue;
  }
  getAllProductOption() {
    this.productService.allProductOption().subscribe(data => {
      this.productOptionModel = data;
    }, error => {
      console.log(error);
    });
  }
  get  productOptionValueForms() {
    return this.productForm.get('optionValue') as FormArray;
  }
  deleteRequirements(i) {
    this.productOptionValueForms.removeAt(i);
  }
  selectedTab(tab) {
    this.selectedItemTab = tab;
  }
  brandSelected(brand) {
    this.selectedBrand = brand.value;
    this.selectedBrandId = brand.value._id;
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.productSettingsModel = data;
      this.material = data[0].material;
      this.sizeDetail = data[0].size;
      this.occasion = data[0].occasion;
      this.tagsDetail = data[0].tags;

    }, err => {
      console.log(err);
    });
  }
  getColor() {
    this.productService.getColors().subscribe(data => {
      this.color = data;
    }, err => {
      console.log(err);
    });
  }
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  selectNextTab(tab) {
    if (tab !== 3) {
      this.selectedIndex = tab + 1;
    } else {
      this.selectedIndex = 3;
    }
  }
  selectPreviousTab(tab) {
    if (tab !== 0) {
      this.selectedIndex = tab - 1;
    } else {
      this.selectedIndex = 0;
    }
  }
  selectedSizeDetails(sizeData) {
    this.sizeFilter =
      this.confirmSize.filter(data => data.sizeName.indexOf(sizeData.sizeName) !== -1);
    if (this.sizeFilter.length !== 0) {
      this.sizeError = true;
    } else {
      this.sizeError = false;
      this.confirmSize.push(sizeData);
    }
  }
  categorySelected(e) {
    this.mainCategorySelected = true;
    this.supCategoryDetails = e.value;
    this.supCategoryId = this.supCategoryDetails._id;
    this.supCategoryName = this.supCategoryDetails.categoryName;
    if (this.supCategoryDetails.mainCategory.length === 0) {
      this.getAttribute(this.supCategoryDetails.attribute);
    }
  }
  categoryMainCategory(e) {
    this.subCategorySelected = true;
    this.mainCategoryDetails = e.value;
    this.mainCategoryId = this.mainCategoryDetails._id;
    this.mainCategoryName = this.mainCategoryDetails.mainCategoryName;
    if (this.mainCategoryDetails.subCategory.length === 0) {
      this.getAttribute(this.mainCategoryDetails.attribute);
    }
  }
  categorySubCategory(e) {
    this.subCategoryDetails = e.value;
    this.subCategoryId = this.subCategoryDetails._id;
    this.subCategoryName = this.subCategoryDetails.subCategoryName;
    this.getAttribute(this.subCategoryDetails.attribute);
  }

  handleFileInput(images: any) {
    this.imageError = false;
    this.fileToUpload = images;
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  /* this.selectAllRegion(); */
  /* getSize() {
    this.productService.getProductSettings().subscribe(data => {
      this.sizeDetailData = data[0].size;
    }, err => {
      console.log(err);
    });
  } */
  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  getProducts() {
    this.productService.getAllProduct().subscribe(data => {
      this.productDetail = data;
      console.log(this.productDetail);
    }, err => {
      console.log(err);
    });
  }

  skuCodeVerify(skuCode) {
    const confirmFilter = this.confirmSize.filter(data => data.skuCode === skuCode);
    console.log(confirmFilter);
    /* this.productDetail.forEach(element => {
      if (element.skuCode === elem) {
        element.skuCodeVerify = true;
      } else {
        element.skuCodeVerify = false;
      }
    }); */
  }

  validateProducts() {
    if (this.productForm.controls.productName.value === ''
    || this.productForm.controls.styleCode.value === '') {
      this.selectedIndex = 2;
   /*    if (this.fileToUpload === undefined) {
        this.imageError = true;
        this.selectedIndex = 3;
      } else {
        this.imageError = false;
      } */
    } else if (this.fileToUpload === undefined) {
      this.selectedIndex = 3;
      this.imageError = true;
    } else if (!this.productOptionModelId) {
      this.selectedIndex = 4;
    } else {
      this.addProducts();
    }
  }
  cancelProduct() {
    this.router.navigate(['product/viewproduct']);
  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.styleCode = this.productForm.controls.styleCode.value;
    this.productModel.manufacturer = this.productForm.controls.manufacturer.value;
    this.productModel.bulletPoints = this.productForm.controls.bulletPoints.value;
    this.productModel.height = this.productForm.controls.height.value;
    this.productModel.weight = this.productForm.controls.weight.value;
    this.productModel.length = this.productForm.controls.length.value;
    this.productModel.breath = this.productForm.controls.breath.value;
    this.productModel.hsn = this.productForm.controls.hsn.value;
    this.productModel.material = this.productForm.controls.material.value;
    this.productModel.occassion = this.productForm.controls.occassion.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.tags = this.productForm.controls.tags.value;
    this.productModel.ttsVendor = this.productForm.controls.ttsVendor.value;
    this.productModel.vp = this.productForm.controls.vp.value;
    this.productModel.costIncludes = this.productForm.controls.costIncludes.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.quantity = this.productForm.controls.quantity.value;
    this.productModel.metaTitle = this.productForm.controls.metaTitle.value;
    this.productModel.metaDescription = this.productForm.controls.metaDescription.value;
    this.productModel.metaKeyword = this.productForm.controls.metaKeyword.value;
    this.productModel.superCategoryId = this.supCategoryId;
    this.productModel.mainCategoryId = this.mainCategoryId;
    this.productModel.subCategoryId = this.subCategoryId;
    this.productModel.superCategoryName = this.supCategoryName;
    this.productModel.mainCategoryName = this.mainCategoryName;
    this.productModel.subCategoryName = this.subCategoryName;
    this.productModel.brandId = this.selectedBrandId;
    this.productModel.sizeVariantId = this.productOptionModelId._id;
    this.productModel.child = this.productForm.controls.optionValue.value;
    this.productModel.sizeGuideId = this.productForm.controls.sizeGuideName.value._id;
    this.productModel.sizeGuideName = this.productForm.controls.sizeGuideName.value.sizeGuideName;
    this.productService.addProduct(this.productModel).subscribe(data => {
    /* this.productVariant(data._id); */
    this.uploadImagesS3(data._id);
    }, error => {
      console.log(error);
    });
  }
  /* productVariant(id) {
      this.size = this.productOptionValueForms.getRawValue();
      this.size.forEach(element => {
        element.productId  = id;
      });
      this.productService.addSizeVariant({size: this.size}).subscribe(data => {
    }, error => {
      console.log(error);
    });
  } */
  uploadImagesS3(id) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadImagesToS3(formData, id).subscribe(data => {
    this.uploadImages(data, id);
    }, error => {
      console.log(error);
    });
  }
  uploadImages(imageName, id) {
    this.productModel = new Product();
    this.productModel.productImage = imageName.map(e => e.originalname);
    this.productService.editProductImageName(this.productModel, id).subscribe(data => {
    this.redirect();
    }, error => {
      console.log(error);
    });
  }
  redirect() {
  /*   this.router.navigate(['product/viewproducts']); */
  }
  getSizeGuide() {
    this.productService.getSizeGuide().subscribe(data => {
      this.sizeguideData = data;
      console.log('size guide', data);
      }, error => {
        console.log(error);
      });
  }
}
