import { Component, OnInit } from '@angular/core';
import { BrandModel } from './../add-brand/brand.model';
import { BrandImageData } from './../add-brand/brandImage.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { BrandService } from './../brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
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
  activeStatus = [true, false];
  id: string;
  imageEdit = false;
  status;
  imageHolder: BrandImageData;
  check;
  showImage;
  constructor(private brandService: BrandService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    this.getSelectedBrand();
  }
  getSelectedBrand() {
    this.brandService.getSingleBrand(this.id).subscribe(data => {
      this.brand = data;
      this.status = this.brand.brandStatus;
    }, error => {
      console.log(error);
    });
  }
  updateBrand(brandName, brandTitle, brandDescription, brandContent, brandStatus, metaTitle, metaDescription, metaContent)   {
    this.brand = new BrandModel();
    this.brand.brandName =  brandName;
    this.brand.brandTitle =  brandTitle;
    this.brand.brandDescription =  brandDescription;
    this.brand.brandContent =  brandContent;
    this.brand.brandStatus =  brandStatus;
    this.brand.metaTitle =  metaTitle;
    this.brand.metaDescription =  metaDescription;
    this.brand.metaContent =  metaContent;
    this.brandService.updateSingleBrand(this.id, this.brand).subscribe(data => {
      this.updateImage();
    this.brand = data;
    }, error => {
      console.log(error);
    });
  }
  cancelBrand()   {
    this.router.navigate(['brand/viewbrand']);
  }
  editImage() {
    this.imageEdit = true;
  }
  cancelImage() {
    this.imageEdit = false;
  }
  /* handleFileInput(images: any) {
    this.urls = [];
    this.fileToUpload = images;
    this.brandImageData.brandImage = this.fileToUpload[0];
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
  updateImage() {
   /*  const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    } */
    this.brandService.uploadBrandImage(this.imageHolder, this.id).subscribe(data => {
    this.brand = data;
    this.imageEdit = false;
    this.updateBrandImageName(this.imageHolder.imageName, this.id);
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
