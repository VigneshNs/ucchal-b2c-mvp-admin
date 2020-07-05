import { Component, OnInit } from '@angular/core';
import { Footer } from './footer.model';
import { LogoImageData } from './footerImageData.model';
import { CmsService } from '../cms.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  FooterForm: FormGroup;
  fileToUpload: any;
  logoImageData: LogoImageData = new LogoImageData();
  urls: any[];
  reader: FileReader;
  footerModel: Footer;
  fileLength: any;
  width: number;
  height: number;
  showImageError = false;
  imageHolder: LogoImageData;
  check;
  showImage;

  constructor(private cmsService: CmsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {

    this.FooterForm = this.fb.group({
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

  /* handleFileInput(images: any) {
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
  addFooter() {                                   // Add Footer Details
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
   /*  for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    } */
    this.footerModel = new Footer();
    this.footerModel.address = this.FooterForm.controls.address.value;
    this.footerModel.instagramLink = this.FooterForm.controls.instagramLink.value;
    this.footerModel.facebookLink = this.FooterForm.controls.facebookLink.value;
    this.footerModel.pintrestLink = this.FooterForm.controls.pintrestLink.value;
    this.footerModel.googlePlusLink = this.FooterForm.controls.googlePlusLink.value;
    this.footerModel.twitterLink = this.FooterForm.controls.twitterLink.value;
    this.footerModel.map = this.FooterForm.controls.map.value;
    this.footerModel.contactNo = this.FooterForm.controls.contactNo.value;
    this.footerModel.alternativeContactNo = this.FooterForm.controls.alternativeContactNo.value;
    this.footerModel.mailId = this.FooterForm.controls.mailId.value;
    this.footerModel.aboutUsPreview = this.FooterForm.controls.aboutUsPreview.value;
    this.cmsService.CreateFooter(this.footerModel).subscribe(data => {
      /* this.addLogo(data[0]._id); */
      this.addLogo(data[0]._id);
    }, err => {
      console.log(err);
    });
  }

  addLogo(id) {                                       // Upload Logos
/*     const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    } */
    this.cmsService.uploadFooterImage(this.imageHolder, id).subscribe(data => {
      this.storeImageName(this.imageHolder.imageName, id);
    }, error => {
      console.log(error);
    });
  }
  storeImageName(name, id) {
    const holder = new Footer();
    holder.logoImageName = name;
    this.cmsService.updateFooterImageName(holder, id).subscribe(data => {
      this.router.navigate(['cms/viewFooter']);
    }, error => {
      console.log(error);
    });
  }
}
