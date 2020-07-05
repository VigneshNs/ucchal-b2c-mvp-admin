import { Component,  OnInit } from '@angular/core';
import { Product } from '../../product/add-product/product.model';
import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import * as XLSX from 'xlsx';
import { Variant } from '../../product/add-product/variant.model';
import { Child } from '../../product/add-product/child.model';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from '../main-category/mainCategory.model';
import { SubCategory } from '../sub-category/sub-category.model';



@Component({
  selector: 'app-category-template',
  templateUrl: './category-template.component.html',
  styleUrls: ['./category-template.component.css']
})
export class CategoryTemplateComponent implements OnInit {
  bufferValue;
  marketingValue: any;
  title;
  vendorModel: any;
  vendorDetails: any;
  file: File;
  parentholder: Product[];
  array1 = [];
  a1: Variant[];
  totalArray: any;
  f1: Child;
  reader: FileReader = new FileReader();
  displayValue;
  superCategoryModel: any;
  supCategoryDetails: SuperCategory;
  mainCategoryDetails: MainCategory;
  subCategoryDetails: SubCategory;
  mainCategorySelected = false;
  subCategorySelected = false;
  supCategorySelected = false;
  superExcelEnable: boolean;
  mainExcelEnable: boolean;
  subExcelEnable: boolean;
  dataSubDeatils: Array<any>;
  fileLength;
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
  fileName: string;
  categoryS3Data: any;
  downloadExcelS3Data: any
  fileToUpload;
  excelUploadError = false;
  dataSubDeatilsTest;
  constructor(private categoryService: CategoryService, private router:Router) {
    this.dataSubDeatils = new Array();
   }

  ngOnInit() {
    this.getSuperCategory();
  }
  onSubmit(event) {
    this.file = event.target.files[0];
  }
  getAllVendor() {
    this.categoryService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, err => {
      console.log(err);
    });
  }
  categorySelected(e) {
    this.supCategoryDetails = new SuperCategory();
    this.mainCategorySelected = true;
    this.superExcelEnable = true;
    this.mainExcelEnable = false;
    this.subExcelEnable = false;
    this.supCategoryDetails = e.value;
    this.dataSubDeatils = new Array();
    this.excelFormatCenter = new Array();
    this.downloadExcelS3Data = this.superCategoryModel.find(element => element._id === this.supCategoryDetails._id);
    const dataSub = {};
    this.dataSubDeatils = this.supCategoryDetails.attribute;
    this.dataSubDeatils = this.supCategoryDetails.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    console.log(this.dataSubDeatils);
    for (const ite of this.dataSubDeatils) {
      if (!dataSub[ite.fieldName]) {
        const subele = ite.fieldName;
        dataSub[subele] = '';
      }
    }
    
    this.dataSubDeatilsTest = this.getKeys(this.dataSubDeatils)
    this.excelFormatCenter.push(dataSub);
  }
public getKeys =  (arr) => {
  var key, keys = [];
  for (let i = 0; i < arr.length; i++) {
      for (key in arr[i]) {
          if (arr[i].hasOwnProperty(key)) {
              keys.push({name: key, value: arr[i][key]});
          }
      }
  }
  return keys;
}
  categoryMainCategory(e) {
    this.subCategorySelected = true;
    this.mainCategoryDetails = new MainCategory();
    this.downloadExcelS3Data = new Object();
    this.superExcelEnable = false;
    this.mainExcelEnable = true;
    this.subExcelEnable = false;
    this.mainCategoryDetails = e.value;
  }
  downloadExcel() {
    const exelFormat = this.excelFormatCenter.length > 0 ? this.excelFormatStart.concat(this.excelFormatCenter, this.excelFormatEnd) : this.excelFormatStart.concat(this.excelFormatEnd);
    if(this.subCategoryDetails){
      this.categoryService.exportAsExcelFile(exelFormat, this.dataSubDeatils, this.subCategoryDetails.subCategoryName);
    } else {
      
      this.categoryService.exportAsExcelFile(exelFormat, this.dataSubDeatils, this.supCategoryDetails.categoryName);
        }
  }
  categorySubCategory(e) {
    
    this.subCategoryDetails = new SubCategory();
    this.subCategoryDetails = e.source.value;
    /* this.dataSubDeatils = new Category */
    this.supCategorySelected = true;
    this.superExcelEnable = false;
    this.mainExcelEnable = false;
    this.subExcelEnable = true;
    const dataSub = {};
    this.dataSubDeatils = new Array();
    this.excelFormatCenter = new Array();
    this.dataSubDeatils = this.subCategoryDetails.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    for (const ite of this.dataSubDeatils) {
      if (!dataSub[ite.fieldName]) {
        const subele = ite.fieldName;
        dataSub[subele] = '';
      }
    }
    this.excelFormatCenter.push(dataSub);
  }

  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  handleFileInputSingle(excel: any)   {
    this.fileToUpload = excel;
    this.fileName = this.fileToUpload[0].name.substr(0, this.fileToUpload[0].name.lastIndexOf("."));
  }
  uploadExcel() {
    this.excelUploadError = false;
    const formData: any = new FormData();
    let attributeId: string;
    let attributeName: string;
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('excel', this.fileToUpload[i]);
    }
    if(this.subCategoryDetails){
      attributeId = this.subCategoryDetails._id;
      attributeName = this.subCategoryDetails.subCategoryName;
    } else {
      attributeId = this.supCategoryDetails._id;
      attributeName = this.supCategoryDetails.categoryName;
        }
    if(attributeName === this.fileName){
      this.categoryService.uploadSingleExcel(formData, attributeId).subscribe(data => {
      }, error => {
        console.log(error);
      });
    } else {
        this.excelUploadError = true;
    }
  }
  downloadSubExcel() {
    this.categoryService.downloadSubExcel(this.supCategoryDetails._id, this.mainCategoryDetails._id, this.subCategoryDetails._id).subscribe(data => {
      const setValu = this.base64ToBlob(data);
      /* let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); */
      this.categoryService.saveAsExcelFile(setValu, this.subCategoryDetails.subCategoryName.trim());
    }, error => {
      console.log(error);
    });
  }
  downloadMainExcel() {
    this.categoryService.downloadMainExcel(this.supCategoryDetails._id, this.mainCategoryDetails._id).subscribe(data => {
      const setValu = this.base64ToBlob(data);
      this.categoryService.saveAsExcelFile(setValu, this.mainCategoryDetails.mainCategoryName);
    }, error => {
      console.log(error);
    });
  }
  downloadSuperExcel() {
    this.categoryService.downloadSuperExcel(this.supCategoryDetails._id).subscribe(data => {
      const setValu = this.base64ToBlob(data);
      this.categoryService.saveAsExcelFile(setValu, this.supCategoryDetails.categoryName);
    }, error => {
      console.log(error);
    });
  }
  public base64ToBlob(b64Data, sliceSize=512) {
    let byteCharacters = atob(b64Data); //data.file there
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
    
        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    }
}
