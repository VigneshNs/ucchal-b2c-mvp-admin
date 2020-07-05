import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { CategoryBanner } from '../view-category-banner/categoryBanner.model';
import { CmsService } from '../../cms.service';
import { CategoryBannerImage } from '../view-category-banner/categoryBannerImage.model';

@Component({
  selector: 'app-add-category-banner',
  templateUrl: './add-category-banner.component.html',
  styleUrls: ['./add-category-banner.component.css']
})
export class AddCategoryBannerComponent implements OnInit {
  categoryForm: FormGroup;
  vertical = ['Top', 'Center', 'Bottom'];
  horizontal = ['Left', 'Center', 'Right'];
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  hide = false;
  message: string;
  fileLength: any;
  action: any;
  dataHolder: any;
  checkPosition = false;
  imagePos = [ 1, 2, 3, 4, 5, 6, 7, 8];
  imageHolder: any;
  check;
  showImage;
  constructor(private cmsService: CmsService, private router: Router, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private snackBar: MatSnackBar) { 
                this.getAllCategoryBanner();
              }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.categoryForm = this.fb.group({
      title: [''],
      description: [''],
      imagePosition: [''],
      link: [''],
      verticalPosition: [''],
      horizontalPosition: ['']
    });
  }
  getAllCategoryBanner() {
    this.cmsService.getAllCategoryBanner().subscribe(data => {
      console.log(data);
      this.dataHolder = data;
    }, error => {
      console.log(error);
    });
  }
  // handleFileInput(images: any) {
  //   this.fileToUpload = images;
  //   /* console.log('fileSize', this.fileToUpload); */
  //   /* this.adsImageData.adsImage = this.fileToUpload[0]; */
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
  checkImagePosition(pos) {
    this.dataHolder.forEach(element => {
      if (element.imagePosition !== undefined) {
      if (element.imagePosition === pos.value) {
        this.checkPosition = true;
      } else {
        this.checkPosition = false;
      }
    }
    });
  }
  validation() {
    if (this.fileToUpload === undefined) {
      this.hide = true;
    } else {
      this.hide = false;
      this.createCategoryBanner();
    }
  }
  createCategoryBanner() {
    const create = new CategoryBanner();
    create.title = this.categoryForm.controls.title.value;
    create.description = this.categoryForm.controls.description.value;
    create.link = this.categoryForm.controls.link.value;
    create.imagePosition = this.categoryForm.controls.imagePosition.value;
    create.verticalPosition = this.categoryForm.controls.verticalPosition.value;
    create.horizontalPosition = this.categoryForm.controls.horizontalPosition.value;
    this.cmsService.createCategoryBanner(create).subscribe(data => {
      this.addCategoryBannerImage(data._id);
    }, error => {
      console.log(error);
    });
  }
  addCategoryBannerImage(id) {                                         //  Upload ADS images
   /*  this.message = 'Image added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    } */
    this.cmsService.uploadCategoryBannerImage(this.imageHolder, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.addImageName(this.imageHolder.imageName, id);
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
