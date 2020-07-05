import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, TransitionCheckState, MatDialogRef } from '@angular/material';
import { MatPaginator, MatTableDataSource , MatSort } from '@angular/material';
import { SizeGuide } from '../size-guide/size-guide.model';
import { ProductService } from './../product.service';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import { SizeGuideImage } from './size-guideImage.model';

@Component({
  selector: 'app-edit-size-guide',
  templateUrl: './edit-size-guide.component.html',
  styleUrls: ['./edit-size-guide.component.css']
})
export class EditSizeGuideComponent implements OnInit {
  sizeGuideUrl;
  id: string;
  sizeGuideForm: FormGroup;
  holder: any;
  fileToUpload: any;
  sizeGuideImage: SizeGuideImage = new SizeGuideImage();
  urls: any[];
  reader: FileReader;
  isImageChanes = false;
  message: string;
  fileLength: any;
  action: string;
  sizeGuideModel: SizeGuide;
  vendorModel: any;
  vendorName: any;
  vendorId: any;
  sizeGuideImageUrl: string;
  isEditCM = false;
  isEditInches = false;
  fileToUploadCM: any;
  imageError: boolean;
  urlCM: any[];
  fileToUploadInches: any;
  urlInches: any[];
  imageHolder: SizeGuideImage;
  check;
  showImage;
  imageHolder2: SizeGuideImage;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService,
              private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute,
              private dialog: MatDialogRef<EditSizeGuideComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
this.sizeGuideImageUrl = AppSetting.sizeGuideImageUrl;
this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
  this.id = params.get('id');
  });
}

  ngOnInit() {
    this.createForm();
    this.getAllVendor();
   /*  this.getSingleSizeGuide(); */
  }
  createForm() {
    this.sizeGuideForm = this.fb.group({
      title: ['']
    });
  }
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, err => {
      console.log(err);
    });
  }
  getSingleSizeGuide() {
    this.productService.getSingleSizeGuide(this.id).subscribe(data => {
      this.holder = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
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
  /* handleFileInputCM(images: any) {
    this.fileToUploadCM = images;
    this.sizeGuideImage.cmImage = this.fileToUploadCM[0];
    this.imageError = false;
    this.urlCM = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urlCM.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  handleFileInputInches(images: any) {
    this.fileToUploadInches = images;
    this.sizeGuideImage.InchesImage = this.fileToUploadInches[0];
    this.imageError = false;
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
   } */
    // base64 image upload
    handleFileInputCM(files: FileList) {
      this.fileToUploadCM = files[0];
      this.urlCM = [];
      this.imageHolder = new SizeGuideImage();
      const reader = new FileReader();
      const file = this.fileToUploadCM;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.urlCM.push(reader.result);
        this.check = reader.result;
        this.imageHolder.imageName = this.fileToUploadCM.name;
        this.imageHolder.uploadedImage = this.check;
        this.showImage = this.check;
      };
    }
    // base64 image upload
    handleFileInputInches(files: FileList) {
      this.fileToUploadInches = files[0];
      this.urlInches = [];
      this.imageHolder2 = new SizeGuideImage();
      const reader = new FileReader();
      const file = this.fileToUploadInches;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.urlInches.push(reader.result);
        this.check = reader.result;
        this.imageHolder2.imageName = this.fileToUploadInches.name;
        this.imageHolder2.uploadedImage = this.check;
        this.showImage = this.check;
      };
    }
  uploadImagesCM(id) {
  //   /* this.message = 'Size Guide Added Successfully'; */
  //   const formData: any = new FormData();
  //  /*  this.fileLength = this.fileToUploadCM.length;
  //   for (let i = 0; i <= this.fileLength; i++) { */
  //   formData.append('single', this.sizeGuideImage.cmImage);
  //   /* } */
    this.productService.uploadSizeGuide(this.imageHolder, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.getSizeGuide(); */
      console.log(data);
      this.saveSizeGuideNameCM(this.imageHolder.imageName, this.data._id);
    }, error => {
      console.log(error);
    });
  }
  uploadImagesInches(id) {
  //   this.message = 'Size Guide Added Successfully';
  //   const formData: any = new FormData();
  // /*   this.fileLength = this.fileToUploadInches.length ;*/
  //   /* for (let i = 0; i <= this.fileLength; i++) { */
  //   formData.append('single', this.sizeGuideImage.InchesImage);
  //   /* } */
    this.productService.uploadSizeGuide(this.imageHolder2, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.getSizeGuide(); */
      console.log(data);
      this.saveSizeGuideNameInches(this.imageHolder2.imageName, this.data._id);
    }, error => {
      console.log(error);
    });
  }
  saveSizeGuideNameCM(name, id) {
    this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.sizeChartCM = name;
    this.productService.saveImageNameCM(this.sizeGuideModel, id).subscribe(data => {
      if (this.imageHolder.imageName) {
        this.uploadImagesInches(this.data._id);
      } else {
        this.dialog.close(data);
      }
    }, error => {
      console.log(error);
    });
  }
  saveSizeGuideNameInches(name, id) {
    this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.sizeChartInches = name;
    this.productService.saveImageNameInches(this.sizeGuideModel, id).subscribe(data => {
      this.dialog.close(data);
    }, error => {
      console.log(error);
    });
  }
  changeImage() {
    this.isImageChanes = true;
  }
  cancelImageUpdate() {
    this.isImageChanes = false;
  }
  cancelUpdate() {
    this.router.navigate(['product/sizeguide']);
  }
  submitUpdate(sizeGuideForm: FormGroup) {
    this.holder = new SizeGuide();
    this.holder.title = sizeGuideForm.controls.title.value;
    this.productService.updateSizeGuide(this.holder, this.id).subscribe(data => {
      this.checkImageUpload();
    }, error => {
      console.log(error);
    });
  }
  checkImageUpload() {
    if (!this.isImageChanes || this.fileToUpload === undefined) {
      this.router.navigate(['product/sizeguide']);
    } else {
      this.uploadImages();
    }
  }
  uploadImages() {
    this.message = 'Size Guide Added Successfully';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.productService.uploadSizeGuide(formData, this.id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.getSizeGuide(); */
      console.log(data);
      this.saveSizeGuideName(data.Key);
    }, error => {
      console.log(error);
    });
  }
  saveSizeGuideName(name) {
    /* this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.imageName = name;
    this.productService.saveImageName(this.sizeGuideModel, this.id).subscribe(data => {
      this.router.navigate(['product/sizeguide']);
    }, error => {
      console.log(error);
    }); */
  }
  selectVendor(e, vendor) {
    if (e.isUserInput === true) {
    this.vendorName = vendor.vendorName;
    this.vendorId = vendor._id;
    console.log(e, vendor);
  }
  }
  onCM() {
    this.isEditCM = true;
  }
  onEditInches() {
    this.isEditInches = true;
  }
  onSubmit() {
    const holder = new SizeGuide();
    holder.vendorId = this.vendorId;
    holder.vendorName = this.vendorName;
    this.productService.updateSizeGuide(holder, this.data._id).subscribe(data => {
      if (this.imageHolder.imageName) {
        this.uploadImagesCM(this.data._id);
      } else if (this.imageHolder2.imageName) {
        this.uploadImagesInches(this.data._id);
      } else {
        this.dialog.close(data);
      }
    });
  }
  onCancel() {
    this.dialog.close(false);
  }
}
