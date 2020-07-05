import { Component,  OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from './../../shared/model/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import * as XLSX from 'xlsx';
import { Variant } from '../add-product/variant.model';
import { SubCategory } from './../../shared/model/sub-category.model';
import { SuperCategory } from './../../shared/model/superCategory.model';
import { MainCategory } from './../../shared/model/mainCategory.model';
import { Child } from './../../shared/model/child.model';
import { ProductImage } from '../add-product/productImage.model';
import {map, startWith} from 'rxjs/operators';
import { AppSetting } from '../../config/appSetting';
import {Observable} from 'rxjs';
import { FieldAttributeValue } from 'src/app/category/sub-category/field-attribute-value.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('search', {static: true}) search: ElementRef;
  vendorNameList = new FormControl('');
  bufferValue;
  marketingValue: any;
  isValidate = false;
  showError = false;
  title;
  vendorModel: any[] = [];
  vendorDetails: any;
  file: File;
  parentholder: Product[];
  array1 = [];
  a1: Variant[];
  totalArray: any;
  excelUrl: string = AppSetting.excelUrl;
  f1: Child;
  reader: FileReader = new FileReader();
  displayValue;
  superCategoryModel: SuperCategory;
  supCategoryDetails: SuperCategory;
  mainCategoryDetails: MainCategory;
  subCategoryDetails: SubCategory;
  mainCategorySelected = false;
  subCategorySelected = false;
  supCategorySelected = false;
  dataSubColor: any;
  dataSubSize: any;
  dataSubDeatils: Array<any>;
  loader = true;
  fileLength;
  variantionDropDown = [{_id: 1, name: 'Parent'}, {_id: 2, name: 'Child'}];
  variantionTypeDropDown = [{_id: 1, name: 'None' }, {_id: 2, name: 'Size'  }, {_id: 3, name: 'Color' },  {_id: 4, name: 'SizeColor' } ];
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
    productDimension: '',
    packingDimension: '',
    mrp: '',
    discount: '',
    ttsPortol: '',
    ttsVendor: '',
    vp: '',
    sp: '',
    quantity: '',
    productDescription: '',
    pattern: '',
    costIncludes: '',
    tailoringService: ''
  }];
  excelFormatCenter = [];
  limit: number = AppSetting.limitResize;
  /* subCategoryArray = [{
    id: 1, name: 'Bag', attribute: [
      { filedName: 'warranty' },
      { filedName: 'compartmentClosure' },
      { filedName: 'numberOfExternalPockets' },
      { filedName: 'numberOfMainCompartments' },
      { filedName: 'slingStrap' },
    ]
  }, {
    id: 2, name: 'Blouse', attribute: [
      { filedName: 'neck' },
      { filedName: 'sleeveLength' },
      { filedName: 'occasion' },
      { filedName: 'acrossShoulder' },
      { filedName: 'frontLength' },
    ]
  },
  {
    id: 3, name: 'Jwellery', attribute: [
      { filedName: 'stoneType' },
      { filedName: 'plating' },
      { filedName: 'warranty' },
      { filedName: 'trends' },
      { filedName: 'numberOfComponents' },
      { filedName: 'frontLength' },
    ]
  },
  {
    id: 4, name: 'Kurti', attribute: [
      { filedName: 'fitType' },
      { filedName: 'neckLine' },
      { filedName: 'sleeveLength' },
      { filedName: 'kurthiType' },
      { filedName: 'stichType' },
      { filedName: 'kurtaSet' },
      { filedName: 'acrossShoulder' },
      { filedName: 'bust' },
      { filedName: 'chest' },
      { filedName: 'frontLength' },
      { filedName: 'toFitBust' },
      { filedName: 'sleeveLength' },
      { filedName: 'toFitWaist' },
      { filedName: 'waist' },
    ]
  },
  {
    id: 5, name: 'Lehenga', attribute: [
      { filedName: 'lehengaFabric' },
      { filedName: 'blouseFabric' },
      { filedName: 'dupattaFabric' },
      { filedName: 'lehengaLiningFabric' },
      { filedName: 'lehengaClosure' },
      { filedName: 'hemline' },
      { filedName: 'blouseClosure' },
      { filedName: 'neck' },
      { filedName: 'sleeveLength' },
      { filedName: 'lehengaStitch' },
      { filedName: 'choliStitch' },
      { filedName: 'dupatta' },
      { filedName: 'topPattern' },
      { filedName: 'bottomPattern' },
      { filedName: 'dupattaPattern' },
      { filedName: 'dupattaBorder' }
    ]
  },
  {
    id: 6, name: 'Salwar', attribute: [
      { filedName: 'toFitWaist' },
      { filedName: 'inseamLength' },
      { filedName: 'outseamLength' },
      { filedName: 'toFitHip' }
    ]
  },
  {
    id: 7, name: 'Saree', attribute: [
      { filedName: 'workType' },
      { filedName: 'border' },
      { filedName: 'blouseFabric' },
      { filedName: 'blouse' }
    ]
  },
  {
    id: 8, name: 'Shirts', attribute: [
      { filedName: 'hemline' },
      { filedName: 'placket' },
      { filedName: 'placketLength' },
      { filedName: 'cuff' },
      { filedName: 'pocketType' },
      { filedName: 'numberOfPockets' },
      { filedName: 'pocketType' },
      { filedName: 'collarStyle' },
      { filedName: 'neck' },
      { filedName: 'sleeveLength' },
      { filedName: 'occasion' },
      { filedName: 'acrossShoulder' },
      { filedName: 'bust' },
      { filedName: 'chest' },
      { filedName: 'frontLength' },
      { filedName: 'toFitBust' },
      { filedName: 'SleeveLength' },
      { filedName: 'toFitWaist' },
      { filedName: 'waist' }
    ]
  } ];
 */
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
  }];
  categoryS3Data: any;
  downloadExcelS3Data: any;
  fileToUpload;
  emptySubDeatils = new Array();
  excelUrlTemplate: string;
  filteredOptions: Observable<any[]>;
  vendorSku: any;
  isSameSKU = false;
  isCatalogueSKU = false;
  message: string;
  action: string;
  constructor(private productService: ProductService, private router: Router,
              private snackBar: MatSnackBar) {
    this.getAllVendor();
    this.dataSubDeatils = new Array();
   }

  ngOnInit() {
    this.getSuperCategory();
    this.filteredOptions = this.vendorNameList.valueChanges.pipe(
      startWith('vendorName'),
      map(value => this.filter(value))
    );

  }
  filter(value) {
    const filterValue = value;
    this.vendorModel.forEach(data => {
      if (!data.vendorName)           {
        data.vendorName = 0;
      }
    });
    
    return this.vendorModel.filter(option => option.vendorName.toString().toUpperCase().indexOf(filterValue.toString().toUpperCase()) > -1);
  }
  onSubmit(event) {
    this.file = event.target.files[0];
  }
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
     /*  this.filteredOptions = data; */
    }, err => {
      console.log(err);
    });
  }
  
  categorySelected(e) {
    this.supCategoryDetails = new SuperCategory();
    this.subCategoryDetails = new SubCategory();
    this.mainCategoryDetails = new MainCategory();
    this.mainCategorySelected = true;
    this.supCategoryDetails = e.value;
    this.dataSubDeatils = new Array();
    this.excelFormatCenter = new Array();
    const dataSub = {};
    this.dataSubDeatils = this.supCategoryDetails.attribute;
    this.dataSubDeatils = this.supCategoryDetails.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    const findColor = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Color'));
    const findSize = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Size'));
    this.dataSubColor = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Color'))  === undefined ?   this.emptySubDeatils : findColor.fieldValue;
    this.dataSubSize = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Size'))  === undefined ?  this.emptySubDeatils :  findSize.fieldValue;
    for (const ite of this.dataSubDeatils) {
      if (!dataSub[ite.fieldName]) {
        const subele = ite.fieldName;
        dataSub[subele] = '';
      }
    }
    this.excelFormatCenter.push(dataSub);
    this.downloadExcelS3();
  }
  selectVendor(e, vendor) {
    this.vendorDetails = vendor;
    this.productService.getProductByVendor(vendor._id).subscribe(data => {
      console.log('vendor prodct', data);
      this.vendorSku = data;
    }, error => {
      console.log(error);
    });
  }
  onCancel(){
    this.router.navigate(['product/viewproduct']);
  }
  categoryMainCategory(e) {
    this.subCategorySelected = true;
    this.downloadExcelS3Data = new Object();
    this.mainCategoryDetails = e.value;
  }
  downloadExcel(vendorId) {
    const exelFormat = this.excelFormatCenter.length > 0 ? this.excelFormatStart.concat(this.excelFormatCenter, this.excelFormatEnd) : this.excelFormatStart.concat(this.excelFormatEnd);
    this.productService.exportAsExcelFile(exelFormat, vendorId);
  }
  downloadExcelS3(){
   /*  this.productService.excelDownloadFormS3().subscribe(data => {
      this.categoryS3Data = data.category;
    }, err => {
      console.log(err);
    }); */
    let attributeId: string;
    if(this.subCategoryDetails){
      attributeId = this.subCategoryDetails._id
      this.excelUrlTemplate = this.excelUrl + attributeId + '/' + this.subCategoryDetails.subCategoryName + '.xlsx'
    } else {
      attributeId = this.supCategoryDetails._id
      this.excelUrlTemplate = this.excelUrl  + attributeId + '/' + this.supCategoryDetails.categoryName + '.xlsx';
    }
  }
  categorySubCategory(e) {
    this.subCategoryDetails = new SubCategory();
    this.subCategoryDetails = e.value;
    this.dataSubDeatils = new Array();
    this.supCategorySelected = true;
    const dataSub = {};
    this.excelFormatCenter = new Array();
    this.dataSubDeatils = this.subCategoryDetails.attribute.filter(fi => (fi.fieldSetting !== 'Color') && (fi.fieldSetting !== 'Size'));
    console.log(this.dataSubDeatils);
    const findColor = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Color'));
    const findSize = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Size'));
    this.dataSubColor = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Color'))  === undefined ?   this.emptySubDeatils : findColor.fieldValue;
    this.dataSubSize = this.supCategoryDetails.attribute.find(fi => (fi.fieldSetting === 'Size'))  === undefined ?  this.emptySubDeatils :  findSize.fieldValue;
    for (const ite of this.dataSubDeatils) {
      if (!dataSub[ite.fieldName]) {
        const subele = ite.fieldName;
        dataSub[subele] = '';
      }
    }
    console.log(dataSub);
    this.excelFormatCenter.push(dataSub);
    this.downloadExcelS3();
  }
  uniq(a) {
    const seen = {};
    return a.filter((item) => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
  onUpload() {
    this.loader = false;
    const id = this.supCategoryDetails._id;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.bufferValue = reader.result;
      const data = new Uint8Array(this.bufferValue);
      const arr = new Array();
      for (let i = 0; i <= data.length - 1; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const space = arr.join('');
      const document = XLSX.read(space, { type: 'binary' });
      const doc = document.SheetNames[0];
      const sheet = document.Sheets[doc];
      this.marketingValue = new Product();
      this.marketingValue = XLSX.utils.sheet_to_json(sheet, { raw: true });
      const parent = this.marketingValue.filter(b => b.variation === 'Parent');
      const child1 = this.marketingValue.filter(a => a.variation === 'Child');
      this.isValidate = false;
      parent.forEach(el => {
        if (el.manufactureInfo.toString().toUpperCase() !== this.vendorDetails.vendorName.toString().toUpperCase()) {
          this.isValidate = true;
        }
      });
      if (this.isValidate === false) {
        child1.forEach(el => {
          if (el.manufactureInfo.toString().toUpperCase() !== this.vendorDetails.vendorName.toString().toUpperCase()) {
            this.isValidate = true;
          }
        });
      }
      const skuProduct = parent.map( a => a.sku);
      const checkSKU = this.uniq(skuProduct);
      console.log(parent, child1);
      const mainArray = [];
      const childMainArray = [];
      const parentAttribute = [];
      const obj = {};
      for (const item of parent) {
        if (!obj[item.sku]) {
          const element = item.sku;
          obj[element] = true;
          const parentImageArray: any = [];
          const parentArray: any = new Product();
          parentArray.superCategoryId = this.supCategoryDetails._id;
          parentArray.superCategoryName = this.supCategoryDetails.categoryName;
          parentArray.mainCategoryId = this.mainCategoryDetails._id;
          parentArray.mainCategoryName = this.mainCategoryDetails.mainCategoryName;
          parentArray.subCategoryName = this.subCategoryDetails.subCategoryName;
          parentArray.subCategoryId = this.subCategoryDetails._id;
          parentArray.color = item.color;
          parentArray.colorId = item.colorId;
          parentArray.sizeVariantId = item.sizeVariantId;
          parentArray.productName = item.productName;
          parentArray.catalogueName = item.catalogueName;
          parentArray.manufactureInfo = item.manufactureInfo;
          parentArray.vendorId = this.vendorDetails._id;
          parentArray.brandName = item.brandName;
          parentArray.hsnCode = item.hsnCode;
          parentArray.gstIn = item.gstIn;
          parentArray.sku = item.sku;
          parentArray.styleCode = item.styleCode;
          parentArray.variation = item.variation;
          parentArray.variationType = item.variationType;
          parentArray.sizeVariant = item.sizeVariant;
          parentArray.costIncludes = item.costIncludes;
          /* parentArray.variantionId = varId._id;
          parentArray.variationTypeId = varTypeId._id; */
          const varId = this.variantionDropDown.find(it => it.name = item.variation);
          const varTypeId = this.variantionTypeDropDown.find(it => it.name = item.variationType);
          parentArray.variationId = varId._id;
          parentArray.variationTypeId = varTypeId._id;
          const colorData = this.dataSubColor.find((col: any) => col.fieldAttributeValue === item.color);
          const sizeData = this.dataSubSize.find((col: any) => col.fieldAttributeValue == item.sizeVariant);
          const colorId = colorData  === undefined ?  'None': colorData._id;
          const sizeId =  sizeData  === undefined ?  'None':  sizeData._id;
          parentArray.colorId = colorId;
          parentArray.sizeVariantId = sizeId;
          parentArray.productsType = item.productsType;
          parentArray.packOf = item.packOf;
          parentArray.size = item.size;
          parentArray.weight = item.weight;
          parentArray.fabric = item.fabric;
          parentArray.productDimension = item.productDimension;
          parentArray.packingDimension = item.packingDimension;
          parentArray.discount = item.discount;
          parentArray.sp = item.sp;
          parentArray.price = item.sp;
          parentArray.vp = item.vp;
          parentArray.ttsPortol = item.ttsPortol;
          parentArray.ttsVendor = item.ttsVendor;
          parentArray.mrp = item.withOutGSTMRP;
          parentArray.closure = item.closure;
          parentArray.pattern = item.pattern;
          parentArray.productDescription = item.productDescription;
          parentArray.toFitWaist = item.toFitWaist;
          parentArray.quantity = item.quantity;
          parentArray.tailoringService = item.tailoringService;
          parentArray.searchTerms1 = item.searchTerms1;
          parentArray.searchTerms2 = item.searchTerms2;
          parentArray.searchTerms3 = item.searchTerms3;
          parentArray.searchTerms4 = item.searchTerms4;
          parentArray.searchTerms5 = item.searchTerms5;
          parentImageArray.push({ productImageName: item.image1 },
            { productImageName: item.image2 },
            { productImageName: item.image3 },
            { productImageName: item.image4 },
            { productImageName: item.image5 });
          parentArray.productImage = parentImageArray.filter(ele => ele.productImageName);
          mainArray.push(parentArray);
        }
      }
      for (const prod of child1) {
        const dataSub = {};
        const childAttribute = [];
        if (obj[prod.styleCode]) {
          const childArray: any = new Product();
          const childImageArray: any = [];
          childArray.superCategoryId = this.supCategoryDetails._id;
          childArray.mainCategoryId = this.mainCategoryDetails._id;
          childArray.subCategoryId = this.subCategoryDetails._id;
          childArray.vendorId = this.vendorDetails._id;
          const varId = this.variantionDropDown.find(i => i.name = prod.variation);
          const varTypeId = this.variantionTypeDropDown.find(i => i.name = prod.variationType);
          childArray.variationId = varId._id;
          childArray.variationTypeId = varTypeId._id;
          const colorData = this.dataSubColor.find((col: any) => col.fieldAttributeValue === prod.color);
          const sizeData = this.dataSubSize.find((col: any) => col.fieldAttributeValue == prod.sizeVariant);
          const colorId = colorData  === undefined ?  'None': colorData._id;
          const sizeId =  sizeData  === undefined ?  'None':  sizeData._id;
          childArray.colorId = colorId;
          childArray.sizeVariantId = sizeId;
          childArray.color = prod.color;
          childArray.superCategoryName = this.supCategoryDetails.categoryName;
          childArray.mainCategoryName = this.mainCategoryDetails.mainCategoryName;
          childArray.subCategoryName = this.subCategoryDetails.subCategoryName;
          childArray.productName = prod.productName;
          childArray.catalogueName = prod.catalogueName;
          childArray.manufactureInfo = prod.manufactureInfo;
          childArray.brandName = prod.brandName;
          childArray.hsnCode = prod.hsnCode;
          childArray.gstIn = prod.gstIn;
          childArray.sku = prod.sku;
          childArray.styleCode = prod.styleCode;
          childArray.costIncludes = prod.costIncludes;
          childArray.variation = prod.variation;
          childArray.productsType = prod.productsType;
          childArray.packOf = prod.packOf;
          childArray.size = prod.size;
          childArray.variationType = prod.variationType;
          childArray.sizeVariant = prod.sizeVariant;
          childArray.weight = prod.weight;
          childArray.fabric = prod.fabric;
          childArray.productDimension = prod.productDimension;
          childArray.packingDimension = prod.packingDimension;
          childArray.discount = prod.discount;
          childArray.sp = prod.sp;
          childArray.price = prod.sp;
          childArray.vp = prod.vp;
          childArray.ttsPortol = prod.ttsPortol;
          childArray.ttsVendor = prod.ttsVendor;
          childArray.mrp = prod.withOutGSTMRP;
          childArray.closure = prod.closure;
          childArray.pattern = prod.pattern;
          childArray.productDescription = prod.productDescription;
          childArray.toFitWaist = prod.toFitWaist;
          childArray.quantity = prod.quantity;
          childArray.tailoringService = prod.tailoringService;
          childArray.searchTerms1 = prod.searchTerms1;
          childArray.searchTerms2 = prod.searchTerms2;
          childArray.searchTerms3 = prod.searchTerms3;
          childArray.searchTerms4 = prod.searchTerms4;
          childArray.searchTerms5 = prod.searchTerms5;
          childImageArray.push({ productImageName: prod.image1 },
            { productImageName: prod.image2 },
            { productImageName: prod.image3 },
            { productImageName: prod.image4 },
            { productImageName: prod.image5 },
            { productImageName: prod.image6 });
          childArray.productImage = childImageArray.filter(ele => ele.productImageName);
          for (const ite of this.dataSubDeatils) {
            if (!dataSub[ite.fieldName]) {
              const subele = ite.fieldName;
              /* const prodattributeId = prod[subele];
              const subeleId = ite.fieldValue.find(et => et.fieldAttributeValue === subele);
              const idAttribute = subeleId === undefined ? 'None': subeleId._id;
              childAttribute.push({attributeId: idAttribute, [subele]: prod[subele]}); 
              console.log(childAttribute); */
              if(prod[subele]) {
                const prodattributeId = prod[subele];
                const subeleId = ite.fieldValue.find(et => et.fieldAttributeValue === prodattributeId);
                const idAttribute = subeleId === undefined ? 'None': subeleId._id;
                if(ite.fieldValue) {
                childAttribute.push({attributeId: ite._id, attributeFieldId: idAttribute, [subele]: prod[subele]});
              }
              }
            }
          }
          /* if(Object.getOwnPropertyNames(dataSub).length !== 0) {
            childAttribute.push(dataSub);
            childArray.attribute = childAttribute;
          } */
          
          childArray.attribute = childAttribute;
          childMainArray.push(childArray);
        }
      }
      mainArray.forEach(ele => {
        ele.child = childMainArray.filter((child) => child.styleCode == ele.sku);
        if (ele.child.length > 0) {
          this.selectedChildHeader(ele.child);
        }
      });
    
      this.productService.bulkUpdateProduct(mainArray, id).subscribe(v1 => {
        this.loader = true;
        this.message = 'Updated Successfully';
        this.imageUpdate()
      }, error => {
        console.log(error);
      });
  
    };
    reader.readAsArrayBuffer(this.file);
  }
  public isEmpty = (obj) => {
    for (var key in obj)
      if(obj.hasOwnProperty(key)){
        return false;
      }
  }
  private selectedChildHeader = (child) => {
    child.forEach((ele, index) => {
      if (index === 0) {
        ele.headChild = true;
      } else {
        ele.headChild = false;
      }
    });
  }
  getSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      this.getAllVendor();
    });
  }
  handleFileInputSingle(excel: any)   {
    this.fileToUpload = excel;
  }

  imageUpdate(){
    if(this.subCategoryDetails._id && this.supCategoryDetails._id && this.mainCategoryDetails._id) {
      this.getSubCategoryImageCount(this.subCategoryDetails._id)
  } else if(this.subCategoryDetails._id && this.mainCategoryDetails._id) {
    this.getMainCategoryImageCount(this.mainCategoryDetails._id)
  } else if(this.supCategoryDetails._id) {
    this.getSuperCategoryImageCount(this.supCategoryDetails._id);
  }
  }
  // super category
  getSuperCategoryImageCount(supId) {
    this.productService.superCategoryParentImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentSuperCategoryImagesToSQS(supId, totalPages)
      }else{
        this.getChildSuperCategoryImageCount(supId)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushParentSuperCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushParentSuperCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'super parent')
      this.getChildSuperCategoryImageCount(supId);
    }, error => {
      console.log(error);
    });
  }
  getChildSuperCategoryImageCount(supId) {
    this.productService.superCategoryChildImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildSuperCategoryImagesToSQS(supId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushChildSuperCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushChildSuperCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'super child');
      this.snackBar.open(this.message, this.action, {
        duration: 700,
      });
      this.router.navigate(['product/viewproduct']);
      
    }, error => {
      console.log(error);
    });
  }

  // main category
  getMainCategoryImageCount(supId) {
    this.productService.mainCategoryParentImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentMainCategoryImagesToSQS(supId, totalPages)
      }else{
        this.getChildMainCategoryImageCount(supId)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushParentMainCategoryImagesToSQS(mainId, totalPages) {
    this.productService.pushParentMainCategoryImagesToSQS(mainId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'main parent')
      this.getChildMainCategoryImageCount(mainId);
    }, error => {
      console.log(error);
    });
  }
  getChildMainCategoryImageCount(mainId) {
    this.productService.mainCategoryChildImageCount(mainId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildMainCategoryImagesToSQS(mainId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  pushChildMainCategoryImagesToSQS(mainId, totalPages) {
    this.productService.pushChildMainCategoryImagesToSQS(mainId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'main child');
      this.snackBar.open(this.message, this.action, {
        duration: 700,
      });
      this.router.navigate(['product/viewproduct']);
    }, error => {
      console.log(error);
    });
  }
  
  // sub category
  getSubCategoryImageCount(subId) {
    console.log(subId)
    this.productService.subCategoryParentImageCount(subId).subscribe(data => {
      console.log(data);
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentSubCategoryImagesToSQS(subId, totalPages)
      } else{
        this.getChildSubCategoryImageCount(subId);
      }
    }, error => {
      console.log(error);
    });
  }
  pushParentSubCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushParentSubCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'sub parent')
      this.getChildSubCategoryImageCount(supId);
    }, error => {
      console.log(error);
    });
  }
  getChildSubCategoryImageCount(subId) {
    this.productService.subCategoryChildImageCount(subId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildSubCategoryImagesToSQS(subId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushChildSubCategoryImagesToSQS(subId, totalPages) {
    this.productService.pushChildSubCategoryImagesToSQS(subId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'sub child');
      this.snackBar.open(this.message, this.action, {
        duration: 700,
      });
      this.router.navigate(['product/viewproduct']);
    }, error => {
      console.log(error);
    });
  }
}
