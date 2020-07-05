import { Component, OnInit } from '@angular/core';
import { BannerModel } from './banners.model';
import { BannerImageData } from './bannersImageData.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { CmsService } from '../cms.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  BannerForm: FormGroup;
  fileToUpload: any;
  bannerImageData: BannerImageData = new BannerImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  bannerModel: any;
  showImageNameError: boolean;
  bannerValue: BannerModel;
  message: string;
  fileLength: any;
  action: string;
  hide = false;
  width: number;
  height: number;
  showHint1 = false;
  showImageError = false;
  showHint2 = false;
  ImageDimenetionSubmitError = false;
  check;
  showImage: any;

  constructor(private cmsService: CmsService, private router: Router, private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.BannerForm = this.fb.group({
      id: [''],
      position: [''],
      bannerTitle: [''],
      bannerDescription: [''],
      bannerSubTitle: [''],
      buttonContent: [''],
      link: [''],
    });
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.bannerModel = new BannerModel();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      this.check = reader.result;
      this.bannerModel.bannerName = this.fileToUpload.name;
      this.bannerModel.bannerImageName = this.check;
      this.showImage = this.check;
      console.log('banner image name', this.bannerModel.bannerImageName);
    };
    
    this.bannerModel = this.bannerModel;
    this.checkImageName();
  }
 /*  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.bannerImageData.bannerImage = this.fileToUpload[0];
    this.urls = [];
    const files = images;
    this.showImageError = false;
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
    this.checkImageName();
  } */
  checkImageValidation() {
    if (this.fileToUpload.length !== 0) {
      if (this.width === 1920 && this.height === 650) {
        this.showImageError = false;
      } else {
        this.showImageError = true;
      }
  } else {
    this.showImageError = false;
  }
  }

  checkImageName() {
    this.imageNameFilter = this.bannerModel.filter(val => val.bannerImage.indexOf(this.bannerImageData.bannerImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }
  CreateBanner() {                    // Create Banner Details
    this.bannerValue = new BannerModel();
    this.bannerValue.bannerDescription = this.BannerForm.controls.bannerDescription.value;
    this.bannerValue.bannerTitle = this.BannerForm.controls.bannerTitle.value;
    this.bannerValue.bannerSubTitle = this.BannerForm.controls.bannerSubTitle.value;
    this.bannerValue.buttonContent = this.BannerForm.controls.buttonContent.value;
    this.bannerValue.position = this.BannerForm.controls.position.value;
    this.bannerValue.link = this.BannerForm.controls.link.value;
    this.cmsService.CreateBanner(this.bannerValue).subscribe(data => {
      this.uploadSingleImage(data._id);
    }, error => {
      console.log(error);
    });
  }
  addBannerImage(id) {                                     // Upload Banner Images
    this.message = 'Banners added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.cmsService.UploadBannerImage(formData, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeBannerImageName(data.Key, id);
    }, error => {
      console.log(error);
    });
  }
  uploadSingleImage(id) {
    this.cmsService.uploadSingleBase64(this.bannerModel, id).subscribe(data => {
      this.bannerModel  = data;
      console.log(data, 'uploaded images');
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeBannerImageName(this.fileToUpload.name, id);
    }, error => {
      console.log(error);
    });
  }
  storeBannerImageName(name, id) {
    this.bannerValue = new BannerModel();
    this.bannerValue.bannerImageName = name;
    this.cmsService.StoreBannerImageName(this.bannerValue, id).subscribe(data => {
      this.router.navigate(['cms/viewBanner']);
    }, error => {
      console.log(error);
    });
  }
  validation() {
    if (this.fileToUpload === undefined) {
      this.hide = true;
    } else {
      if (this.showImageError === false) {
        this.hide = false;
        this.CreateBanner();
      } else {
        this.ImageDimenetionSubmitError = true;
      }
      
    }
  }
  cancel() {
    this.router.navigate(['cms/viewBanner']);
  }
}
