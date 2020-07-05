import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { VendorImage } from '../registration/vendorImageDetails.model';
import { AppSetting } from '../../config/appSetting';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-upload-images',
  templateUrl: './edit-upload-images.component.html',
  styleUrls: ['./edit-upload-images.component.css']
})
export class EditUploadImagesComponent implements OnInit {
  profileData: any;
  userId: string;
  cancelledChequefileToUpload: any;
  ImageData: VendorImage = new VendorImage();
  urls1: any[];
  reader: FileReader;
  fileLength: any;
  showCheque = false;
  showDigital = false;
  digitalSignaturefileToUpload: any;
  urls2: any[];
  vendorImageUrl: any;
  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
    this.vendorImageUrl = AppSetting.vendorImageServiceUrl;
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
  }
  getAddress() {
    this.vendorService.getSingleVendorDetails(this.userId).subscribe(data => {
      this.profileData = data;
      /* console.log(data); */
    }, err => {
      console.log(err);
    });
  }
  cancelledChequeFileInput(images: any) {
    this.cancelledChequefileToUpload = images;
    this.ImageData.cancelledImage = this.cancelledChequefileToUpload[0];
    this.urls1 = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls1.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  updateCancelCheque() {                              // Upload Logo
    /* this.message = 'Logo updated'; */
    const formData: any = new FormData();
    this.fileLength = this.cancelledChequefileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.cancelledChequefileToUpload[i]);
    }
    this.vendorService.updateCancelCheque(formData, this.userId).subscribe(data => {
      /* this.snackBar.open(this.message, this.action, {
        duration: 2000,
      }); */
      /*  this.updateDigitalSignature(data._id); */
      this.updateCancelChequeName(data.Key);
      /* this.cancel(); */
    }, err => {
      console.log(err);
    });
  }
  updateCancelChequeName(name) {
    const value1 = new VendorModel();
    value1.cancelledCheque = name;
    this.vendorService.updateCancelChequeName(value1, this.userId).subscribe(data => {
      this.getAddress();
      this.cancel();
    }, err => {
      console.log(err);
    });
  }
  digitalSignatureFileInput(images: any) {
    this.digitalSignaturefileToUpload = images;
    this.ImageData.digitalSignature = this.digitalSignaturefileToUpload[0];
    this.urls2 = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls2.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  uploadDigitalSignature(id) {                              // Upload Logo
    /* this.message = 'Logo updated'; */
    const formData: any = new FormData();
    this.fileLength = this.digitalSignaturefileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.digitalSignaturefileToUpload[i]);
    }
    this.vendorService.updateDigitalSignature(formData, this.userId).subscribe(data => {
      /* this.snackBar.open(this.message, this.action, {
        duration: 2000,
      }); */
      /*   this.router.navigate(['vendor/viewAllVendor']); */
      this.updateDigitalSignature(data.Key);
    }, err => {
      console.log(err);
    });
  }
  updateDigitalSignature(name) {
    const value2 = new VendorModel();
    value2.digitalSignature = name;
    this.vendorService.updateDigitalSignatureName(value2, this.userId).subscribe(data => {
      this.getAddress();
      this.cancel();
    }, err => {
      console.log(err);
    });
  }

  editCheque() {
    this.showCheque = true;
    this.showDigital = false;
  }
  editDigital() {
    this.showDigital = true;
    this.showCheque = false;
  }
  cancel() {
    this.showDigital = false;
    this.showCheque = false;
  }
}
