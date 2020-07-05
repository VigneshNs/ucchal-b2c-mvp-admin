import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Brand } from './brand.model';
@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent implements OnInit {
  fileLength;
  fileToUpload;
  urls = new Array<string>();
  brand: Brand;
  urlSingle = new Array<string>();
  confirmSize: any = [];
  sizeFilter = [];
  reader: FileReader = new FileReader();
  fileToLoad;
  file: Brand;
  bannerData;
  byteArrayConverted: Uint8Array;
  check;
  showImage: any;
  BASE64_MARKER: any = ';base64,';
  selectedFiles: FileList;
  message;
  action;
  constructor(private productService: ProductService) { }

  ngOnInit() {
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
  handleFileInputSingle(images: any)   {
    this.fileToUpload = images;
    this.urlSingle = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urlSingle.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  uploadMultiImagesMulter() {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadMultipleMulterImages(formData, 1).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  uploadSingleImagesMulter() {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.productService.uploadSingleMulterImages(formData, 2).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
 /* handleFileInput64Base(files: FileList) {
    this.fileToUpload = files[0];
    const reader = new FileReader();
    const file = this.fileToUpload;
    console.log(file);
    this.check  = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.check = reader.result;
      // this.byteArrayConverted = this.convertDataURIToBinary(this.check)
    };
    
  } */
  testExcel() {
    console.log(this.check);
  this.productService.uploadSingleBase64Excel(this.check).subscribe(data => {
  }, error => {
    console.log(error);
  });
}/* 
  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  } */
  handleFileInput64Base(files: FileList) {
    this.fileToUpload = files[0];
    this.brand = new Brand();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.check = reader.result;
      this.byteArrayConverted = this.convertDataURIToBinary(this.check);
      this.brand.brandName = this.fileToUpload.name;
      this.brand.brandImageName = this.byteArrayConverted;
      this.showImage = this.check;
    };
    this.brand = this.brand;
  }
  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
  uploadSingleImage() {
    this.productService.uploadSingleBase64(this.brand, 3).subscribe(data => {
      this.brand  = data;
    }, error => {
      console.log(error);
    });
  }
  upload() {
    /* const formData = new FormData(); */
 /*    formData.append('file', this.file.brandName, this.file.brandImageName);
    console.log(formData); */
    this.productService.uploadSingleBase64Excel(this.file).subscribe(data => {
  });

}

  selectFile(event) {
    this.file = new Brand();
    /* this.selectedFiles = event.target.files; */
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file.brandName = event.target.files[0];
    }
  }
}
