import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
/* import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; */
import { CmsRoutingModule } from './cms-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsAndUseComponent } from './terms-and-use/terms-and-use.component';
import { ViewTermsAndUseComponent } from './view-terms-and-use/view-terms-and-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ViewPrivacyPolicyComponent } from './view-privacy-policy/view-privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { ViewFaqComponent } from './view-faq/view-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { AdsComponent } from './ads/ads.component';
import { ViewAdsComponent } from './view-ads/view-ads.component';
import { BannersComponent } from './banners/banners.component';
import { ViewBannersComponent } from './view-banners/view-banners.component';
import { FooterComponent } from './footer/footer.component';
import { ViewFooterComponent } from './view-footer/view-footer.component';
import { HeaderComponent } from './header/header.component';
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
import { SharedModule} from '../shared/shared.module';
import { DeleteConfirmBoxComponent} from '../shared/delete-confirm-box/delete-confirm-box.component';
import { ViewCategoryBannerComponent } from './categoryBanner/view-category-banner/view-category-banner.component';
import { AddCategoryBannerComponent } from './categoryBanner/add-category-banner/add-category-banner.component';
import { EditCategoryBannerComponent } from './categoryBanner/edit-category-banner/edit-category-banner.component';
import { AddHomepageVideoComponent } from './add-homepage-video/add-homepage-video.component';
import { DisplayContentComponent } from './display-content/display-content.component';

@NgModule({
  declarations: [ContactUsComponent, TermsAndUseComponent, ViewTermsAndUseComponent,
    PrivacyPolicyComponent, ViewPrivacyPolicyComponent, FaqComponent, ViewFaqComponent, EditFaqComponent,
    AdsComponent, ViewAdsComponent, BannersComponent, ViewBannersComponent, FooterComponent,
    ViewFooterComponent, HeaderComponent, EditAdsComponent, EditBannersComponent, EditTermsAndUseComponent,
     SecondRowContentComponent, ViewSecondRowContentComponent, ThirdRowContentComponent,
     ViewThirdRowContentComponent, FifthRowContentComponent, ViewFifthRowContentComponent,
     SixthRowContentComponent, ViewSixthRowContentComponent, SeventhRowContentComponent,
     ViewSeventhRowContentComponent, MultipleRowComponent, EditSecondRowComponent, EditThirdRowComponent,
     EditFifthRowComponent, EditSixthRowComponent, EditSeventhRowComponent, ViewCategoryBannerComponent,
     AddCategoryBannerComponent, EditCategoryBannerComponent, AddHomepageVideoComponent, DisplayContentComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
/*     HttpClientModule,
    HttpClientJsonpModule, */
    ReactiveFormsModule
  ],
  entryComponents: [MultipleRowComponent,DeleteConfirmBoxComponent]
})
export class CmsModule { }
