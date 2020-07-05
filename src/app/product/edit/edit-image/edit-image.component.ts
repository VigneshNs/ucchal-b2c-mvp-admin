import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from './../../../product/add-product/product.model';
import { AppSetting } from '../../../config/appSetting';
import { ProductImageData } from './productImageData.model';
import { EditProduct } from './../edit-product/edit.model';
import { FormArray, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {
  fileToUpload: any;
  @Input() editProductModel: EditProduct;
  @Input() productModel: Product;
  @Input() productImageForm: FormArray;
  @Input() productForm: FormGroup;
  @Output() removeFrom = new EventEmitter<any>();
  @Output() addFormImage = new EventEmitter<any>();
  @Output() deleteImage =  new EventEmitter<any>();
  @Output() uploadImage =  new EventEmitter<any>();
  /* @Output() updateImage = new EventEmitter<any>(); */
  productImageData: ProductImageData = new ProductImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  productImageModel: any;
  imageError: boolean;
  showImage = true;
  showDelete = false;
  fileLength: any;
  productImageUrl: any;
  id: string;
  thirdValue: Product;

  constructor() {
    this.productImageUrl = AppSetting.productImageUrl;
  }
  ngOnInit() {
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.productImageData.productImage = this.fileToUpload[0];
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
  }
  addForm() {
    this.addFormImage.emit();
  }
  checkImageName() {
    this.imageNameFilter = this.productImageModel.filter(val => val.productImage.indexOf(this.productImageData.productImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.imageError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.imageError = false;
    }
  }
  getEdit() {
    this.showImage = false;
    this.editProductModel = new EditProduct();
    this.editProductModel.imageEdit = true;
  }
  cancel() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = false;
  }
  imageUploadCancel() {
    this.showImage = true;
    this.showDelete = false;
  }
  getDelete() {
    this.showDelete = true;
  }
  /* imageUpload() {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.uploadImage.emit(formData); */
 /*    this.productService.editProductImages(this.id, formData).subscribe(data => {
      this.showImage = true;
    }, error => {
      console.log(error);
    }); */
 /*  } */
  deleteProductImage(event) {
    this.thirdValue = new Product();
    this.thirdValue.productImage = event;
    this.deleteImage.emit(this.thirdValue);
  }
  deleteForm(i) {
    this.removeFrom.emit(i);
  }
  updateImage() {
    this.uploadImage.emit();
  }
}
