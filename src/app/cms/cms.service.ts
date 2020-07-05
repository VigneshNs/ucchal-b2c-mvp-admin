import { Injectable } from '@angular/core';
import { AppSetting } from '../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { ContactUs } from './contact-us/contact-us.model';
import { TermsAndUse } from './terms-and-use/termsAndUse.model';
import { PrivacyPolicy } from './privacy-policy/privacy-policy.model';
import { FAQModel } from './faq/faq.model';
import { ADSModel } from './ads/ads.model';
import { BannerModel } from './banners/banners.model';
import { Header } from './header/header.model';
import { Footer } from './footer/footer.model';
import { Product } from '../product/add-product/product.model';
import { SecondRowModel } from './second-row-content/second-row.model';
import { ThirdRowModel } from './third-row-content/third-row.model';
import { FifthRowModel } from './fifth-row-content/fifth-row.model';
import { SixthRowModel } from './sixth-row-content/sixth-row.model';
import { SeventhRowModel } from './seventh-row-content/seventh-row.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  serviceUrl: string = AppSetting.cmsServiceUrl;
  productServiceUrl: string = AppSetting.productServiceUrl;
  imageUploadServiceUrl: string = AppSetting.imageUploadServiceUrl;
  constructor(private http: HttpClient) { }

  // Contact us Module

  getAllContactUs(): Observable<any> {                     // Retrieve All contact us data
    const categoryUrl = 'getallcontactus';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<ContactUs>(url);
  }


  // Terms and Use Module

  CreateTermsAndUse(data): Observable<any> {                // Create new terms and use
    const categoryUrl = 'termsanduse';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<TermsAndUse>(url, data);
  }
  UpdateTermsAndUse(data, id): Observable<any> {                // Update terms and use
    const categoryUrl = 'editTerms/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<TermsAndUse>(url, data);
  }
  getAllTermsAndUse(): Observable<any> {                    // Retrieve All terms and use
    const categoryUrl = 'getterms';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<TermsAndUse>(url);
  }
  getSingleTermsAndUse(id): Observable<any> {                    // Retrieve Single terms and use
    const categoryUrl = 'gettermssingle/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.get<TermsAndUse>(url);
  }
  deleteTermsAndUse(id): Observable<any> {                  // Delete Single Terms and Use
    const categoryUrl = 'deleteterms/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<TermsAndUse>(url);
  }

  // Privacy and Policy

  CreatePrivacyPolicy(data): Observable<any> {               // Create new privacy policy
    const categoryUrl = 'createprivacypolicy';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<PrivacyPolicy>(url, data);
  }

  getAllPrivacyPolicy(): Observable<any> {                    // Retrieve All Privacy Policy
    const categoryUrl = 'getprivacypolicy';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<PrivacyPolicy>(url);
  }

  updatePrivacyPolicy(data, id): Observable<any> {            // Update privacy policy
    const categoryUrl = 'editprivacypolicy/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<PrivacyPolicy>(url, data);
  }

  // FAQ Module

  CreateFAQ(data): Observable<any> {                            // Create new Faq
    const categoryUrl = 'createfaq';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<FAQModel>(url, data);
  }

  getAllFAQ(): Observable<any> {                                 // Retrieve All FAQ
    const categoryUrl = 'getfaq';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<FAQModel>(url);
  }
  deleteSingleFAQ(id): Observable<any> {                           // Delete Single FAQ
    const categoryUrl = 'deletefaq/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<FAQModel>(url);
  }
  getSingleFAQ(id): Observable<any> {                               // Retrieve Single FAQ
    const categoryUrl = 'singlefaq/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.get<FAQModel>(url);
  }
  updateSingleFAQ(data, id): Observable<any> {                       // Update Single FAQ
    const categoryUrl = 'editFAQ/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<FAQModel>(url, data);
  }
  // homepage video Module
  getHomepageVideo(): Observable<any> {                                       // Retrieve All homepage video
    const categoryUrl = 'gethomepageVideo';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  CreateHomepageVideo(data): Observable<any> {                                   // Create new homepage video
    const categoryUrl = 'createhomepageVideo';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<any>(url, data);
  }
  getPublishedHomepageVideo(): Observable<any> {                                       // Retrieve All homepage video
    const categoryUrl = 'getPublishedhomepageVideo';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<any>(url);
  }
  changeVideoStatus(data, id): Observable<any> {                     // change Customer status
    const categoryUrl = 'changeVideoofVideo/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<any>(url, data);
  }
  deleteSingleHomepagVideo(id): Observable<any> {                                // Delete Single homepage video
    const categoryUrl = 'deletehomepageVideo/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<any>(url);
  }

  updateHomepageVideo(data, id): Observable<any> {                        //  Update Selected homepage video Details
    const categoryUrl = 'updatehomepageVideo/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<any>(url, data);
  }

  publishHomepageVideo(data): Observable<any> {                                   // Put Publish homrpage video
    const categoryUrl = 'updatepublishads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<any>(url, data);
  }
  unPublishHomepageVideo(data): Observable<any> {                                   // Put UnPublish homrpage video
    const categoryUrl = 'updateunpublishads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<any>(url, data);
  }



  // ADS Module

  getAllADS(): Observable<any> {                                       // Retrieve All ADS
    const categoryUrl = 'getads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<ADSModel>(url);
  }
  CreateADS(data): Observable<any> {                                   // Create new ADS
    const categoryUrl = 'createads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<ADSModel>(url, data);
  }
  UploadADSImage(data, id): Observable<any> {                           //  Upload ADS Image
    const categoryUrl = 'uploadadsimage/';
    const url: string = this.imageUploadServiceUrl + categoryUrl + id;
    return this.http.put<ADSModel>(url, data);
  }
  StoreADSImageName(data, id): Observable<any> {                           //  add ADS Image Name
    const categoryUrl = 'storeadsimagename/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<ADSModel>(url, data);
  }
  deleteSingleADS(id): Observable<any> {                                // Delete Single ADS
    const categoryUrl = 'deleteads/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<ADSModel>(url);
  }
  getSelectedADS(id): Observable<any> {                                //  Get Selected ADS Image
    const categoryUrl = 'getsingleads/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.get<ADSModel>(url);
  }
  updateSelectedADS(data, id): Observable<any> {                        //  Update Selected ADS Details
    const categoryUrl = 'updateads/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<ADSModel>(url, data);
  }
  updateSelectedADSImage(data, id): Observable<any> {                        //  Update Selected ADS Image
    const categoryUrl = 'updateadsimage/';
    const url: string = this.imageUploadServiceUrl + categoryUrl + id;
    return this.http.put<ADSModel>(url, data);
  }
  publishMethodADS(data): Observable<any> {                                   // Put Publish ADS
    const categoryUrl = 'updatepublishads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<ADSModel>(url, data);
  }
  unPublishMethodADS(data): Observable<any> {                                   // Put UnPublish ADS
    const categoryUrl = 'updateunpublishads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<ADSModel>(url, data);
  }

  //  Banner Module

  CreateBanner(data): Observable<any> {                                 // Create new Banner
    const categoryUrl = 'createbanner';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<BannerModel>(url, data);
  }
  UploadBannerImage(data, id): Observable<any> {                          //  Upload Banner Image
    const categoryUrl = 'uploadbannerimage/';
    const url: string = this.imageUploadServiceUrl + categoryUrl + id;
    return this.http.put<BannerModel>(url, data);
  }
  StoreBannerImageName(data, id): Observable<any> {                          //  add Banner Image Name
    const categoryUrl = 'storebannerimagename/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<BannerModel>(url, data);
  }
  getAllBanner(): Observable<any> {                                        // Retrieve All Banner
    const categoryUrl = 'getbanner';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<BannerModel>(url);
  }
  deleteSingleBanner(id): Observable<any> {                                 // Delete Single Banner
    const categoryUrl = 'deletebanner/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<BannerModel>(url);
  }
  getSelectedBanner(id): Observable<any> {                                   // Retrieve Single Banner
    const categoryUrl = 'getsinglebanner/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.get<BannerModel>(url);
  }
  updateBannerDetails(data, id): Observable<any> {                                   // Retrieve Single Banner
    const categoryUrl = 'updatebanner/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<BannerModel>(url, data);
  }
  updateBannerImage(data, id): Observable<any> {                                   // Retrieve Single Banner
    const categoryUrl = 'updatebannerimage/';
    const url: string = this.imageUploadServiceUrl + categoryUrl + id;
    return this.http.put<BannerModel>(url, data);
  }
  publishMethodBanner(data): Observable<any> {                                   // Put Publish Banner
    const categoryUrl = 'updatepublishbanner';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<BannerModel>(url, data);
  }
  unPublishMethodBanner(data): Observable<any> {                                   // Put UnPublish Banner
    const categoryUrl = 'updateunpublishbanner';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<BannerModel>(url, data);
  }

  // Header Module

  getHeader(): Observable<any> {                                             // Retrieve Header
    const categoryUrl = 'getheaderimage';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<Header>(url);
  }
  UploadHeaderImage(data): Observable<any> {                                 //  Upload Header Image
    const categoryUrl = 'createheaderimage';
    const url: string = this.imageUploadServiceUrl + categoryUrl;
    return this.http.put<BannerModel>(url, data);
  }
  addHeaderImageName(data): Observable<any> {                                 //  add Header Image Name
    const categoryUrl = 'addheaderimagename';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.put<BannerModel>(url, data);
  }

  //  Footer Module

  getFooter(): Observable<any> {                                               // Retrieve Footer
    const categoryUrl = 'getfooterdetail';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.get<Footer>(url);
  }
  updateFooterDetail(data, id): Observable<any> {                               // update Footer Details
    const categoryUrl = 'updatefooterdetail/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<Footer>(url, data);
  }
  uploadFooterImage(data, id): Observable<any> {                                 // upload Footer image
    const categoryUrl = 'uploadfooterimage/';
    const url: string = this.imageUploadServiceUrl + categoryUrl + id;
    return this.http.put<Footer>(url, data);
  }
  updateFooterImageName(data, id): Observable<any> {                                 // upload Footer image
    const categoryUrl = 'savefooterimagename/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<Footer>(url, data);
  }
  CreateFooter(data): Observable<any> {                                         // Create Footer Details
    const categoryUrl = 'createfooter/';
    const url: string = this.serviceUrl + categoryUrl;
    return this.http.post<Footer>(url, data);
  }

  // Second Row

  getProducts(): Observable<any> {
    const productUrl = 'getproductforrow';
    const url: string = this.productServiceUrl + productUrl;
    return this.http.get<Product>(url);
  }
  getSingleSecondProducts(id): Observable<any> {
    const productUrl = 'getsinglesecond/';
    const url: string = this.serviceUrl + productUrl + id;
    return this.http.get<Product>(url);
  }
  addSecondRow(data): Observable<any> {
    const footerUrl = 'createsecond';
    const url: string = this.serviceUrl + footerUrl ;
    return this.http.post<SecondRowModel>(url, data);
  }
  getSecondRow(): Observable<any> {
    const productUrl = 'getsecond';
    const url: string = this.serviceUrl + productUrl;
    return this.http.get<SecondRowModel>(url);
  }
  addSixthRow(data): Observable<any> {
    const footerUrl = 'createsixthrow';
    const url: string = this.serviceUrl + footerUrl ;
    return this.http.post<SixthRowModel>(url, data);
  }
  addSeventhRow(data): Observable<any> {
    const footerUrl = 'createseventhrow';
    const url: string = this.serviceUrl + footerUrl ;
    return this.http.post<SeventhRowModel>(url, data);
  }
  getSixtRow(): Observable<any> {
    const productUrl = 'getsixthrow';
    const url: string = this.serviceUrl + productUrl;
    return this.http.get<SixthRowModel>(url);
  }
  getSeventhRow(): Observable<any> {
    const productUrl = 'getseventhrow';
    const url: string = this.serviceUrl + productUrl;
    return this.http.get<SeventhRowModel>(url);
  }
  allProductTag(): Observable<any> {
    const productUrl = 'getproducttag';
    const url: string = this.productServiceUrl + productUrl;
    return this.http.get<any>(url);
  }
  getProductByTag(id): Observable<any> {
    const productUrl = 'getproductposition/';
    const url: string = this.productServiceUrl + productUrl + id;
    return this.http.get<any>(url);
  }
  deleteSecondRow(id): Observable<any> {                                 // Delete Single Second Row
    const categoryUrl = 'deletesecondrow/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<SecondRowModel>(url);
  }
  deleteSixthRow(id): Observable<any> {                                 // Delete Single Sixth Row
    const categoryUrl = 'deletesixthrow/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<SecondRowModel>(url);
  }
  deleteSeventhRow(id): Observable<any> {                                 // Delete Single Sixth Row
    const categoryUrl = 'deleteseventhrow/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<SeventhRowModel>(url);
  }
  ChangeStatusSecondRow(data, id): Observable<any> {                                   // Put Change Status Fifth Row
    const categoryUrl = 'updatesecondrowstats/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<FifthRowModel>(url, data);
  }


  // Third Row

  addThirdRow(data): Observable<any> {
    const footerUrl = 'createthird';
    const url: string = this.serviceUrl + footerUrl ;
    return this.http.post<ThirdRowModel>(url, data);
  }
  getSingleThirdProducts(id): Observable<any> {
    const productUrl = 'getsinglethird/';
    const url: string = this.serviceUrl + productUrl + id;
    return this.http.get<Product>(url);
  }
  getThirdRow(): Observable<any> {
    const productUrl = 'getthird';
    const url: string = this.serviceUrl + productUrl;
    return this.http.get<ThirdRowModel>(url);
  }
  deleteThirdRow(id): Observable<any> {                                 // Delete Single Third Row
    const categoryUrl = 'deletethirdrow/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.delete<ThirdRowModel>(url);
  }

  ChangeStatusThirdRow(data, id): Observable<any> {                                   // Put Change Status Third Row
    const categoryUrl = 'updatethirdrowstatus/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.http.put<ThirdRowModel>(url, data);
  }
    // Fifth Row

    addFifthRow(data): Observable<any> {
      const footerUrl = 'createfifth';
      const url: string = this.serviceUrl + footerUrl ;
      return this.http.post<FifthRowModel>(url, data);
    }
    getSingleFifthProducts(id): Observable<any> {
      const productUrl = 'getsinglefifth/';
      const url: string = this.serviceUrl + productUrl + id;
      return this.http.get<Product>(url);
    }
    getFifthRow(): Observable<any> {
      const productUrl = 'getfifth';
      const url: string = this.serviceUrl + productUrl;
      return this.http.get<FifthRowModel>(url);
    }
    deleteFifthRow(id): Observable<any> {                                 // Delete Single Fifth Row
      const categoryUrl = 'deletefifthrow/';
      const url: string = this.serviceUrl + categoryUrl + id;
      return this.http.delete<FifthRowModel>(url);
    }
    ChangeStatusFifthRow(data, id): Observable<any> {                                   // Put Change Status Fifth Row
      const categoryUrl = 'updatefifthrowstatus/';
      const url: string = this.serviceUrl + categoryUrl + id;
      return this.http.put<FifthRowModel>(url, data);
    }
    /* unPublishMethodFifth(data): Observable<any> {
      const categoryUrl = 'updateunpublishfifthrow';
      const url: string = this.serviceUrl + categoryUrl;
      return this.http.put<FifthRowModel>(url, data);
    } */

    // Sixth Row

    ChangeStatusSixthRow(data, id): Observable<any> {                                   // Put Change Status Sixth Row
      const categoryUrl = 'updatesixthrowstatus/';
      const url: string = this.serviceUrl + categoryUrl + id;
      return this.http.put<SixthRowModel>(url, data);
    }
    getSingleSixthProducts(id): Observable<any> {
      const productUrl = 'getsinglesixth/';
      const url: string = this.serviceUrl + productUrl + id;
      return this.http.get<Product>(url);
    }

    // Seventh Row

    ChangeStatusSeventhRow(data, id): Observable<any> {                                   // Put Change Status Seventh Row
      const categoryUrl = 'updateseventhrowstatus/';
      const url: string = this.serviceUrl + categoryUrl + id;
      return this.http.put<SeventhRowModel>(url, data);
    }
    getSingleSeventhProducts(id): Observable<any> {
      const productUrl = 'getsingleseventh/';
      const url: string = this.serviceUrl + productUrl + id;
      return this.http.get<Product>(url);
    }
    // Category Banner

  createCategoryBanner(content): Observable<any> {      // Create Category Banner
    const path = 'createcategorybanner';
    const url: string = this.productServiceUrl + path;
    return this.http.post<any>(url, content);
  }
  uploadCategoryBannerImage(image, id): Observable<any> {     // Upload Category Image
    const path = 'uploadcateogorybanner/';
    const url: string = this.imageUploadServiceUrl + path + id;
    return this.http.post<any>(url, image);
  }
  addCategoryBannerImageName(content, id): Observable<any> {      // add Category Banner Image Name
    const path = 'addimagename/';
    const url: string = this.productServiceUrl + path + id;
    return this.http.post<any>(url, content);
  }
  getAllCategoryBanner(): Observable<any> {      // get All Category Banner
    const path = 'getcategorybanner';
    const url: string = this.productServiceUrl + path;
    return this.http.get<any>(url);
  }
  getSingleCategoryBanner(id): Observable<any> {      // get Single Category Banner
    const path = 'getsinglecategorybanner/';
    const url: string = this.productServiceUrl + path + id;
    return this.http.get<any>(url);
  }
  updateCategoryBanner(content, id): Observable<any> {      // update Category Banner
    const path = 'updatecategorybanner/';
    const url: string = this.productServiceUrl + path + id;
    return this.http.put<any>(url, content);
  }
  updateCategoryBannerImageName(content, id): Observable<any> {      // update Category Banner Image Name
    const path = 'updateimagename/';
    const url: string = this.productServiceUrl + path + id;
    return this.http.put<any>(url, content);
  }
  deleteCategoryBanner(id): Observable<any> {      // Delete Category Banner
    const path = 'deletecategorybanner/';
    const url: string = this.productServiceUrl + path + id;
    return this.http.delete<any>(url);
  }

  // base 64 image upload
  uploadSingleBase64(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'base64imagesingle/' + id;
    const url: string = this.imageUploadServiceUrl + brandUrl;
    return this.http.put<BannerModel>(url, data);
  }

  // ads base64 upload
  uploadAdsBase64(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'adsbase64imagesingle/' + id;
    const url: string = this.imageUploadServiceUrl + brandUrl;
    return this.http.put<ADSModel>(url, data);
  }

  getDisplayContent(): Observable<any> {
    const path = 'getofferdisplaycontent';
    const url: string = this.serviceUrl + path;
    return this.http.get<any>(url);
  }

  addDisplayContent(data): Observable<any> {
    const path = 'adddisplayoffer';
    const url: string = this.serviceUrl + path;
    return this.http.post<any>(url, data);
  }
}

