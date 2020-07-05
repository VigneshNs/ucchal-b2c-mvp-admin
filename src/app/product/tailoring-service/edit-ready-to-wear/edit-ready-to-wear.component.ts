import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../product.service';
import { ReadyToWear } from '../ready-to-wear/ready-to-wear.model';
import { AppSetting } from '../../../config/appSetting';
@Component({
  selector: 'app-edit-ready-to-wear',
  templateUrl: './edit-ready-to-wear.component.html',
  styleUrls: ['./edit-ready-to-wear.component.css']
})
export class EditReadyToWearComponent implements OnInit {
  id: string;
  tailoringForm: FormGroup;
  measurementData = ['28', '30', '32', '34', '36', '38'];
  holder: any;
  categoryData: any;
  isImageChanes = false;
  isImageChanesInches = false;
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  sizeGuideUrl: string;
  message: string;
  fileLength: any;
  action: any;
  fileToUploadInches: any;
  urlInches: any[];

  constructor(private productService: ProductService, private router: Router, private snackBar: MatSnackBar, 
              private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
    });
    this.getSingleReadyToWear();
    this.getCategory();
    this.sizeGuideUrl = AppSetting.sizeGuideImageUrl;
   }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.tailoringForm = this.fb.group({
      serviceName: [''],
      price: [''],
      discount: [''],
      selectedCategory: [''],
      measurement: ['']
    });
  }
  getSingleReadyToWear() {
    this.productService.getSingleReadyToWear(this.id).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  getCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      console.log(data);
      this.categoryData = data;
    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.router.navigate(['product/viewreadytowear']);
  }
  onSubmit() {
    const holder = new ReadyToWear();
    holder.serviceName = this.tailoringForm.controls.serviceName.value;
    holder.price = this.tailoringForm.controls.price.value;
    holder.discount = this.tailoringForm.controls.discount.value;
    holder.measurement = this.tailoringForm.controls.measurement.value;
    holder.selectedCategory = this.tailoringForm.controls.selectedCategory.value.categoryName;
    holder.selectedCategoryID = this.tailoringForm.controls.selectedCategory.value._id;
    this.productService.updateReadyToWear(holder, this.id).subscribe(data => {
      this.uploadImages(data._id);
    }, error => {
      console.log(error);
    });
  }
  uploadImages(id) {
    this.message = 'Image Added Successfully';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.productService.uploadSizeGuide(formData, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.sizeChartName(data.Key, id);
    }, error => {
      console.log(error);
    });
  }
  sizeChartName(name, id) {
    const holder = new ReadyToWear();
    holder.sizeChartCM = name;
    this.productService.updateReadyToWearNameCM(holder, id).subscribe(data => {
     this.uploadImagesInches(id);
    }, error => {
      console.log(error);
    });
  }
  uploadImagesInches(id) {
    this.message = 'Image Added Successfully';
    const formData: any = new FormData();
    this.fileLength = this.fileToUploadInches.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUploadInches[i]);
    }
    this.productService.uploadSizeGuide(formData, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.sizeChartNameInches(data.Key, id);
    }, error => {
      console.log(error);
    });
  }
  sizeChartNameInches(name, id) {
    const holder = new ReadyToWear();
    holder.sizeChartInches = name;
    this.productService.updateReadyToWearNameInches(holder, id).subscribe(data => {
      this.router.navigate(['product/viewreadytowear']);
    }, error => {
      console.log(error);
    });
  }
  changeImage() {
    this.isImageChanes = true;
  }
  changeImageInches() {
    this.isImageChanesInches = true;
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
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
   }
   handleFileInputInches(images: any) {
    this.fileToUploadInches = images;
    this.urlInches = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urlInches.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
   }
   cancelImageUpdate() {
    this.isImageChanes = false;
  }
  cancelImageUpdateInches() {
    this.isImageChanesInches = false;
  }
}
