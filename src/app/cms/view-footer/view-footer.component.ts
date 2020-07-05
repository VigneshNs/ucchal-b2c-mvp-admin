import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer.model';
import { CmsService } from '../cms.service';
import { LogoImageData } from '../footer/footerImageData.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-footer',
  templateUrl: './view-footer.component.html',
  styleUrls: ['./view-footer.component.css']
})
export class ViewFooterComponent implements OnInit {
  footerEditForm: FormGroup;
  footerModel: any;
  message: string;
  footerAddModel: Footer;
  action: string;
  fileToUpload: any;
  logoImageData: LogoImageData = new LogoImageData();
  urls: any[];
  reader: FileReader;
  fileLength: any;
  hideAddFooter: boolean;
  width: number;
  height: number;
  showImageError = false;
  imageHolder: LogoImageData;
  check;
  showImage;
  isShowFooter = false;

  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getFooterDetails();
  }
  createForm() {
    this.footerEditForm = this.fb.group({
      id: [''],
      address: [''],
      instagramLink: [''],
      facebookLink: [''],
      pintrestLink: [''],
      googlePlusLink: [''],
      twitterLink: [''],
      map: [''],
      contactNo: [''],
      alternativeContactNo: [''],
      logoImageName: [''],
      mailId: ['', Validators.email],
      aboutUsPreview: ['']
    });
  }
  getFooterDetails() {
    this.cmsService.getFooter().subscribe(data => {
      this.footerModel = data;
      if (data.length !== 0) {
        this.hideAddFooter = true;
      }
    });
  }
  editAddress(data) {
    data.detailsUpdate = true;
  }
  cancelDetails(data) {
    data.detailsUpdate = false;
  }
  updateDetails(id, address, contactNo, alternativeContactNo, mailId, map, aboutUs) {
    this.message = 'Details updated';
    const str = this.footerModel[0].logoImageName;
    const imageName = str.substring(str.lastIndexOf('/') + 1);
    this.footerAddModel = new Footer();                                 // update Profile Details
    this.footerAddModel.address = address;
    this.footerAddModel.instagramLink = this.footerModel[0].instagramLink;
    this.footerAddModel.facebookLink = this.footerModel[0].facebookLink;
    this.footerAddModel.pintrestLink = this.footerModel[0].pintrestLink;
    this.footerAddModel.googlePlusLink = this.footerModel[0].googlePlusLink;
    this.footerAddModel.twitterLink = this.footerModel[0].twitterLink;
    this.footerAddModel.mailId = mailId;
    this.footerAddModel.map = map;
    this.footerAddModel.contactNo = contactNo;
    this.footerAddModel.alternativeContactNo = alternativeContactNo;
    this.footerAddModel.aboutUsPreview = aboutUs;
    this.footerAddModel.logoImageName = imageName;
    this.cmsService.updateFooterDetail(this.footerAddModel, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.getFooterDetails();
      this.footerModel = data;
    });
  }
  editSocialMedia(data) {
    data.socialUpdate = true;
  }
  updateSocialDetails(id, instagramLink, facebookLink, pintrestLink, googlePlusLink, twitterLink) {
    this.message = 'Social Media Links updated';
    const str = this.footerModel[0].logoImageName;
    const imageName = str.substring(str.lastIndexOf('/') + 1); // Update Social Details
    this.footerAddModel = new Footer();
    this.footerAddModel.address = this.footerModel[0].address;
    this.footerAddModel.instagramLink = instagramLink;
    this.footerAddModel.facebookLink = facebookLink;
    this.footerAddModel.pintrestLink = pintrestLink;
    this.footerAddModel.googlePlusLink = googlePlusLink;
    this.footerAddModel.twitterLink = twitterLink;
    this.footerAddModel.mailId = this.footerModel[0].mailId;
    this.footerAddModel.map = this.footerModel[0].map;
    this.footerAddModel.contactNo = this.footerModel[0].contactNo;
    this.footerAddModel.alternativeContactNo = this.footerModel[0].alternativeContactNo;
    this.footerAddModel.logoImageName = imageName;
    this.footerAddModel.aboutUsPreview = this.footerModel[0].aboutUsPreview;
    this.cmsService.updateFooterDetail(this.footerAddModel, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.getFooterDetails();
      this.footerModel = data;
    });
  }
  cancelSocialDetails(data) {
    data.socialUpdate = false;
  }
  editLogo(data) {
    this.isShowFooter = true;
    data.logoUpdate = true;
  }
 /*  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.logoImageData.logoImage = this.fileToUpload[0];
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          const store = new Image();
          store.onload = (o: any) => {
          this.width = store.width;
          this.height = store.height;
          this.checkImageValidation();
        };
          store.src = e.target.result;

        };
        this.reader.readAsDataURL(file);
      }
    }
  } */
    // base64 image upload
handleFileInput(files: FileList) {
  this.fileToUpload = files[0];
  this.urls = [];
  this.imageHolder = new LogoImageData();
  const reader = new FileReader();
  const file = this.fileToUpload;
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.urls.push(reader.result);
    this.check = reader.result;
    this.imageHolder.imageName = this.fileToUpload.name;
    this.imageHolder.uploadedImage = this.check;
    this.showImage = this.check;
  };
}
  checkImageValidation() {
    if (this.fileToUpload.length !== 0) {
      if (this.width === 440 && this.height === 255) {
        this.showImageError = false;
      } else {
        this.showImageError = true;
      }
  } else {
    this.showImageError = false;
  }
  }
  cancelLogo(data) {
    this.isShowFooter = false;
    data.logoUpdate = false;
  }
  checkImageDimension(id) {
    if (this.showImageError === false) {
     
      this.updateLogo(id);
    }
  }
  updateLogo(id) {                              // Upload Logo
  /*   this.message = 'Logo updated';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    } */
    this.cmsService.uploadFooterImage(this.imageHolder, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeImageName(this.imageHolder.imageName, id);
    }, error => {
      console.log(error);
    });
  }
  storeImageName(name, id) {
    const holder = new Footer();
    holder.logoImageName = name;
    this.cmsService.updateFooterImageName(holder, id).subscribe(data => {
     /*  this.router.navigate(['cms/viewFooter']); */
     /* this.footerModel = data; */
     this.isShowFooter = false;
     this.getFooterDetails();
     data.logoUpdate = true;
    }, error => {
      console.log(error);
    });
  }
}
