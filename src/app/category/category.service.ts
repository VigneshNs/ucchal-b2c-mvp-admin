import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { FieldValue } from './../shared/model/field-value';
// import {CategoryService} from '../../app/category/';
import { SuperCategory } from './super-category/superCategory.model';
import { MainCategory } from './main-category/mainCategory.model';
// import { FieldValue } from './../shared/model/field-value';
import { SubCategory } from './sub-category/sub-category.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  productServiceUrl: string = AppSetting.productServiceUrl;
  imageUploadServiceUrl: string = AppSetting.imageUploadServiceUrl;
  customerSerivceUrl: string = AppSetting.customerSerivceUrl;

  constructor(private httpClient: HttpClient) { }

  getSuperCategory(): Observable<any> {
    const categoryUrl = 'viewCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  getSuperCategoryforCategoryAdmin(): Observable<any> {
    const categoryUrl = 'getsupercategoryforcategoryadmin';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  addSuperCategory(data: SuperCategory): Observable<any> {
    const categoryUrl = 'addCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.post<SuperCategory>(url, data);
  }
  uploadMainCategoryImages(data, supID, mainID, mainname): Observable<any> {
    const addUrl = 'supercategory/';
    const addUrl1 = '/maincategoryname/';
    const addUrl2 = '/maincategoryid/';
    const url: string = this.productServiceUrl + addUrl + supID + addUrl1 + mainname + addUrl2 + mainID;
    return this.httpClient.put<boolean>(url, data);
  }
  uploadImages(data, id): Observable<any> {
    const addUrl = 'supercategoryimagesthree/';
    const url: string = this.imageUploadServiceUrl + addUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  editSuperCategoryImagesName(data: SuperCategory, id): Observable<any> {
    const addUrl = 'supercategoryimage/';
    const url: string = this.productServiceUrl + addUrl + id;
    return this.httpClient.put<SuperCategory>(url, data);
  }

  deleteSuperCategory(data): Observable<any> {
    const deleteUrl = 'categoryDelete/';
    const url: string = this.productServiceUrl + deleteUrl + data._id;
    return this.httpClient.delete<SuperCategory>(url);
  }
  addMainCategory(data): Observable<any> {
    const categoryUrl = 'mainCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.post<MainCategory>(url, data);
  }
  getMainCategory(id): Observable<any> {
    const categoryUrl = 'superCategorydetail/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.get<MainCategory>(url);
  }
  deleteMainCategory(id, mainid): Observable<any> {
    const deleteUrl = 'category/';
    const deleteUrl1 = '/mainCategory/';
    const url: string = this.productServiceUrl + deleteUrl + id + deleteUrl1 + mainid;
    return this.httpClient.delete<MainCategory>(url);
  }
  getSingleMainCategory(id, mainid): Observable<any> {
    const superUrl = 'category/';
    const mainUrl1 = '/mainCategoryfind/';
    const url: string = this.productServiceUrl + superUrl + id + mainUrl1 + mainid;
    return this.httpClient.get<MainCategory>(url);
  }
  updateMainCategory(data, id, mainid): Observable<any> {
    const superUrl = 'supercategory/';
    const mainUrl1 = '/updatemaincategory/';
    const url: string = this.productServiceUrl + superUrl + id + mainUrl1 + mainid;
    return this.httpClient.put<MainCategory>(url, data);
  }
  mainCategoryImagesUpload(data, mainID): Observable<any> {
    const addUrl = 'maincategoryimagesthree/';
 /*    const addUrl1 = '/maincategoryimagesthree/'; */
    const url: string = this.imageUploadServiceUrl + addUrl + mainID;
    return this.httpClient.put<any>(url, data);
  }
  uploadMainCategoryImagesName(data, supID, mainID): Observable<any> {
    const addUrl = 'supercategory/';
    const addUrl1 = '/maincategoryimage/';
    const url: string = this.productServiceUrl + addUrl + supID + addUrl1 + mainID;
    return this.httpClient.put<boolean>(url, data);
  }
  // sub category

  addSubCategory(data, superId, mainid): Observable<any> {
    const Caturl = 'subCategory/';
    const CatUrl1 = '/add/';
    const url: string = this.productServiceUrl + Caturl + superId + CatUrl1 + mainid;
    return this.httpClient.put<SubCategory>(url, data);
  }
  getSubCategory(superId, mainId): Observable<any> {
    const categoryUrl = 'category/';
    const categoryUrl1 = '/mainCategory/';
    const url: string = this.productServiceUrl + categoryUrl + superId + categoryUrl1 + mainId;
    return this.httpClient.get<SubCategory>(url);
  }
  editSubCategoryImagesName(data, supid, mainid, id): Observable<any> {
    const supUrl = 'subcategoryimage/';
    const mainUrl = '/add/';
    const cteUrl = '/addValue/';
    const url: string = this.productServiceUrl + supUrl + supid + mainUrl + mainid + cteUrl + id;
    return this.httpClient.put<SubCategory>(url, data);
  }
  /*  /category/:categoryId/mainCategory/:mainCategoryId/subCategory/:subCategoryId */
  deleteSubCategory(superId, mainId, element): Observable<any> {
    const deleteUrl = 'category/';
    const deleteUrl1 = '/mainCategory/';
    const deleteUrl2 = '/subCategory/';
    const url: string = this.productServiceUrl + deleteUrl + superId + deleteUrl1 + mainId + deleteUrl2 + element._id;
    return this.httpClient.delete<SubCategory>(url);
  }
  uploadSubCategoryImages(data, id): Observable<any> {
    const supUrl = 'subcategoryimagesthree/';
    const url: string = this.imageUploadServiceUrl + supUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getAllVendor(): Observable<any> {                     // Get All vendor
    const vendorUrl = 'getallvendor';
    const url: string = this.customerSerivceUrl + vendorUrl;
    return this.httpClient.get<any>(url);
  }
  getSingleSubCategory(supid, mainid, subid): Observable<any> {
    const supUrl = 'supcategory/';
    const mainUrl = '/maincategory/';
    const cteUrl = '/subcategory/';
    const url: string = this.productServiceUrl + supUrl + supid + mainUrl + mainid + cteUrl + subid;
    return this.httpClient.get<SubCategory>(url);
  }
  updateSubcategory(data, supid, mainid, subid): Observable<any> {
    const superUrl = 'category/';
    const mainUrl = '/mainCategory/';
    const subUrl = '/subCategory/';
    const url: string = this.productServiceUrl + superUrl + supid + mainUrl + mainid + subUrl + subid;
    return this.httpClient.put<any>(url, data);
  }
  getSingleSuperCategory(id): Observable<any> {
    const categoryUrl = 'supercategory/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.get<SuperCategory>(url);
  }
  updateSuperCategory(superData, id): Observable<any> {
    const categoryUrl = 'category/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.put<SuperCategory>(url, superData);
  }
  excelDownloadFormS3(): Observable<any> {
    const downloadS3File = './../../assets/excelData/categoryExcel.json';
    const url: string = downloadS3File;
    return this.httpClient.get<any>(url);
  }
  uploadSingleExcel(data, attributeId) {
    const productUrl = 'excel/';
    const url: string = this.productServiceUrl + productUrl + attributeId;
    return this.httpClient.put<any>(url, data);
  }

  editAttribute(supId, attributeId, data: FieldValue): Observable<any> {
    const categoryUrl = 'super/';
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  deleteAttribute(supId, attributeId): Observable<any> {
    const categoryUrl = 'super/';
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + attributeUrl + attributeId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  addAttribute(supId, data): Observable<any> {
    const categoryUrl = 'super/';
    const url: string = this.productServiceUrl + categoryUrl + supId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  editAttributeValueField(supId, attributeId, fieldId, data) {
    const categoryUrl = 'super/';
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  deleteAttributeValueField(supId, attributeId, fieldId) {
    const categoryUrl = 'super/';
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  addAttributeValueField(supId, attributeId, data) {
    const categoryUrl = 'super/';
    const attributeUrl = '/addattribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }

  subCategoryEditAttribute(supId, maincatId, subcatId, attributeId, data: FieldValue): Observable<any> {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  subCategoryDeleteAttribute(supId, maincatId, subcatId, attributeId): Observable<any> {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId + attributeUrl + attributeId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  subCategoryAddAttribute(supId, maincatId, subcatId, data): Observable<any> {

    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  subCategoryEditAttributeValueField(supId, maincatId, subcatId, attributeId, fieldId, data) {

    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  subCategoryDeleteAttributeValueField(supId, maincatId, subcatId, attributeId, fieldId) {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  subCategoryAddAttributeValueField(supId, maincatId, subcatId, attributeId, data) {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    const subcategoryUrl = '/subcat/';
    const attributeUrl = '/addattribute/';
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + subcategoryUrl + subcatId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }

  mainCategoryEditAttribute(supId, maincatId, attributeId, data: FieldValue): Observable<any> {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  mainCategoryDeleteAttribute(supId, maincatId, attributeId): Observable<any> {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const attributeUrl = '/attribute/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + attributeUrl + attributeId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  mainCategoryAddAttribute(supId, maincatId, data): Observable<any> {

    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  mainCategoryEditAttributeValueField(supId, maincatId, attributeId, fieldId, data) {

    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  mainCategoryDeleteAttributeValueField(supId, maincatId, attributeId, fieldId): Observable<any> {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const attributeUrl = '/attribute/'
    const fieldUrl = '/field/'
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + attributeUrl + attributeId + fieldUrl + fieldId;
    return this.httpClient.delete<SuperCategory>(url);
  }
  mainCategoryAddAttributeValueField(supId, maincatId, attributeId, data) {
    const categoryUrl = 'super/';
    const maincategoryUrl = '/maincat/';
    /* const subcategoryUrl = '/subcat/'; */
    const attributeUrl = '/addattribute/';
    const url: string = this.productServiceUrl + categoryUrl + supId + maincategoryUrl + maincatId + attributeUrl + attributeId;
    return this.httpClient.put<SuperCategory>(url, data);
  }
  exportAsExcelFile(json: any[], attribute, excelFileName: string) {
    try {
      const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(attribute);

      const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = { Sheets: { sheet1: worksheet1, sheet2: worksheet2 }, SheetNames: ['sheet1', 'sheet2'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    } catch (Error) {
      alert(Error);
    }
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  downloadSuperExcel(supId): Observable<any> {
    const superUrl = 'supercategoryexceldropdown/';
    const url: string = this.productServiceUrl + superUrl + supId;
    return this.httpClient.get(url);
  }
  
  downloadSubExcel(supId, mainId, subId): Observable<any> {
    const superUrl = 'supercategoryexceldropdown/';
    const mainUrl = '/main/';
    const subUrl = '/sub/';
    const url: string = this.productServiceUrl + superUrl + supId + mainUrl + mainId + subUrl + subId;
    return this.httpClient.get(url);
  }
  downloadMainExcel(supId, mainId): Observable<any> {
    const superUrl = 'supercategoryexceldropdown/';
    const mainUrl = '/main/';
    const url: string = this.productServiceUrl + superUrl + supId + mainUrl + mainId;
    return this.httpClient.get(url);
  }
}
