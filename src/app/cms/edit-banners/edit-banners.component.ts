import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { CmsService } from '../cms.service';
import { BannerModel } from '../banners/banners.model';
import { BannerImageData } from '../banners/bannersImageData.model';

@Component({
  selector: 'app-edit-banners',
  templateUrl: './edit-banners.component.html',
  styleUrls: ['./edit-banners.component.css']
})
export class EditBannersComponent implements OnInit {
  imageEdit = false;
  BannerForm: FormGroup;
  id: string;
  bannerModel: any;
  holder: any;
  fileToUpload: any;
  bannerImageData: BannerImageData = new BannerImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  showImageNameError: boolean;
  fileLength: any;
  bannerValue: BannerModel;
  width: number;
  height: number;
  showImageError = false;
  ImageDimenetionSubmitError = false;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id');
      });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedBanner();
  }
  createForm() {
    this.BannerForm = this.fb.group({
      id: [''],
      position: [''],
      bannerDescription: [''],
      bannerTitle: [''],
      bannerSubTitle: [''],
      buttonContent: [''],
      link: [''],
    });
  }
  getSelectedBanner() {
    this.cmsService.getSelectedBanner(this.id).subscribe(data => {
      this.bannerModel = data;
    }, error => {
      console.log(error);
    });
  }
  CreateBanner(pos, tit, dec, lin, subtitle, buttoncontent) {
    this.holder = new BannerModel();
    this.holder.position = pos;
    this.holder.bannerTitle = tit;
    this.holder.bannerDescription = dec;
    this.holder.link = lin;
    this.holder.bannerSubTitle = subtitle;
    this.holder.buttonContent = buttoncontent;
    this.cmsService.updateBannerDetails(this.holder, this.id).subscribe(data => {
      this.bannerModel = data;
     /*  if (this.fileToUpload === undefined) { */
      this.router.navigate(['cms/viewBanner']);
      /* } else {
        this.updateImage();
      } */
    }, error => {
      console.log(error);
    });
  }

editImage() {
  this.imageEdit = true;
}
cancelImage() {
  this.imageEdit = false;
}
handleFileInput(images: any) {
  this.urls = [];
  this.fileToUpload = images;
  this.bannerImageData.bannerImage = this.fileToUpload[0];
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
 }
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
checkImageDimension() {
  if (this.showImageError === false) {
   
    this.updateImage();
  } else {
    this.ImageDimenetionSubmitError = true;
  }
}
 updateImage() {
  const formData: any = new FormData();
  this.fileLength = this.fileToUpload.length;
  for (let i = 0; i <= this.fileLength; i++) {
    formData.append('single', this.fileToUpload[i]);
  }
  this.cmsService.updateBannerImage(formData, this.id).subscribe(data => {
    this.bannerModel = data;
    this.imageEdit = false;
    this.storeBannerImageName(data.Key);
  }, error => {
    console.log(error);
  });
}
storeBannerImageName(name) {
  this.bannerValue = new BannerModel();
  this.bannerValue.bannerImageName = name;
  this.cmsService.StoreBannerImageName(this.bannerValue, this.id).subscribe(data => {
    this.bannerModel = data;
    this.imageEdit = false;
  }, error => {
    console.log(error);
  });
}
cancel() {
  this.router.navigate(['cms/viewBanner']);
}
}
