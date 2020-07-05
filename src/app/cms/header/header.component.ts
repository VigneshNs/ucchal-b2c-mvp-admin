import { Component, OnInit } from '@angular/core';
import { Header } from './header.model';
import { CmsService } from '../cms.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { LogoImageData } from './headerImageData.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  HeaderForm: FormGroup;
  headerModel: any;
  fileToUpload: any;
  logoImageData: LogoImageData = new LogoImageData();
  urls: any[];
  reader: FileReader;
  message: string;
  fileLength: any;
  action: string;
  width: number;
  height: number;
  showImageError = false;
  imageHolder: LogoImageData;
  check;
  showImage;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getHeader();
  }
  createForm() {
    this.HeaderForm = this.fb.group({
      id: [''],
      position: [''],
    });
  }
  getHeader() {                                     // Retrieve Header Details
    this.cmsService.getHeader().subscribe(data => {
      this.headerModel = data;
    }, error => {
      console.log(error);
    });
  }
  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    this.logoImageData.logoImage = this.fileToUpload[0];
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
  } */
     // base64 image upload
handleFileInput(files: FileList) {
  this.fileToUpload = files[0];
  this.urls = [];
  this.imageHolder = new LogoImageData();
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
  checkImageValidation() {
    if (this.fileToUpload.length !== 0) {
      if (this.width === 682 && this.height === 402) {
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
      this.addTemplate();
    }
  }
  addTemplate() {                                       // Upload Logo
   /*  this.message = 'Logo  added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    } */
    this.cmsService.UploadHeaderImage(this.imageHolder).subscribe(data => {
      this.headerModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.storeHeaderImageName(this.imageHolder.imageName);
    }, error => {
      console.log(error);
    });
  }
  storeHeaderImageName(name) {
    this.headerModel = new Header();
    this.headerModel.logoImageName = name;
    this.cmsService.addHeaderImageName(this.headerModel).subscribe(data => {
      this.headerModel = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
