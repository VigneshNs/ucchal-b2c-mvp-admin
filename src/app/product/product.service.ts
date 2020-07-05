import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Product } from './add-product/product.model';
import { ProductOption } from './settings/product-option/add-product-option/product-option.model';
import { Child } from './add-product/child.model';
import { MainCategory } from '../category/main-category/mainCategory.model';
import { SuperCategory } from '../category/super-category/superCategory.model';
import
 { ProductSettings } from './product-settings/product-settings.model';
 import { PriceFilter } from './../shared/model/price-filter.model';
import { Color } from './settings/color-setting/color-settings.model';
import { BrandModel } from './../brand/add-brand/brand.model';
import { ProductTag } from './settings/product-tags/add-product-tag/productTag.model';
import { SizeGuide } from './size-guide/size-guide.model';
import { Review } from './view-product-review/product-review.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Brand } from './image-product/brand.model';
import { HowToMeasure } from './how-to-measure/how-to-measure.model';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

/* import {MOQ} from '../moq/create-moq/moq.model';
import {Size} from './add-product/size.model';
import {ProductSettings} from '../settings/product-settings/product-settings.model';
 */


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productServiceUrl: string = AppSetting.productServiceUrl;
  imageUploadServiceUrl: string = AppSetting.imageUploadServiceUrl;
  customerSerivceUrl: string = AppSetting.customerSerivceUrl;
  parentResizeId: number = AppSetting.parentResizeId;
  childResizeId: number = AppSetting.childResizeId;
  
  constructor(private httpClient: HttpClient) { }

  getAllSettings(): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'productSettings/';
    const url: string = this.productServiceUrl + brandUrl;
    return this.httpClient.get<ProductSettings>(url);
  }
  uploadMultipleMulterImages(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'multiimage/';
    const url: string = this.imageUploadServiceUrl + brandUrl + id;
    return this.httpClient.put<BrandModel>(url, data);
  }
  uploadSingleMulterImages(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'image/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.httpClient.put<BrandModel>(url, data);
  }
  uploadImagesToS3(data, styleCode): Observable<any> {
    const productUrl = 'productimagesthree/';
    const url: string = this.imageUploadServiceUrl + productUrl + styleCode;
    return this.httpClient.put<Product>(url, data);
  }
  uploadSingleBase64(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'base64imagesingle/';
    const url: string = 'http://localhost:3200/' + brandUrl + id;
    return this.httpClient.put<BrandModel>(url, data);
  }
  
  uploadSingleBase64Excel(data): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'excel';
    console.log(data);
    const url: string = this.productServiceUrl + brandUrl;
    return this.httpClient.put<BrandModel>(url, data);
  }
  uploadImages(data, id): Observable<any> {
    const productUrl = 'productimagesthree/';
    const url: string = this.imageUploadServiceUrl + productUrl + id;
    
    return this.httpClient.put<Product>(url, data);
  }
  uploadSingleProduct(data): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'singleproductupload';
    const url: string = this.productServiceUrl + brandUrl;
    return this.httpClient.post<any>(url, data);
  }
  uploadSingleChildProduct(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'addchildproduct/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.httpClient.post<any>(url, data);
  }
  getCategoryUsingProductID(id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'getcategoryusingproductid/';
    const url: string = this.productServiceUrl + brandUrl + id;
    return this.httpClient.get<any>(url);
  }
  editProductImageName(data, styleCode): Observable<any> {
    const productUrl = 'productimage/';
    const url: string = this.productServiceUrl + productUrl + styleCode;
    return this.httpClient.put<Product>(url, data);
  }
  editImagesToS3(id, data): Observable<any> {
    const productUrl = 'editproductimagesthree/';
    const url: string = this.imageUploadServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  editProductImages(id, data: Product): Observable<any> {
    const productUrl = 'editproductimage/' + id;
    const url: string = this.imageUploadServiceUrl  + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductImageNamePush(styleCode, data): Observable<any> {
    const productUrl = 'editproductimage/';
    const url: string = this.productServiceUrl + productUrl + styleCode;
    return this.httpClient.put<Product>(url, data);
  }
  getAllBrand(): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'getbrand';
    const url: string = this.productServiceUrl + brandUrl;
    return this.httpClient.get<BrandModel>(url);
  }
  addSizeVariant(data): Observable<Product> {
    const productUrl = 'addsizevariant/';
    const url: string = this.productServiceUrl + productUrl + data.id;
    return this.httpClient.put<Product>(url, data);
  }
  editProductVariant(data: Child): Observable<any> {
    const productUrl = 'editproductvariant/' + data.productId;
    const productVariantUrl = '/productvariant/' + data._id;
    const url: string = this.productServiceUrl + productUrl + productVariantUrl;
    return this.httpClient.put<Child>(url, data);
  }

  editProductCategory(id, data: Product): Observable<any> {
    const productUrl = 'editproductcategory/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editChildAttributeInfo(id, childId, data: Product): Observable<any> {
    const productUrl = 'editchildattribute/' + id + '/' + childId;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductParentInfo(id, data: Product): Observable<any> {
    const productUrl = 'editproductparentinfo/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductChildInfo(id, childId, data: Product): Observable<any> {
    const productUrl = 'editproductchildinfo/' + id + '/' + childId;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductInfo(id, data: Product): Observable<any> {
    const productUrl = 'editproductinfo/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductSeo(id, data: Product): Observable<any> {
    const productUrl = 'editproductseo/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductBrand(id, data: Product): Observable<any> {
    const productUrl = 'editproductbrand/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  editProductSizeGuide(id, data: Product): Observable<any> {
    const productUrl = 'editproductsizeguide/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  deleteProductVariant(productId, childId): Observable<any> {
    const productVariantUrl = 'deleteproductvariant/';
    const productUrl = '/productvariant/';
    const url: string = this.productServiceUrl + productVariantUrl + productId + productUrl + childId;
    return this.httpClient.delete<Child>(url);
  }
  parentProductImageUpdate(data, id): Observable<any> {
    const categoryUrl = 'parentproductimageupdate/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  childProductImageUpdate(data, id, childId): Observable<any> {
    const categoryUrl = 'childproductimageupdate/';
    const url: string = this.productServiceUrl + categoryUrl + id + '/' + childId;
    return this.httpClient.put<any>(url, data);
  }

  getSuperCategory(): Observable<any> {
    const categoryUrl = 'viewCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  getMainCategory(id): Observable<any> {
    const categoryUrl = 'superCategorydetail/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.get<MainCategory>(url);
  }
  getSubCategory(catId, mainId): Observable<any> {
    const categoryUrl = 'getselectedsubcategory/';
    const url: string = this.productServiceUrl + categoryUrl + catId + '/' + mainId;
    return this.httpClient.get<MainCategory>(url);
  }
  showAllMainCategory(): Observable<any> {
    const categoryUrl = 'showMainCategory';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.get<MainCategory>(url);
  }
  // product option start

  addProductOption(data: ProductOption): Observable<any> {
    const productUrl = 'createproductoption';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<ProductOption>(url, data);
  }
  allProductOption(): Observable<any> {
    const productUrl = 'getproductoption';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<ProductOption>(url);
  }

  singleProductOption(id): Observable<any> {
    const productUrl = 'getsingleproductoption/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<ProductOption>(url);
  }

  deleteSingleProductOption(id): Observable<any> {
    const productUrl = 'deleteproductoption/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.delete<ProductOption>(url);
  }

  editProductOption(id, data: ProductOption): Observable<any> {
    const productUrl = 'editproductoption/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<ProductOption>(url, data);
  }



  // product option end

  addProduct(data: Product): Observable<any> {
    const productUrl = 'addproduct';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  addRegionService(subUrl, data: Product): Observable<any> {
    const productUrl = 'product';
    const url: string = subUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  getAllProduct(): Observable<any> {
    const productUrl = 'product';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  getProducts(data): Observable<any> {
    const productUrl = 'allproductforadmin';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<Product>(url, data);
  }
  getChildProducts(): Observable<any> {
    const productUrl = 'getchildproduct';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<Product>(url);
  }
  getSingleProducts(id): Observable<any> {
    const productUrl = 'productsingle/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<Product>(url);
  }
  deleteProduct(id): Observable<any> {
    const deleteUrl = 'deleteproduct/';
    const url: string = this.productServiceUrl + deleteUrl + id;
    return this.httpClient.delete<Product>(url);
  }
  getProductById(data): Observable<any> {
    const productUrl = 'product/';
    const url: string = this.productServiceUrl + productUrl + data;
    return this.httpClient.get<Product>(url);
  }
  getRelatedProducts(data): Observable<any> {
    const productUrl = 'relatedproducts/';
    const productUrl1 = '/product/';
    const url: string = this.productServiceUrl + productUrl + data.styleCode + productUrl1 + data._id;
    return this.httpClient.get<Product>(url);
  }
  getPriceRange(data): Observable<any> {
    const productUrl = 'getproductpricerange';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  deleteSingleImage(data, id): Observable<any> {
    const productUrl = 'deletesingleimage/';
    const imageNameUrl = '/imagename/';
    const url: string = this.productServiceUrl + productUrl + id + imageNameUrl + data.productImageName;
    return this.httpClient.delete<Product>(url);
  }
  sortProuctByDate(data): Observable<any> {
    const productUrl = 'sortproductbydate';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  sortProuctByName(data): Observable<any> {
    const productUrl = 'sortproductbyname';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  publishMethodProduct(data): Observable<any> {                                   // Put Publish Product
    const categoryUrl = 'updatepublishproduct';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.put<Product>(url, data);
  }
  unPublishMethodProduct(data): Observable<any> {                                   // Put UnPublish Product
    const categoryUrl = 'updateunpublishproduct';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.put<Product>(url, data);
  }

  // product settings

  addPriceRange(data): Observable<any> {
    const settingsUrl = 'addfilterpriceoptions';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<PriceFilter>(url, data);
  }
  deletePriceRange(id, val): Observable<any> {
    const deleteUrl = 'deletefilterprice/';
    const url: string = this.productServiceUrl + deleteUrl + id + '/' + val;
    return this.httpClient.delete<ProductSettings>(url);
  }
  addDiscountRange(data): Observable<any> {
    const settingsUrl = 'addfilterdiscountoptions';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<PriceFilter>(url, data);
  }
  addDispatchRange(data): Observable<any> {
    const settingsUrl = 'addfilterdispatchoptions';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<PriceFilter>(url, data);
  }
  deleteDiscountRange(id, val): Observable<any> {
    const deleteUrl = 'deletefilterdiscount/';
    const url: string = this.productServiceUrl + deleteUrl + id + '/' + val;
    return this.httpClient.delete<ProductSettings>(url);
  }
  deleteDispatchRange(id, val): Observable<any> {
    const deleteUrl = 'deletefilterdispatch/';
    const url: string = this.productServiceUrl + deleteUrl + id + '/' + val;
    return this.httpClient.delete<ProductSettings>(url);
  }
  addColor(data: Color): Observable<any> {
    const colorUrl = 'addcolorsetting';
    const url: string = this.productServiceUrl + colorUrl;
    return this.httpClient.post<any>(url, data);
  }
  getColors(): Observable<any> {
    const colorUrl = 'getcolorsetting';
    const url: string = this.productServiceUrl + colorUrl;
    return this.httpClient.get<Color>(url);
  }
  deleteColor(id): Observable<any> {
    const deleteUrl = 'deletecolorsetting/';
    const url: string = this.productServiceUrl + deleteUrl + id;
    return this.httpClient.delete<ProductSettings>(url);
  }


  saveNotes(data): Observable<any> {
    const noteUrl = 'note';
    const url: string = this.productServiceUrl + noteUrl;
    return this.httpClient.post<any>(url,data);
  }
  // getNote(): Observable<any>{

  // }
  deleteNote(id): Observable<any> {
    const deleteUrl = 'removenote/';
    const url: string = this.productServiceUrl + deleteUrl + id;
    return this.httpClient.delete<ProductSettings>(url);
  }

  addMaterial(data: ProductSettings): Observable<any> {
    const settingsUrl = 'material';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addOccasion(data: ProductSettings): Observable<any> {
    const settingsUrl = 'occasion';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addSize(data: ProductSettings): Observable<any> {
    const settingsUrl = 'size';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addDiscount(data: ProductSettings): Observable<any> {
    const settingsUrl = 'adddiscountforsetting';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteDiscount(data): Observable<any> {
    const deleteUrl = 'deletediscountinsetting';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addDispatchTime(data: ProductSettings): Observable<any> {
    const settingsUrl = 'adddispatchtimeforsetting';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteDispatchTime(data): Observable<any> {
    const deleteUrl = 'deletedispatchtimeinsetting';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addTags(data: ProductSettings): Observable<any> {
    const settingsUrl = 'tags';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteMaterial(data): Observable<any> {
    const deleteUrl = 'removematerial';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteOccasion(data): Observable<any> {
    const deleteUrl = 'removeoccasion';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteSize(data): Observable<any> {
    const deleteUrl = 'removesize';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteTags(data): Observable<any> {
    const deleteUrl = 'removetags';
    const url: string = this.productServiceUrl + deleteUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  getProductSettings(): Observable<any> {
    const categoryUrl = 'findfilteroptions';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.get<ProductSettings>(url);
  }
  // Product Tag

  addProductTags(data): Observable<any> {
    const settingsUrl = 'addproducttag';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<ProductTag>(url, data);
  }

  allProductTag(): Observable<any> {
    const productUrl = 'getproducttag';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<ProductTag>(url);
  }
  DeleteProductTag(id): Observable<any> {
    const productUrl = 'deleteproducttag/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<ProductTag>(url);
  }
  getSelectedProductTag(id): Observable<any> {
    const productUrl = 'getselecetedproducttag/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<ProductTag>(url);
  }
  editProductTag(id, data): Observable<any> {
    const productUrl = 'editproducttag/' + id;
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<ProductTag>(url, data);
  }

  // add size guide

  addSizeGuide(data): Observable<any> {
    const settingsUrl = 'addsizeguide';
    const url: string = this.productServiceUrl + settingsUrl;
    return this.httpClient.post<SizeGuide>(url, data);
  }
  uploadSizeGuide(data, styleCode): Observable<any> {
    const productUrl = 'sizeimage/';
    const url: string = this.imageUploadServiceUrl + productUrl + styleCode;
    return this.httpClient.put<SizeGuide>(url, data);
  }
  saveImageNameCM(data, id): Observable<any> {
    const productUrl = 'sizechartcmname/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<SizeGuide>(url, data);
  }
  saveImageNameInches(data, id): Observable<any> {
    const productUrl = 'sizechartinchesname/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<SizeGuide>(url, data);
  }
  getSizeGuide(): Observable<any> {
    const productUrl = 'sizeguide';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<SizeGuide>(url);
  }
  deleteSizeGuide(id): Observable<any> {
    const productUrl = 'deletesizechartcm/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<SizeGuide>(url);
  }
  getSingleSizeGuide(id): Observable<any> {
    const productUrl = 'singlesizeguide/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<SizeGuide>(url);
  }
  updateSizeGuide(data ,id): Observable<any> {
    const productUrl = 'updateproductsizeguide/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<SizeGuide>(url, data);
  }
  // Product Review
  getAllReviewWithProduct(): Observable<any> {
    const productUrl = 'getallreviewwithproduct';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<Review>(url);
  }
  getSingleReviewWithProduct(id): Observable<any> {
    const productUrl = 'getsinglereviewwithproduct/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<Review>(url);
  }
  deleteProductReview(id): Observable<any> {
    const productUrl = 'deleteproductreview/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<Review>(url);
  }
  publishMethodProductReveiw(data): Observable<any> {                    // Put Publish Product Review
    const categoryUrl = 'updatepublishproductreview';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.put<Review>(url, data);
  }
  unPublishMethodProductReveiw(data): Observable<any> {                   // Put UnPublish Product Review
    const categoryUrl = 'updateunpublishproductreview';
    const url: string = this.productServiceUrl + categoryUrl;
    return this.httpClient.put<Review>(url, data);
  }
  uploadProduct(data): Observable<any> {
    const productUrl = 'uploadproduct';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  // product child
  getProductChild(id): Observable<any> {
    const productUrl = 'getproductchild/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<Child>(url);
  }
  exportAsExcelFile(json: any, excelFileName: string) {
      try {
      const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = { Sheets: { sheet1 : worksheet1}, SheetNames: ['sheet1'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }    catch (Error) {
      alert(Error);
  }
  }
  getAllVendor(): Observable<any> {                     // Get All vendor
    const categoryUrl = 'getallvendor';
    const url: string = this.customerSerivceUrl + categoryUrl;
    return this.httpClient.get<any>(url);
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  excelDownloadFormS3() : Observable<any>{
    const downloadS3File = './../../assets/excelData/categoryExcel.json';
    const url: string = downloadS3File;
    return this.httpClient.get<any>(url);
  }
  // tailoring service
  createReadyToWear(data): Observable<any> {
    const productUrl = 'createreadytowear';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  updateReadyToWear(data, id): Observable<any> {
    const productUrl = 'updatereadytowear/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  getAllReadyToWear(): Observable<any> {
    const productUrl = 'getallreadytowear';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<Product>(url);
  }
  getSingleReadyToWear(id): Observable<any> {
    const productUrl = 'getsinglereadytowear/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<Product>(url);
  }
  deleteReadyToWear(id): Observable<any> {
    const productUrl = 'deletereadytowear/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<Product>(url);
  }
  addReadyToWearNameCM(data, id): Observable<any> {
    const productUrl = 'addsizechartcmnameready/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addReadyToWearNameInches(data, id): Observable<any> {
    const productUrl = 'addsizechartinchesnameready/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  updateReadyToWearNameCM(data, id): Observable<any> {
    const productUrl = 'updatesizecharcmnameready/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  updateReadyToWearNameInches(data, id): Observable<any> {
    const productUrl = 'updatesizecharinchesready/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  createMeasurement(data): Observable<any> {
    const productUrl = 'createmeasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  uploadImageForMeasurement(data, id): Observable<any> {
    const productUrl = 'uploadmeasurementimage/';
    const url: string = this.imageUploadServiceUrl + productUrl + id;
    return this.httpClient.post<Product>(url, data);
  }
  addAroundBustImageName(data, id): Observable<any> {
    const productUrl = 'addaroundbustimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addAroundAboveWaistImageName(data, id): Observable<any> {
    const productUrl = 'addaroundabovewaistimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addBlouseLengthImageName(data, id): Observable<any> {
    const productUrl = 'addblouselengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addFrontNeckDepthImageName(data, id): Observable<any> {
    const productUrl = 'addfrontneckdepthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addBackNeckDepthImageName(data, id): Observable<any> {
    const productUrl = 'addbackneckdepthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addSleeveLengthImageName(data, id): Observable<any> {
    const productUrl = 'addsleevelengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addAroundArmImageName(data, id): Observable<any> {
    const productUrl = 'addaroundarmimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  getAllMeasurement(): Observable<any> {
    const productUrl = 'getallmeasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  getSingleMeasurement(id): Observable<any> {
    const productUrl = 'getsinglemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  addFrontStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addfrontneckstylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addFrontStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addfrontneckstylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addBackStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addbackneckstylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addBackStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addbackneckstylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addSleeveStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addsleevestylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addSleeveStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addsleevestylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  updateMeasurementData(data, id): Observable<any> {
    const productUrl = 'updatemeasurementdata/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  deleteFrontNeckStyle(id, styleId): Observable<any> {
    const productUrl = 'removefrontneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  deleteBackNeckStyle(id, styleId): Observable<any> {
    const productUrl = 'removebackneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  deleteSleeveLengthStyle(id, styleId): Observable<any> {
    const productUrl = 'removesleevestyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  //
  createKameezMeasurement(data): Observable<any> {
    const productUrl = 'createkameezmeasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  /* uploadImageForMeasurement(data, id): Observable<any> {
    const productUrl = 'uploadmeasurementimage/';
    const url: string = this.imageUploadServiceUrl + productUrl + id;
    return this.httpClient.post<Product>(url, data);
  } */
  addKameezAroundBustImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundbustimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundAboveWaistImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundabovewaistimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundHipImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundhipimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezLengthImageName(data, id): Observable<any> {
    const productUrl = 'addkameezlengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezFrontNeckDepthImageName(data, id): Observable<any> {
    const productUrl = 'addkameezfrontneckdepthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezBackNeckDepthImageName(data, id): Observable<any> {
    const productUrl = 'addkameezbackneckdepthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezSleeveLengthImageName(data, id): Observable<any> {
    const productUrl = 'addkameezsleevelengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundArmImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundarmimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundWaistImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundwaistimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundThighImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundthighimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundkneeImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundkneeimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundCalfImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundcalfimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezAroundBottomImageName(data, id): Observable<any> {
    const productUrl = 'addkameezaroundbottomimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezBottomLengthImageName(data, id): Observable<any> {
    const productUrl = 'addkameezbottomlengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  addKameezFrontStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addkameezfrontneckstylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addKameezFrontStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addkameezfrontneckstylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addKameezBackStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addkameezbackneckstylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addKameezBackStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addkameezbackneckstylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addKameezSleeveStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addkameezsleevestylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addKameezSleeveStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addkameezsleevestylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addKameezBottomStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addkameezbottomstylemeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addKameezBottomStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addkameezbottomstylemeasurementname/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  deleteKameezFrontNeckStyle(id, styleId): Observable<any> {
    const productUrl = 'removekameezfrontneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  deleteKameezBackNeckStyle(id, styleId): Observable<any> {
    const productUrl = 'removekameezbackneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  deleteKameezSleeveLengthStyle(id, styleId): Observable<any> {
    const productUrl = 'removekameezsleevestyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  deleteKameezBottomStyle(id, styleId): Observable<any> {
    const productUrl = 'removekameezbottomstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  getAllKameezMeasurement(): Observable<any> {
    const productUrl = 'getallkameezmeasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  getSingleKameezMeasurement(id): Observable<any> {
    const productUrl = 'getsinglekameezmeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  updateKameezMeasurement(data, id): Observable<any> {
    const productUrl = 'updatekameezmeasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }

  // Price Calculation

  getIncrementRate(): Observable<any> {
    const productUrl = 'getincrementrate';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  addIncrementRate(data): Observable<any> {
    const productUrl = 'addincrementrate';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  getPriceRate(): Observable<any> {
    const productUrl = 'getpricerate';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  addPriceRate(data): Observable<any> {
    const productUrl = 'addpricerate';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  UpdatePriceRate(data, id): Observable<any> {
    const productUrl = 'updatepricerate/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getCountryWisePrice(): Observable<any> {
    const productUrl = 'getcountrywiseprice';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  addCountryWisePrice(data): Observable<any> {
    const productUrl = 'addcountrywiseprice';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  updateCountryWisePrice(data): Observable<any> {
    const productUrl = 'updatecountrywiseprice';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<any>(url, data);
  }
  deleteMultiProduct(data): Observable<any> {
    const productUrl = 'deletemultiproduct';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  getProductByVendor(id): Observable<any> {
    const productUrl = 'getproductbyvendor/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }

  SaveNote(data): Observable<any> {
    const productUrl = 'createnote';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url,data);
  }
  
  getCatNote(): Observable<any>{
    const productUrl = 'getnote';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }

  deleteCatNote(id): Observable<any> {
    const productUrl = 'deletenote/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<any>(url);
  // Lehenga Measurement
  }

  editNote(id,data): Observable<any> {
    const productUrl = 'editnote/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url,data);
  }
  createLehengaMeasurement(data): Observable<any> {
    const productUrl = 'createlehengameasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<Product>(url, data);
  }
  addLehengaAroundBustImageName(data, id): Observable<any> {
    const productUrl = 'addlehengaaroundbustimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaAroundAboveWaistImageName(data, id): Observable<any> {
    const productUrl = 'addlehengaaroundabovewaistimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaColiLengthImageName(data, id): Observable<any> {
    const productUrl = 'addcholilengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaAroundWaistImageName(data, id): Observable<any> {
    const productUrl = 'addlehengaaroundwaistimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaAroundHipImageName(data, id): Observable<any> {
    const productUrl = 'addlehengaaroundhipimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaLengthImageName(data, id): Observable<any> {
    const productUrl = 'addlehengalengthimagename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaBackStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addlehengabackneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaBackStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addlehengabackneckstyleimagename/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaFrontStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addlehengafrontneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaFrontStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addlehengafrontneckstyleimagename/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaSleeveStyleMeasurement(data, id): Observable<any> {
    const productUrl = 'addcholisleevestyle/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addLehengaSleeveStyleImageName(data, id, styleId): Observable<any> {
    const productUrl = 'addcholisleevestyleimagename/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.put<any>(url, data);
  }
  removeLehengaSleeveStyleImage(id, styleId): Observable<any> {
    const productUrl = 'removelehengasleevetyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  removeLehengaFrontNeckStyleImage(id, styleId): Observable<any> {
    const productUrl = 'removelehengafrontneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  removeLehengaBackNeckStyleImage(id, styleId): Observable<any> {
    const productUrl = 'removelehengabackneckstyle/';
    const url: string = this.productServiceUrl + productUrl + id + '/' + styleId;
    return this.httpClient.delete<any>(url);
  }
  getLehengaMeasurement(): Observable<any> {
    const productUrl = 'getlehengameasurement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  getSingleLehengaMeasurement(id): Observable<any> {
    const productUrl = 'getsinglelehengameasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  updateLehengaMeasurement(data, id): Observable<any> {
    const productUrl = 'updatelehengameasurement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }

  addHowToMeasure(data): Observable<any> {
    const productUrl = 'addhowtomeasure/';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url,data);
  }

  getSingleHowToMeasure(id): Observable<any> {
    const productUrl = 'getsinglehowtomeasure/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url,id);
  }

  updateHowToMeasure(data, id): Observable<any> {
    const productUrl = 'updatehowtomeasure/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url,data,id);
  }
  
  getHowToMeasure(): Observable<any> {
    const productUrl = 'gethowtomeasure/';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }

  addImage(data, id): Observable<any> {
    const productUrl = 'base64howtomeasure/';
    const url: string = this.imageUploadServiceUrl + productUrl + id;
    return this.httpClient.post<HowToMeasure>(url, data);
  }

  saveImageName(data, id): Observable<any> {
    const productUrl = 'howtomeasurename/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<HowToMeasure>(url, data);
  }

  saveBase64ImageName(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'base64howtomeasure/' + id;
    const url: string = this.imageUploadServiceUrl + brandUrl;
    return this.httpClient.put<HowToMeasure>(url, data);
  }

  deleteHowToMeasure(id): Observable<any> {
    const productUrl = 'deletehowtomeasure/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<any>(url,id);
  }
  categoryWiseProductFilterByAdmin(data): Observable<any> {
    const productUrl = 'categorywisefilterforadmin';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<any>(url, data);
  }
  searchParentProductByAdmin(data): Observable<any> {
    const productUrl = 'searchproductforadmin';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<any>(url, data);
  }
  searchChildProductByAdmin(data): Observable<any> {
    const productUrl = 'searchchildproductforadmin';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.put<any>(url, data);
  }
  bulkUpdateProduct(data, id): Observable<any> {
    const productUrl = 'updatebulkupload/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }

  productBySuperCategoryForSequence(id): Observable<any> {
    const productUrl = 'getproductbysupercategoryforsequence/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  productBySubCategoryForSequence(id): Observable<any> {
    const productUrl = 'getprdouctbysubcategoryforsequence/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  addSequenceForSuperCategory(id, data): Observable<any> {
    const productUrl = 'addsequenceforsupercategory/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addSequenceForSubCategory(id, data): Observable<any> {
    const productUrl = 'addsequenceforsubcategory/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  // Plus Size
  addPlusSize(data): Observable<any> {
    const productUrl = 'addplussize';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  getPlusSize(): Observable<any> {
    const productUrl = 'getplussize';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  updatePlusSize(data, id): Observable<any> {
    const productUrl = 'updateplussize/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getSinglePlusSize(id): Observable<any> {
    const productUrl = 'getsingleplussize/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  deleteSinglePlusSize(id): Observable<any> {
    const productUrl = 'deleteplussize/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<any>(url);
  }
  // Body Height
  addBodyHeight(data): Observable<any> {
    const productUrl = 'addbodyheight';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  getAllBodyHeight(): Observable<any> {
    const productUrl = 'getallbodyheight';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  updateBodyHeight(data, id): Observable<any> {
    const productUrl = 'updatebodyheight/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getSingleBodyHeight(id): Observable<any> {
    const productUrl = 'getsinglebodyheight/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  deleteSingleBodyHeight(id): Observable<any> {
    const productUrl = 'deletebodyheight/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<any>(url);
  }
  // Size Wise Increment
  addSizeWiseIncrement(data): Observable<any> {
    const productUrl = 'addsizewiseincrement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.post<any>(url, data);
  }
  getAllSizeWiseIncrement(): Observable<any> {
    const productUrl = 'getallsizewiseincrement';
    const url: string = this.productServiceUrl + productUrl;
    return this.httpClient.get<any>(url);
  }
  updateSizeWiseIncrement(data, id): Observable<any> {
    const productUrl = 'updatesizewiseinc/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  getSingleSizeWiseIncrement(id): Observable<any> {
    const productUrl = 'getsinglesizewiseincrement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.get<any>(url);
  }
  deleteSingleSizeWiseIncrement(id): Observable<any> {
    const productUrl = 'deletesizewiseincrement/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.httpClient.delete<any>(url);
  }
  getSingleSuperCategory(id): Observable<any> {
    const categoryUrl = 'supercategory/';
    const url: string = this.productServiceUrl + categoryUrl + id;
    return this.httpClient.get<SuperCategory>(url);
  }
  getSingleSubCategory(supid, mainid, subid): Observable<any> {
    const supUrl = 'supcategory/';
    const mainUrl = '/maincategory/';
    const cteUrl = '/subcategory/';
    const url: string = this.productServiceUrl + supUrl + supid + mainUrl + mainid + cteUrl + subid;
    return this.httpClient.get<any>(url);
  }
  getProductBySuperCategory(id, venodorId): Observable<any> {
    const categoryUrl = 'getproductbysupercategory/';
    const url: string = this.productServiceUrl + categoryUrl + id + '/' + venodorId;
    return this.httpClient.get<any>(url);
  }
  getProductBySubCategory(id, venodorId): Observable<any> {
    const categoryUrl = 'getprdouctbysubcategory/';
    const url: string = this.productServiceUrl + categoryUrl + id + '/' + venodorId;
    return this.httpClient.get<any>(url);
  }
  checkFrontNeckStyle(title): Observable<any> {
    const path = 'checkfrontneckstyle';
    const url: string = this.customerSerivceUrl + path;
    return this.httpClient.post<any>(url, title);
  }
  checkBackNeckStyle(title): Observable<any> {
    const path = 'checkbackneckstyle';
    const url: string = this.customerSerivceUrl + path;
    return this.httpClient.post<any>(url, title);
  }
  checkSleeveStyle(title): Observable<any> {
    const path = 'checksleevestyle';
    const url: string = this.customerSerivceUrl + path;
    return this.httpClient.post<any>(url, title);
  }
  checkBottomStyle(title): Observable<any> {
    const path = 'checkbottomstyle';
    const url: string = this.customerSerivceUrl + path;
    return this.httpClient.post<any>(url, title);
  }
  getCatalogueByVendor(id): Observable<any> {
    const path = 'getcataloguebyvendor/';
    const url: string = this.productServiceUrl + path + id;
    return this.httpClient.get<any>(url);
  }
  getProductByvendorandcatalogue(data, id): Observable<any> {
    const path = 'getproductbyvendorandcatalogue/';
    const url: string = this.productServiceUrl + path + id;
    return this.httpClient.put<any>(url, data);
  }
  getProductByvendorWithStatus(data, id): Observable<any> {
    const path = 'getproductbyvendorwithstatus/';
    const url: string = this.productServiceUrl + path + id;
    return this.httpClient.put<any>(url, data);
  }
  // New Arrival
  createNewArrival(data): Observable<any> {
    const path = 'createnewarrivalcondition';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  getNewArrival(): Observable<any> {
    const path = 'getnewarrival';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.get<any>(url);
  }
  getSelectedNewArrival(id): Observable<any> {
    const path = 'getsinglenewarrival' + id;
    const url: string = this.productServiceUrl + path;
    return this.httpClient.get<any>(url);
  }
  updateNewArrival(data, id): Observable<any> {
    const path = 'createnewarrivalcondition' + id;
    const url: string = this.productServiceUrl + path;
    return this.httpClient.put<any>(url, data);
  }
  getProductForNewArrival(): Observable<any> {
    const path = 'getallproductfornewarrival';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.get<any>(url);
  }
  getProductImageCategroy(): Observable<any> {
    const path = 'viewimagesupercategory';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.get<any>(url);
  }
  retrieveInventory(data): Observable<any> {
    const path = 'retrieveInventory';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  updateSingleQtyInventory(data): Observable<any> {
    const path = 'updatesingleqtyinventory';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  updateSinglePriceInventory(data): Observable<any> {
    const path = 'updatesinglepriceinventory';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  getInventoryByVendor(data): Observable<any> {
    const path = 'retrieveinventorybyvendor';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  getProductBySelectedSKU(data): Observable<any> {
    const path = 'retieveinventorybyselectedsku';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  
  selectedProductBySelectedVendor(data): Observable<any> {
    const path = 'selectedproductbyselectedvendor';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  bulkupdateinventory(data, id): Observable<any> {
    const path = 'bulkupdateinventory/' + id;
    const url: string = this.productServiceUrl + path;
    return this.httpClient.put<any>(url, data);
  }
  bulkUpdateStatusByQty(data): Observable<any> {
    const path = 'bulkproductqtycheckandupdatepublish';
    const url: string = this.productServiceUrl + path;
    return this.httpClient.post<any>(url, data);
  }
  getProductByChild(id): Observable<any> {
    const path = 'getproductbychild/' + id;
    const url: string = this.productServiceUrl + path;
    return this.httpClient.get<any>(url);
  }
  superCategoryParentImageCount(id): Observable<any> {
  
    const path = this.productServiceUrl + 'supercategoryimagescount/supercategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  pushParentSuperCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.parentResizeId.toString())
     
    const path = this.productServiceUrl + 'supercategoryimages/supercategory/' + id;
    const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
  superCategoryChildImageCount(id): Observable<any> {

    const path = this.productServiceUrl + 'supercategorychildimagescount/supercategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  pushChildSuperCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.childResizeId.toString())
      const path =  this.productServiceUrl  + 'supercategorychildimages/supercategory/' + id;
      const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
  mainCategoryParentImageCount(id): Observable<any> {
    const path = this.productServiceUrl + 'maincategoryimagescount/maincategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  pushParentMainCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.parentResizeId.toString())
     
    const path = this.productServiceUrl + 'maincategoryimages/maincategory/' + id;
    const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
  mainCategoryChildImageCount(id): Observable<any> {

    const path = this.productServiceUrl + 'maincategorychildimagescount/maincategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  pushChildMainCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.childResizeId.toString())
      const path = this.productServiceUrl + 'maincategorychildimages/maincategory/' + id;
      const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
  subCategoryChildImageCount(id): Observable<any> {
    const path = this.productServiceUrl + 'subcategorychildimagescount/subcategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  subCategoryParentImageCount(id): Observable<any> {
    
    const path = this.productServiceUrl + 'subcategoryimagescount/subcategory/' + id;
    const url: string =  path;
    return this.httpClient.get<any>(url);
  }
  pushParentSubCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.parentResizeId.toString())
    const path = this.productServiceUrl + 'subcategoryimages/subcategory/' + id;
    const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
  pushChildSubCategoryImagesToSQS(id, totalReq, limit): Observable<any> {
    var subQueue = [];
    for(let i=0; i <= totalReq - 1; i++) {
      let httpData: HttpParams = new HttpParams()  
      .set('page', i.toString())
      .set('limit', limit.toString())
      .set('reSizeId', this.childResizeId.toString())
      const path = this.productServiceUrl + 'subcategorychildimages/subcategory/' + id;
      const url: string =  path;
      subQueue.push(this.httpClient.get<any>(url, {params: httpData})) 
    }
    return forkJoin(subQueue);
  }
}
