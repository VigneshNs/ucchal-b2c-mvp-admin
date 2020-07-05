import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../../product.service';
import { Measurement } from '../../../../shared/model/measurement.model';
import { MeasurementStyle } from '../../../../shared/model/measurementStyle.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';
import { MeasurementImage } from './measurementImage.model';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent implements OnInit {
  measurementForm: FormGroup;
  imageError: boolean;
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  aroundBustImg: any[];
  aroundAboveWaistImg: any[];
  blouseLengthImg: any[];
  imageError1: boolean;
  imageError2: boolean;
  frontNeckDepthImg: any[];
  imageError3: boolean;
  imageError4: boolean;
  backNeckDepthImg: any[];
  sleeveLengthImg: any[];
  imageError5: boolean;
  aroundArmImg: any[];
  imageError6: boolean;
  superCategoryModel: any;
  headerCatSelectedData: any;
  mainCategoryModel: any;
  selectedMainCategory: any;
  mainCategoryName: any;
  subCategoryModel: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  imageData = {
    imageName: String
  };
  imageHolder1: MeasurementImage;
  check;
  showImage;
  imageHolder2: MeasurementImage;
  imageHolder3: MeasurementImage;
  imageHolder4: MeasurementImage;
  imageHolder5: MeasurementImage;
  imageHolder6: MeasurementImage;
  imageHolder7: MeasurementImage;

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) {
    this.showSuperCategory();
   
   }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.measurementForm = this.fb.group({
      amount: [0],
      discount: [0],
      superCategoryId: ['None'],
      mainCategoryId: ['None'],
      subCategoryId: ['None'],
      measurementName: [''],
      aroundBustMin: [''],
      aroundBustMax: [''],
      aroundBustDescription: [''],
      aroundAboveWaistMin: [''],
      aroundAboveWaistMax: [''],
      aroundAboveWaistDescription: [''],
      blouseLengthMin: [''],
      blouseLengthMax: [''],
      blouseLengthDescription: [''],
      frontNeckDepthMin: [''],
      frontNeckDepthMax: [''],
      frontNeckDepthDescription: [''],
      backNeckDepthMin: [''],
      backNeckDepthMax: [''],
      backNeckDepthDescription: [''],
      sleeveLengthMin: [''],
      sleeveLengthMax: [''],
      sleeveLengthDescription: [''],
      aroundArmMin: [''],
      aroundArmMax: [''],
      aroundArmDescription: [''],
      closingSide: this.fb.array([]),
      closingWith: this.fb.array([]),
      lining: this.fb.array([]),
      specialComment: [''],
      measurementType: this.fb.array([])
    });
    // this.addTypeForm();
    // this.addClosingSideForm();
    // this.addClosingWithForm();
    // this.addLiningForm();
  }
  addTypeForm() {
    const measurementType = this.fb.group({
      typeName: [''],
      typeDescription: ['']
    });
    this.typeForms.push(measurementType);
  }
  get typeForms() {
    console.log(this.measurementForm);
    return this.measurementForm.get('measurementType') as FormArray;
    
  }
  deleteType(i) {
    this.typeForms.removeAt(i);
  }
  addClosingSideForm() {
    const closingSide = this.fb.group({
      closingSide: ['']
    });
    this.closingSideForms.push(closingSide);
  }
  get closingSideForms() {
    return this.measurementForm.get('closingSide') as FormArray;
  }
  deleteClosingSide(i) {
    this.closingSideForms.removeAt(i);
  }
  addClosingWithForm() {
    const closingWith = this.fb.group({
      closingWith: ['']
    });
    this.closingWithForms.push(closingWith);
  }
  get closingWithForms() {
    return this.measurementForm.get('closingWith') as FormArray;
  }
  deleteClosingWith(i) {
    this.closingWithForms.removeAt(i);
  }
  addLiningForm() {
    const lining = this.fb.group({
      lining: ['']
    });
    this.liningForms.push(lining);
  }
  get liningForms() {
    return this.measurementForm.get('lining') as FormArray;
  }
  deleteLining(i) {
    this.liningForms.removeAt(i);
  }
  aroundBustImageUpload(images: FileList) {
    this.imageError = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.aroundBustImage = this.fileToUpload[0];
    this.aroundBustImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundBustImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundBustImg = [];
    this.imageHolder1 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundBustImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder1.imageName = this.fileToUpload.name;
      this.imageHolder1.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundAboveWaistImageUpload(images: FileList) {
    this.imageError1 = false;
    this.fileToUpload = images[0];
    this.aroundAboveWaistImg = [];
    this.imageHolder2 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundAboveWaistImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder2.imageName = this.fileToUpload.name;
      this.imageHolder2.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  blouseLengthImageUpload(images: FileList) {
    this.imageError2 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.blouseLengthImage = this.fileToUpload[0];
    this.blouseLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.blouseLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.blouseLengthImg = [];
    this.imageHolder3 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.blouseLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder3.imageName = this.fileToUpload.name;
      this.imageHolder3.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  frontNeckDepthImageUpload(images: FileList) {
    this.imageError3 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.frontNeckDepthImage = this.fileToUpload[0];
    this.frontNeckDepthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.frontNeckDepthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.frontNeckDepthImg = [];
    this.imageHolder4 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.frontNeckDepthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder4.imageName = this.fileToUpload.name;
      this.imageHolder4.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  backNeckDepthImageUpload(images: FileList) {
    this.imageError4 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.backNeckDepthImage = this.fileToUpload[0];
    this.backNeckDepthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.backNeckDepthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.backNeckDepthImg = [];
    this.imageHolder5 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.backNeckDepthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder5.imageName = this.fileToUpload.name;
      this.imageHolder5.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  sleeveLengthImageUpload(images: FileList) {
    this.imageError5 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.sleeveLengthImage = this.fileToUpload[0];
    this.sleeveLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.sleeveLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.sleeveLengthImg = [];
    this.imageHolder6 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.sleeveLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder6.imageName = this.fileToUpload.name;
      this.imageHolder6.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundArmImageUpload(images: FileList) {
    this.imageError6 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.aroundArmImage = this.fileToUpload[0];
    this.aroundArmImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundArmImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */

    this.fileToUpload = images[0];
    this.aroundArmImg = [];
    this.imageHolder7 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundArmImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder7.imageName = this.fileToUpload.name;
      this.imageHolder7.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  saveMeasurement() {
    const measurementModel = new Measurement();
    measurementModel.measurementName = this.measurementForm.controls.measurementName.value;
    measurementModel.measurementType = this.measurementForm.controls.measurementType.value;
    measurementModel.closingSide = this.measurementForm.controls.closingSide.value.map(e => e.closingSide);
    measurementModel.closingWith = this.measurementForm.controls.closingWith.value.map(e => e.closingWith);
    measurementModel.lining = this.measurementForm.controls.lining.value.map(e => e.lining);
    measurementModel.superCategoryId = this.measurementForm.controls.superCategoryId.value;
    measurementModel.mainCategoryId = this.measurementForm.controls.mainCategoryId.value;
    measurementModel.subCategoryId = this.measurementForm.controls.subCategoryId.value;
    measurementModel.price = this.measurementForm.controls.amount.value;
    measurementModel.discount = this.measurementForm.controls.discount.value;
    const aroundBust = new MeasurementValue();
    aroundBust.min = this.measurementForm.controls.aroundBustMin.value;
    aroundBust.max = this.measurementForm.controls.aroundBustMax.value;
    aroundBust.description = this.measurementForm.controls.aroundBustDescription.value;
    const aroundAboveWaist = new MeasurementValue();
    aroundAboveWaist.min = this.measurementForm.controls.aroundAboveWaistMin.value;
    aroundAboveWaist.max = this.measurementForm.controls.aroundAboveWaistMax.value;
    aroundAboveWaist.description = this.measurementForm.controls.aroundAboveWaistDescription.value;
    const blouseLength = new MeasurementValue();
    blouseLength.min = this.measurementForm.controls.blouseLengthMin.value;
    blouseLength.max = this.measurementForm.controls.blouseLengthMax.value;
    blouseLength.description = this.measurementForm.controls.blouseLengthDescription.value;
    const frontNeckDepth = new MeasurementValue();
    frontNeckDepth.min = this.measurementForm.controls.frontNeckDepthMin.value;
    frontNeckDepth.max = this.measurementForm.controls.frontNeckDepthMax.value;
    frontNeckDepth.description = this.measurementForm.controls.frontNeckDepthDescription.value;
    const backNeckDepth = new MeasurementValue();
    backNeckDepth.min = this.measurementForm.controls.backNeckDepthMin.value;
    backNeckDepth.max = this.measurementForm.controls.backNeckDepthMax.value;
    backNeckDepth.description = this.measurementForm.controls.backNeckDepthDescription.value;
    const sleeveLength = new MeasurementValue();
    sleeveLength.min = this.measurementForm.controls.sleeveLengthMin.value;
    sleeveLength.max = this.measurementForm.controls.sleeveLengthMax.value;
    sleeveLength.description = this.measurementForm.controls.sleeveLengthDescription.value;
    const aroundArm = new MeasurementValue();
    aroundArm.min = this.measurementForm.controls.aroundArmMin.value;
    aroundArm.max = this.measurementForm.controls.aroundBustMax.value;
    aroundArm.description = this.measurementForm.controls.aroundBustDescription.value;
    measurementModel.aroundBust = [aroundBust];
    measurementModel.aroundAboveWaist = [aroundAboveWaist];
    measurementModel.blouseLength = [blouseLength];
    measurementModel.frontNeckDepth = [frontNeckDepth];
    measurementModel.backNeckDepth = [backNeckDepth];
    measurementModel.sleeveLength = [sleeveLength];
    measurementModel.aroundArm = [aroundArm];
    /* console.log(measurementModel); */
    this.productService.createMeasurement(measurementModel).subscribe(data => {
      console.log(data);
      this.uploadAroundBustImage(data._id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundBustImage(id) {
    if (this.imageHolder1.imageName !== undefined && this.imageHolder1.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundBustImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder1, id).subscribe(data => {
        this.updateAroundBustImageName(this.imageHolder1.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundAboveWaistImage(id);
    }
  }
  updateAroundBustImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addAroundBustImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundAboveWaistImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundAboveWaistImage(id) {
    if (this.imageHolder2.imageName !== undefined && this.imageHolder2.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundAboveWaistImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder2, id).subscribe(data => {
        this.updateAroundAboveWaiseImageName(this.imageHolder2.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadBlouseLengthImage(id);
    }
  }
  updateAroundAboveWaiseImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addAroundAboveWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadBlouseLengthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadBlouseLengthImage(id) {
    if (this.imageHolder3.imageName !== undefined && this.imageHolder3.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.blouseLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, id).subscribe(data => {
        this.updateBlouseLengthImageName(this.imageHolder3.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadFrontNeckDepthImage(id);
    }
  }
  updateBlouseLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addBlouseLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadFrontNeckDepthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadFrontNeckDepthImage(id) {
    if (this.imageHolder4.imageName !== undefined && this.imageHolder4.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.frontNeckDepthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder4, id).subscribe(data => {
        this.updateFrontNeckDepthImageName(this.imageHolder4.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadBackNeckDepthImage(id);
    }
  }
  updateFrontNeckDepthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addFrontNeckDepthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadBackNeckDepthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadBackNeckDepthImage(id) {
    if (this.imageHolder5.imageName !== undefined && this.imageHolder5.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.backNeckDepthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder5, id).subscribe(data => {
        this.updateBackNeckDepthImageName(this.imageHolder5.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadSleeveLengthImage(id);
    }
  }
  updateBackNeckDepthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addBackNeckDepthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadSleeveLengthImage(id);
    }, error => {
      console.log(error);
    });
  }

  uploadSleeveLengthImage(id) {
    if (this.imageHolder6.imageName !== undefined && this.imageHolder6.imageName !== null) {
     /*  const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.sleeveLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder6, id).subscribe(data => {
        this.updateSleeveLengthImageName(this.imageHolder6.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundArmImage(id);
    }
  }
  updateSleeveLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addSleeveLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundArmImage(id);
    }, error => {
      console.log(error);
    });
  }

  uploadAroundArmImage(id) {
    if (this.imageHolder7.imageName !== undefined && this.imageHolder7.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundArmImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder7, id).subscribe(data => {
        this.updateAroundArmImageName(this.imageHolder7.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['product/addMeasurementStyle/', id]);
      console.log('finish');
    }
  }
  updateAroundArmImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addAroundArmImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.router.navigate(['product/addMeasurementStyle/', id]);
      console.log('finish');
    }, error => {
      console.log(error);
    });
  }

  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.productService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  /* selectMainCategory(id) {
    this.selectedMainCategory = id;
  } */
  selectMainCategory(mainId) {
    this.mainCategoryName = mainId.mainCategoryName;
    this.selectedMainCategory = mainId._id;
    this.productService.getSubCategory(this.headerCatSelectedData, mainId).subscribe(data => {
      console.log('sub', data);
      this.subCategoryModel = data.subCategory;
    }, error => {
      console.log(error);
    });
  }
}
