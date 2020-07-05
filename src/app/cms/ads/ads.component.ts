import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ADSModel } from './ads.model';
import { CmsService } from '../cms.service';
import { AdsImageData } from './adsImageData.model';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  ADSForm: FormGroup;
  fileToUpload: any;
  adsImageData: AdsImageData = new AdsImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  adsModel: any;
  showImageNameError: boolean;
  adsDetailModel: ADSModel;
  adsImageDetail: ADSModel;
  message: string;
  fileLength: any;
  action: string;
  hide = false;
  width: number;
  height: number;
  showImageError = false;
  ImageDimenetionSubmitError = false;
  check;
  showImage;

  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.ADSForm = this.fb.group({
      id: [''],
      position: [''],
      adsTitle: [''],
      adsDescription: [''],
      link: [''],
      buttonContent: ['']
    });
  }
  // base64 image upload
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.urls = [];
    this.adsImageDetail = new ADSModel();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.urls.push(reader.result);
      this.check = reader.result;
      this.adsImageDetail.adsName = this.fileToUpload.name;
      this.adsImageDetail.adsImageName = this.check;
      this.showImage = this.check;
      console.log('ads image name', this.adsImageDetail.adsImageName);
    };
    this.adsImageDetail = this.adsImageDetail;
    this.checkImageName();
  }
  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    console.log('fileSize', this.fileToUpload);
    this.adsImageData.adsImage = this.fileToUpload[0];
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
    this.checkImageName();
  } */
  checkImageValidation() {
    if (this.fileToUpload.length !== 0) {
      if (this.width === 840 && this.height === 906) {
        this.showImageError = false;
      } else {
        this.showImageError = true;
      }
  } else {
    this.showImageError = false;
  }
  }
  checkImageName() {
    this.imageNameFilter = this.adsModel.filter(val => val.adsImageName.indexOf(this.adsImageData.adsImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }
  validation() {
    if (this.fileToUpload === undefined) {
      this.hide = true;
    } else {
      if (this.showImageError === false) {
        this.hide = false;
        this.creatADS();
      } else {
        this.ImageDimenetionSubmitError = true;
      }
    }
  }
  creatADS() {                              // Create ADS Details
    this.adsDetailModel = new ADSModel();
    this.adsDetailModel.adsDescription = this.ADSForm.controls.adsDescription.value;
    this.adsDetailModel.adsTitle = this.ADSForm.controls.adsTitle.value;
    this.adsDetailModel.position = this.ADSForm.controls.position.value;
    this.adsDetailModel.link = this.ADSForm.controls.link.value;
    this.adsDetailModel.buttonContent = this.ADSForm.controls.buttonContent.value;
    this.cmsService.CreateADS(this.adsDetailModel).subscribe(data => {
      this.uploadSingleImage(data._id);
    }, error => {
      console.log(error);
    });
  }
  addAdsImage(id) {                                         //  Upload ADS images
    this.message = 'Hot Products added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.cmsService.UploadADSImage(formData, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeAdsName(data.Key, id);
    }, error => {
      console.log(error);
    });
  }
  uploadSingleImage(id) {
    this.cmsService.uploadAdsBase64(this.adsImageDetail, id).subscribe(data => {
      this.adsDetailModel  = data;
      console.log(data, 'uploaded images');
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeAdsName(this.fileToUpload.name, id);
    }, error => {
      console.log(error);
    });
  }
  storeAdsName(name, id) {
    this.adsDetailModel = new ADSModel();
    this.adsDetailModel.adsImageName = name;
    this.cmsService.StoreADSImageName(this.adsDetailModel, id).subscribe(data => {
    this.router.navigate(['cms/viewAds']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['cms/viewAds']);
  }
}
