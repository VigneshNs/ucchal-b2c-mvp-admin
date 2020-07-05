import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransitionCheckState } from '@angular/material';
import { ProductService } from '../product.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-download-product-popup',
  templateUrl: './download-product-popup.component.html',
  styleUrls: ['./download-product-popup.component.css']
})
export class DownloadProductPopupComponent implements OnInit {
  selectedSuperCategory: any;
  selectedMainCategory: any;
  isMainCategory = false;
  isSubCategory = false;
  excelFormatStart: any = [{
    manufactureInfo: '',
    catalogueName: '',
    brandName: '',
    hsnCode: '',
    gstIn: '',
    sku: '',
    styleCode: '',
    variation: '',
    variationType: '',
    productType: '',
    sizeVariant: '',
    productName: '',
    color: '',
    weight: '',
    'productDimension(L*B*H)': '',
    'packingDimension(L*B*H)': '',
    withOutGSTMRP: '',
    discount: '',
    ttsPortol: '',
    ttsVendor: '',
    vp: '',
    sp: '',
    quantity: '',
    productDescription: '',
    pattern: '',
    costIncludes: ''
  }];
  excelFormatCenter = new Array();
  excelFormatEnd: any = [{
    searchTerms1: '',
    searchTerms2: '',
    searchTerms3: '',
    searchTerms4: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    note: ''
  }];
  selectedSubCategory: any;
  attribute: any;
  field: any;
  productModel: any;
  vendorModel: any;
  selectedVendor: any;
  loader = true;
  catalogueModel: any;
  isCatalogue = false;
  isCategory = false;
  selectedCatalogue: any;
  isCategoryVendor = true;
  isCatalogueVendor = false;
  isStatusVendor = false;
  status = [{name: 'Publish', value: true}, {name: 'Unpublish', value: false}];
  selectedStatus: any;
  showNoData = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              public dialogRef: MatDialogRef<DownloadProductPopupComponent>) { 
                this.getAllVendor();
              }

  ngOnInit() {
  }
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, err => {
      console.log(err);
    });
  }
  filterByCategory(category) {
    this.selectedSuperCategory = category.value;
    this.isCategory = true;
    if (this.selectedSuperCategory.mainCategory.length === 0) {
      this.isMainCategory = false;
      this.onSuperCategory();
    } else {
      this.isMainCategory = true;
     
    }
    console.log(category);
  }
  filterByMainCategory(mainCategory) {
    this.selectedMainCategory = mainCategory.value;
    if (this.selectedMainCategory.subCategory.length === 0) {
      this.isSubCategory = false;
    } else {
      this.isSubCategory = true;
    }
    console.log(mainCategory);
  }
  filterBySubCategory(subCategory) {
    this.selectedSubCategory = subCategory.value;
    this.onSubCategory();
  }
  filterByVendor(vendor) {

    this.selectedVendor = vendor.value;
    this.getCatalogueName(this.selectedVendor);
  }
  getCatalogueName(vendor) {
    this.productService.getCatalogueByVendor(vendor._id).subscribe(data => {
      this.catalogueModel = data.map(a => a.catalogueName);
      this.catalogueModel = this.catalogueModel.filter((el, i, a) => i === a.indexOf(el))
      if (this.catalogueModel.length !== 0) {
        this.isCatalogue = true;
      } else {
        this.isCatalogue = false;
      }
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  filterByCatalogue(e) {
    this.selectedCatalogue = e.value;
  }
  onDownload() {
    this.showNoData = false;
    if (this.isCategoryVendor) {
      if (!this.isMainCategory ) {
        this.getProductBySuperCategory();
      } else if (this.isSubCategory) {
        this.getProductBySubCategory();
      }
    } else if (this.isCatalogueVendor) {
      this.getProductByCatalogue();
    } else if (this.isStatusVendor) {
      this.getProductByVendorWithStatus();
    }
  }
  getProductByVendorWithStatus() {
    const holder = {
      status: this.selectedStatus
    };
    this.productService.getProductByvendorWithStatus(holder, this.selectedVendor._id).subscribe(data => {
      this.productModel = data;
      if (this.productModel.length === 0) {
        this.showNoData = true;
      } else {
        this.applyProductToField();
      }
    }, error => {
      console.log(error);
    });
  }
  getProductByCatalogue() {
    this.loader = false;
    const holder = {
      catalogueName: this.selectedCatalogue
    };
    this.productService.getProductByvendorandcatalogue(holder, this.selectedVendor._id).subscribe(data => {
      this.productModel = data;
      if (this.productModel.length === 0) {
        this.showNoData = true;
      } else {
        this.applyProductToField();
      }
    }, error => {
      console.log(error);
    });
  }
  getProductBySuperCategory() {
    this.loader = false;
    this.productService.getProductBySuperCategory(this.selectedSuperCategory._id, this.selectedVendor._id).subscribe(data => {
      this.productModel = data;
      if (this.productModel.length === 0) {
        this.showNoData = true;
      } else {
        this.applyProductToField();
      }
    }, error => {
      console.log(error);
    });
  }
  getProductBySubCategory() {
    this.loader = false;
    this.productService.getProductBySubCategory(this.selectedSubCategory._id, this.selectedVendor._id).subscribe(data => {
      this.productModel = data;
      if (this.productModel.length === 0) {
        this.showNoData = true;
      } else {
        this.applyProductToField();
      }
    }, error => {
      console.log(error);
    });
  }
  applyProductToField() {
    let key;
    let keY;
    let chKey;
    let chKeY;
    const temp = [];
    const fil = 'image1';
   /*  let tempField = this.field; */
    for (const product of this.productModel) {
      let tempField = {};
      // tslint:disable-next-line: forin
      for (key in product) {
        if (key === 'productImage') {
          tempField[fil] = product.productImage[0].productImageName;
        }  else {
          if (product.hasOwnProperty(key)) {
            tempField[key] = product[key];
          }
        }
      }
      temp.push(tempField);
      tempField = {};
     /*  tempField = this.field; */
      for (const child of product.child) {
        for (chKey in child) {
          if (chKey === 'productImage') {
            tempField[fil] = child.productImage[0].productImageName;
          } else if (chKey === 'attribute') {
            for (const attri of child.attribute) {
               for (keY in attri) {
                 if (attri.hasOwnProperty(keY)) {
                  tempField[keY] = attri[keY];
                 }
               }
            }
          } else {
            if (child.hasOwnProperty(chKey)) {
              tempField[chKey] = child[chKey];
            }
          }
        }
        temp.push(tempField);
        tempField = {};
        /* tempField = this.field; */
      }
    }
    temp.forEach(a => {
      delete a.child;
      delete a.attribute;
      delete a.tags;
      delete a.attributeFieldId;
      delete a.attributeId;
      delete a.colorId;
      delete a._id;
      delete a.vendorId;
      delete a.vendorId;
      delete a.superCategoryId;
      delete a.mainCategoryId;
    });
    
    this.productService.exportAsExcelFile(temp, 'file');
    this.loader = true;
    this.dialogRef.close(temp);
    console.log(temp);
   /*  const temp = [];
    for (const product of this.productModel) {
      temp.push(this.getKey(product));
    }
    console.log(temp); */
  }
  getKey(product) {
    let key;
    let chKey;
    const keys = [];
    const childKeys = []
    const temp = [];
    for (key in product) {
      if (product.hasOwnProperty(key)) {
        keys.push({name: key, value: product[key]});
      }
      temp.push(keys);
    }
    

    for (const child of product.child) {
      for (chKey in child) {
        if (child.hasOwnProperty(chKey)) {
          childKeys.push({name: chKey, value: child[chKey]});
        }
        temp.push(childKeys)
      }
    }
    return temp;
  }
  onSuperCategory() {
    this.attribute = this.selectedSuperCategory.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    console.log(this.attribute);
    const attributeField = {};
    for (const ite of this.attribute) {
      if (!attributeField[ite.fieldName]) {
        const subele = ite.fieldName;
        attributeField[subele] = '';
      }
    }
    const temp = Object.assign(attributeField, this.excelFormatEnd[0], this.excelFormatStart[0]);
    console.log(temp);
    this.field = temp;

  }
  onSubCategory() {
    this.attribute = this.selectedSubCategory.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    console.log(this.attribute);
    const attributeField = {};
    for (const ite of this.attribute) {
      if (!attributeField[ite.fieldName]) {
        const subele = ite.fieldName;
        attributeField[subele] = '';
      }
    }
    const temp = Object.assign(attributeField, this.excelFormatEnd[0], this.excelFormatStart[0]);
    console.log(temp);
    this.field = temp;
  }
  close() {
    this.dialogRef.close();
  }
  handleChange(e) {
    this.showNoData = false;
    if (e.target.value === 'option1') {
      this.isCategoryVendor = true;
      this.isCatalogueVendor = false;
      this.isStatusVendor = false;
    } else if (e.target.value === 'option2') {
      this.isCategoryVendor = false;
      this.isCatalogueVendor = true;
      this.isStatusVendor = false;
    } else if (e.target.value === 'option3') {
      this.isCategoryVendor = false;
      this.isCatalogueVendor = false;
      this.isStatusVendor = true;
    }
  }
  filterByStatus(e) {
    this.selectedStatus = e.value;
  }
}
