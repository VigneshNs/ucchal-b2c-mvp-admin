import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../product.service';
import { ReadyToWear } from './ready-to-wear.model';

@Component({
  selector: 'app-ready-to-wear',
  templateUrl: './ready-to-wear.component.html',
  styleUrls: ['./ready-to-wear.component.css']
})
export class ReadyToWearComponent implements OnInit {
  tailoringForm: FormGroup;
  measurementData = ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46'];
  categoryData: any;
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  fileLength: any;
  message: string;
  action: string;
  sizeGuideUrl: any;
  fileToUploadInches: any;
  urlInches: any[];

  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) {
    this.getCategory();
    
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

  getCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      console.log(data);
      this.categoryData = data;
    }, error => {
      console.log(error);
    });
  }
  onSubmit() {
    const holder = new ReadyToWear();
    holder.serviceName = this.tailoringForm.controls.serviceName.value;
    holder.price = this.tailoringForm.controls.price.value;
    holder.discount = this.tailoringForm.controls.discount.value;
    holder.measurement = this.tailoringForm.controls.measurement.value;
    holder.selectedCategoryID = this.tailoringForm.controls.selectedCategory.value._id;
    holder.selectedCategory = this.tailoringForm.controls.selectedCategory.value.categoryName;
    this.productService.createReadyToWear(holder).subscribe(data => {
      console.log(data);
      this.uploadImages(data._id);
    }, error => {
      console.log(error);
    });
    console.log(holder);
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
    this.productService.addReadyToWearNameCM(holder, id).subscribe(data => {
     /*  this.router.navigate(['product/viewreadytowear']); */
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
    this.productService.addReadyToWearNameInches(holder, id).subscribe(data => {
      this.router.navigate(['product/viewreadytowear']);
    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.router.navigate(['product/viewreadytowear']);
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
}
