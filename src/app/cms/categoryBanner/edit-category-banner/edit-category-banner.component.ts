import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { CategoryBanner } from '../view-category-banner/categoryBanner.model';
import { CmsService } from '../../cms.service';
import { AppSetting } from '../../../config/appSetting';
import { CategoryBannerImage } from '../view-category-banner/categoryBannerImage.model';

@Component({
  selector: 'app-edit-category-banner',
  templateUrl: './edit-category-banner.component.html',
  styleUrls: ['./edit-category-banner.component.css']
})
export class EditCategoryBannerComponent implements OnInit {
  id: string;
  CategoryBannerForm: FormGroup;
  dataStore: any;
  categoryBannerServiceUrl: string;
  vertical = ['Top', 'Center', 'Bottom'];
  horizontal = ['Left', 'Center', 'Right'];
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  imageEdit = false;
  message: string;
  fileLength: any;
  action: string;
  imagePos = [ 1, 2, 3, 4, 5, 6, 7, 8];
  imageHolder: CategoryBannerImage;
  check;
  showImage;

  constructor(private cmsService: CmsService, private router: Router, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getSingleCategoryBanner();
    this.categoryBannerServiceUrl = AppSetting.categoryBannerImageUrl;
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.CategoryBannerForm = this.fb.group({
      title: [''],
      description: [''],
      link: [''],
      imagePosition: [''],
      verticalPosition: [''],
      horizontalPosition: ['']
    });
  }
  getSingleCategoryBanner() {
    this.cmsService.getSingleCategoryBanner(this.id).subscribe(data => {
      console.log(data);
      this.dataStore = data;
    }, error => {
      console.log(error);
    });
  }
  // handleFileInput(images: any) {
  //   this.fileToUpload = images;
  //  /*  this.adsImageData.adsImage = this.fileToUpload[0]; */
  //   this.urls = [];
  //   const files = images;
  //   if (files) {
  //     for (const file of files) {
  //       this.reader = new FileReader();
  //       this.reader.onload = (e: any) => {
  //         this.urls.push(e.target.result);
  //       };
  //       this.reader.readAsDataURL(file);
  //     }
  //   }
  // }
      // base64 image upload
handleFileInput(files: FileList) {
  this.fileToUpload = files[0];
  this.urls = [];
  this.imageHolder = new CategoryBannerImage();
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
  editImage() {
    this.imageEdit = true;
  }
  cancelImage() {
    this.imageEdit = false;
  }
   updateCategoryBanner(tit, desc, link, vpos, hpos) {
    const holder = new CategoryBanner();
    holder.title = tit;
    holder.description = desc;
    holder.link = link;
    holder.imagePosition = this.CategoryBannerForm.controls.imagePosition.value;
    holder.verticalPosition = this.CategoryBannerForm.controls.verticalPosition.value;
    holder.horizontalPosition = this.CategoryBannerForm.controls.horizontalPosition.value;
    this.cmsService.updateCategoryBanner(holder, this.id).subscribe(data => {
      console.log(data);
      if (this.fileToUpload === undefined) {
        this.router.navigate(['cms/viewCategoryBanner']);
      } else {
        this.updateImage();
      }
    }, error => {
      console.log(error);
    });
  }
  updateImage() {                                         //  Upload ADS images
   /*  this.message = 'Image Update';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    } */
    this.cmsService.uploadCategoryBannerImage(this.imageHolder, this.id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.addImageName(this.imageHolder.imageName, this.id);
    }, error => {
      console.log(error);
    });
  }
  addImageName(name, id) {
    const image = new CategoryBannerImage();
    image.categoryBannerImage = name;
    this.cmsService.addCategoryBannerImageName(image, id).subscribe(data => {
    this.router.navigate(['cms/viewCategoryBanner']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['cms/viewCategoryBanner']);
  }
}
