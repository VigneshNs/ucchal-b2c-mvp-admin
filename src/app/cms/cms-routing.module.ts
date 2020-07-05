import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsAndUseComponent } from './terms-and-use/terms-and-use.component';
import { ViewTermsAndUseComponent } from './view-terms-and-use/view-terms-and-use.component';
import { ViewPrivacyPolicyComponent } from './view-privacy-policy/view-privacy-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { ViewFaqComponent } from './view-faq/view-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { AdsComponent } from './ads/ads.component';
import { ViewAdsComponent } from './view-ads/view-ads.component';
import { BannersComponent } from './banners/banners.component';
import { ViewBannersComponent } from './view-banners/view-banners.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ViewFooterComponent } from './view-footer/view-footer.component';
import { EditAdsComponent } from './edit-ads/edit-ads.component';
import { EditBannersComponent } from './edit-banners/edit-banners.component';
import { EditTermsAndUseComponent } from './edit-terms-and-use/edit-terms-and-use.component';
import { SecondRowContentComponent } from './second-row-content/second-row-content.component';
import { ViewSecondRowContentComponent } from './view-second-row-content/view-second-row-content.component';
import { ThirdRowContentComponent } from './third-row-content/third-row-content.component';
import { ViewThirdRowContentComponent } from './view-third-row-content/view-third-row-content.component';
import { FifthRowContentComponent } from './fifth-row-content/fifth-row-content.component';
import { ViewFifthRowContentComponent } from './view-fifth-row-content/view-fifth-row-content.component';
import { SixthRowContentComponent } from './sixth-row-content/sixth-row-content.component';
import { ViewSixthRowContentComponent } from './view-sixth-row-content/view-sixth-row-content.component';
import { SeventhRowContentComponent } from './seventh-row-content/seventh-row-content.component';
import { ViewSeventhRowContentComponent } from './view-seventh-row-content/view-seventh-row-content.component';
import { MultipleRowComponent } from './multiple-row/multiple-row.component';
import { EditSecondRowComponent } from './edit-second-row/edit-second-row.component';
import { EditThirdRowComponent } from './edit-third-row/edit-third-row.component';
import { EditFifthRowComponent } from './edit-fifth-row/edit-fifth-row.component';
import { EditSixthRowComponent } from './edit-sixth-row/edit-sixth-row.component';
import { EditSeventhRowComponent } from './edit-seventh-row/edit-seventh-row.component';
import { ViewCategoryBannerComponent } from './categoryBanner/view-category-banner/view-category-banner.component';
import { AddCategoryBannerComponent } from './categoryBanner/add-category-banner/add-category-banner.component';
import { EditCategoryBannerComponent } from './categoryBanner/edit-category-banner/edit-category-banner.component';
import {AddHomepageVideoComponent} from './add-homepage-video/add-homepage-video.component';
import { DisplayContentComponent } from './display-content/display-content.component';

const routes: Routes = [
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: 'termsanduse',
    component: TermsAndUseComponent
  },
  {
    path: 'viewTermsAndUse',
    component: ViewTermsAndUseComponent
  },
  {
    path: 'viewPrivacyPolicy',
    component: ViewPrivacyPolicyComponent
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'viewFaq',
    component: ViewFaqComponent
  },
  {
    path: 'editFaq/:id',
    component: EditFaqComponent
  },
  {
    path: 'ads',
    component: AdsComponent
  },
  {
    path: 'viewAds',
    component: ViewAdsComponent
  },
  {
    path: 'banner',
    component: BannersComponent
  },
  {
    path: 'viewBanner',
    component: ViewBannersComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'viewFooter',
    component: ViewFooterComponent
  },
  {
    path: 'editAds/:id',
    component: EditAdsComponent
  },
  {
    path: 'editBanners/:id',
    component: EditBannersComponent
  },
  {
    path: 'editTermsAndUse/:id',
    component: EditTermsAndUseComponent
  },
 {  path: '',
    component: MultipleRowComponent,
   children: [{
    path: 'secondrow',
    component: SecondRowContentComponent
  },
  {
    path: 'editsecondrow/:id',
    component: EditSecondRowComponent
  },
  {
    path: 'viewSecond',
    component: ViewSecondRowContentComponent
  },
  {
    path: 'thirdrow',
    component: ThirdRowContentComponent
  },
  {
    path: 'editthirdrow/:id',
    component: EditThirdRowComponent
  },
  {
    path: 'viewThird',
    component: ViewThirdRowContentComponent
  },
  {
    path: 'fifthrow',
    component: FifthRowContentComponent
  },
  {
    path: 'editfifthrow/:id',
    component: EditFifthRowComponent
  },
  {
    path: 'viewFifth',
    component: ViewFifthRowContentComponent
  },
  {
    path: 'sixthrow',
    component: SixthRowContentComponent
  },
  {
    path: 'editsixthrow/:id',
    component: EditSixthRowComponent
  },
  {
    path: 'viewSixth',
    component: ViewSixthRowContentComponent
  },
  {
    path: 'seventhrow',
    component: SeventhRowContentComponent
  },
  {
    path: 'editseventhrow/:id',
    component: EditSeventhRowComponent
  },
  {
    path: 'viewSeventh',
    component: ViewSeventhRowContentComponent
  }]
},
{
  path: 'viewCategoryBanner',
  component: ViewCategoryBannerComponent
},
{
  path: 'addCategoryBanner',
  component: AddCategoryBannerComponent
},
{
  path: 'editCategoryBanner/:id',
  component: EditCategoryBannerComponent
},
{
  path: 'homepageVideo',
  component: AddHomepageVideoComponent
},
{
  path: 'displayContent',
  component: DisplayContentComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
