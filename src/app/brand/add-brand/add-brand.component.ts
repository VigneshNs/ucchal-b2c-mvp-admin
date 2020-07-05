
import { Component, OnInit } from '@angular/core';
import { BrandModel } from './brand.model';
import { BrandImageData } from './brandImage.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { BrandService } from './../brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  brandForm: FormGroup;
  fileToUpload: any;
  brandImageData: BrandImageData = new BrandImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  brandModel: any;
  showImageNameError: boolean;
  brand: BrandModel;
  message: string;
  fileLength: any;
  action: string;
  selectedStatus: boolean;
  selectStatus = false;
  activeStatus = [{ active: 'True', value: true  }, { active: 'False', value: false }];
  imageHolder: BrandImageData;
  check;
  showImage;
  constructor(private brandService: BrandService, private router: Router, private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.brandForm = this.fb.group({
      id: [''],
      brandName: [''],
      brandTitle: [''],
      brandDescription: [''],
      brandContent: [''],
      brandStatus:  [''],
      metaTitle: [''],
      metaDescription: [''],
      metaContent: ['']
    });
  }

  // get image file

  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    this.brandImageData.brandImage = this.fileToUpload[0];
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
    this.checkImageName();
  } */
      // base64 image upload
      handleFileInput(files: FileList) {
        this.fileToUpload = files[0];
        this.urls = [];
        this.imageHolder = new BrandImageData();
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
  statusValue(e) {
    this.selectedStatus = e.value;
  }
  checkImageName() {
    this.imageNameFilter = this.brandModel.filter(val => val.brandImageName.indexOf(this.brandImageData.brandImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }
  addBrand(brandForm: FormGroup) {
    if (this.selectedStatus !== undefined ) {                    // Create brand Details
    this.selectStatus = false;
    this.brand = new BrandModel();
    this.brand.brandName = brandForm.controls.brandName.value;
    this.brand.brandTitle = brandForm.controls.brandTitle.value;
    this.brand.brandDescription = brandForm.controls.brandDescription.value;
    this.brand.brandContent = brandForm.controls.brandContent.value;
    this.brand.brandStatus = this.selectedStatus;
    this.brand.metaTitle = brandForm.controls.metaTitle.value;
    this.brand.metaDescription = brandForm.controls.metaDescription.value;
    this.brand.metaContent = brandForm.controls.metaContent.value;
    this.brandService.createBrand(this.brand).subscribe(data => {
      this.addBrandImage(data._id);
    }, error => {
      console.log(error);
    });
  } else {
    this.selectStatus = true;
  }
  }
  cancelBrand()   {
    this.router.navigate(['brand/viewbrand']);
  }
  addBrandImage(id) {                                     // Upload Brand Images
    /* this.message = 'Brand added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    } */
    this.brandService.uploadBrandImage(this.imageHolder, id).subscribe(data => {
      this.updateBrandImageName(this.imageHolder.imageName, id);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, error => {
      console.log(error);
    });
  }
  updateBrandImageName(name, id) {                                     // Upload Brand Images
    this.brand = new BrandModel();
    this.brand.brandImageName = name;
    this.brandService.editBrandImageName(this.brand, id).subscribe(data1 => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['brand/viewbrand']);
    }, error => {
      console.log(error);
    });
  }
}
