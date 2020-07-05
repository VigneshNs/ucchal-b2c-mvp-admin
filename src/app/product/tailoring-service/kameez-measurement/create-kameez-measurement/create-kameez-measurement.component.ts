import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MeasurementImage } from './measurementImage.model';
import { KameezMeasure } from '../../../../shared/model/kameezMeas.model';
import { KameezMeasurement } from '../../../../shared/model/kameezMeasurement.model';
import { BottomMeasurement } from '../../../../shared/model/bottomMeasurement.model';
import { MeasurementStyle } from '../../../../shared/model/measurementStyle.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-kameez-measurement',
  templateUrl: './create-kameez-measurement.component.html',
  styleUrls: ['./create-kameez-measurement.component.css']
})
export class CreateKameezMeasurementComponent implements OnInit {
  superCategoryModel: any;
  measurementForm: FormGroup;
  imageError: boolean;
  fileToUpload: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  aroundBustImg: any[];
  reader: FileReader;
  imageError1: boolean;
  aroundAboveWaistImg: any[];
  aroundHipImg: any[];
  imageError2: boolean;
  imageError3: boolean;
  kameezLengthImg: any[];
  imageError4: boolean;
  frontNeckDepthImg: any[];
  backNeckDepthImg: any[];
  imageError5: boolean;
  sleeveLengthImg: any[];
  imageError6: boolean;
  aroundArmImg: any[];
  imageError7: boolean;
  imageError8: boolean;
  aroundWaistImg: any[];
  imageError9: boolean;
  aroundThighImg: any[];
  aroundKneeImg: any[];
  imageError10: boolean;
  aroundCalfImg: any[];
  imageError11: boolean;
  aroundBottomImg: any[];
  imageError12: boolean;
  bottomLengthImg: any[];
  imageError13: boolean;
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
  imageHolder8: MeasurementImage;
  imageHolder9: MeasurementImage;
  imageHolder10: MeasurementImage;
  imageHolder11: MeasurementImage;
  imageHolder12: MeasurementImage;
  imageHolder13: MeasurementImage;
  imageHolder14: MeasurementImage;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.showSuperCategory();
   }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.measurementForm = this.fb.group({
      superCategoryId: [''],
      measurementName: [''],
      amount: [''],
      discount: [''],
      measurementType: this.fb.array([]),
      aroundBustMin: [''],
      aroundBustMax: [''],
      aroundBustDescription: [''],
      aroundAboveWaistMin: [''],
      aroundAboveWaistMax: [''],
      aroundAboveWaistDescription: [''],
      aroundHipMin: [''],
      aroundHipMax: [''],
      aroundHipDescription: [''],
      kameezLengthMin: [''],
      kameezLengthMax: [''],
      kameezLengthDescription: [''],
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
      fitOption: this.fb.array([]),
      aroundWaistMin: [''],
      aroundWaistMax: [''],
      aroundWaistDescription: [''],
      aroundThighMin: [''],
      aroundThighMax: [''],
      aroundThighDescription: [''],
      aroundKneeMin: [''],
      aroundKneeMax: [''],
      aroundKneeDescription: [''],
      aroundCalfMin: [''],
      aroundCalfMax: [''],
      aroundCalfDescription: [''],
      aroundBottomMin: [''],
      aroundBottomMax: [''],
      aroundBottomDescription: [''],
      bottomLengthMin: [''],
      bottomLengthMax: [''],
      bottomLengthDescription: [''],
      waistClosingSide: this.fb.array([]),
      waistClosingWith: this.fb.array([])
    });
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
  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
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
    /* this.fileToUpload = images;
    this.imageUploadStore.aroundAboveWaistImage = this.fileToUpload[0];
    this.aroundAboveWaistImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundAboveWaistImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
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
  aroundHipImageUpload(images: FileList) {
    this.imageError2 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.aroundHipImage = this.fileToUpload[0];
    this.aroundHipImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundHipImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundHipImg = [];
    this.imageHolder3 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundHipImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder3.imageName = this.fileToUpload.name;
      this.imageHolder3.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  kameezLengthImageUpload(images: FileList) {
    this.imageError3 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.kameezLengthImage = this.fileToUpload[0];
    this.kameezLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.kameezLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.kameezLengthImg = [];
    this.imageHolder4 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.kameezLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder4.imageName = this.fileToUpload.name;
      this.imageHolder4.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  frontNeckDepthImageUpload(images: FileList) {
    this.imageError4 = false;
   /*  this.fileToUpload = images;
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
    this.imageHolder5 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.frontNeckDepthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder5.imageName = this.fileToUpload.name;
      this.imageHolder5.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  backNeckDepthImageUpload(images: FileList) {
    this.imageError5 = false;
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
    this.imageHolder6 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.backNeckDepthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder6.imageName = this.fileToUpload.name;
      this.imageHolder6.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  sleeveLengthImageUpload(images: FileList) {
    this.imageError6 = false;
    /* this.fileToUpload = images;
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
    this.imageHolder7 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.sleeveLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder7.imageName = this.fileToUpload.name;
      this.imageHolder7.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundArmImageUpload(images: FileList) {
    this.imageError7 = false;
    /* this.fileToUpload = images;
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
    this.imageHolder8 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundArmImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder8.imageName = this.fileToUpload.name;
      this.imageHolder8.uploadedImage = this.check;
      this.showImage = this.check;
    };
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
  addFitOptionForm() {
    const fitOption = this.fb.group({
      fitOption: ['']
    });
    this.fitOptionForms.push(fitOption);
  }
  get fitOptionForms() {
    return this.measurementForm.get('fitOption') as FormArray;
  }
  deleteFitOption(i) {
    this.fitOptionForms.removeAt(i);
  }
  aroundWaistImageUpload(images: FileList) {
    this.imageError8 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.aroundwaistImage = this.fileToUpload[0];
    this.aroundWaistImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundWaistImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundWaistImg = [];
    this.imageHolder9 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundWaistImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder9.imageName = this.fileToUpload.name;
      this.imageHolder9.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundThighImageUpload(images: FileList) {
    this.imageError9 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.aroundThighImage = this.fileToUpload[0];
    this.aroundThighImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundThighImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundThighImg = [];
    this.imageHolder10 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundThighImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder10.imageName = this.fileToUpload.name;
      this.imageHolder10.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundKneeImageUpload(images: FileList) {
    this.imageError10 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.aroundKneeImage = this.fileToUpload[0];
    this.aroundKneeImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundKneeImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundKneeImg = [];
    this.imageHolder11 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundKneeImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder11.imageName = this.fileToUpload.name;
      this.imageHolder11.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundCalfImageUpload(images: FileList) {
    this.imageError11 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.aroundCalfImage = this.fileToUpload[0];
    this.aroundCalfImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundCalfImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundCalfImg = [];
    this.imageHolder12 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundCalfImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder12.imageName = this.fileToUpload.name;
      this.imageHolder12.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundBottomImageUpload(images: FileList) {
    this.imageError12 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.aroundBottomImage = this.fileToUpload[0];
    this.aroundBottomImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.aroundBottomImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.aroundBottomImg = [];
    this.imageHolder13 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundBottomImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder13.imageName = this.fileToUpload.name;
      this.imageHolder13.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  bottomLengthImageUpload(images: FileList) {
    this.imageError13 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.bottomLengthImage = this.fileToUpload[0];
    this.bottomLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.bottomLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.bottomLengthImg = [];
    this.imageHolder14 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.bottomLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder14.imageName = this.fileToUpload.name;
      this.imageHolder14.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  addWaistClosingSideForm() {
    const waistClosingSide = this.fb.group({
      waistClosingSide: ['']
    });
    this.waistClosingSideForms.push(waistClosingSide);
  }
  get waistClosingSideForms() {
    return this.measurementForm.get('waistClosingSide') as FormArray;
  }
  deleteWaistClosingSide(i) {
    this.waistClosingSideForms.removeAt(i);
  }
  addWaistClosingWithForm() {
    const waistClosingWith = this.fb.group({
      waistClosingWith: ['']
    });
    this.waistClosingWithForms.push(waistClosingWith);
  }
  get waistClosingWithForms() {
    return this.measurementForm.get('waistClosingWith') as FormArray;
  }
  deleteWaistClosingWith(i) {
    this.waistClosingWithForms.removeAt(i);
  }
  /* setNewUser(superCategoryId) {

  } */
  onSubmit() {
    const measurementModel = new KameezMeasurement();
    measurementModel.measurementName = this.measurementForm.controls.measurementName.value;
    measurementModel.measurementType = this.measurementForm.controls.measurementType.value;
    measurementModel.price = this.measurementForm.controls.amount.value;
    measurementModel.discount = this.measurementForm.controls.discount.value;
    measurementModel.superCategoryId = this.measurementForm.controls.superCategoryId.value;
    /* measurementModel.closingSide = this.measurementForm.controls.closingSide.value.map(e => e.closingSide);
    measurementModel.closingWith = this.measurementForm.controls.closingWith.value.map(e => e.closingWith);
    measurementModel.lining = this.measurementForm.controls.lining.value.map(e => e.lining);
    
    measurementModel.mainCategoryId = this.measurementForm.controls.mainCategoryId.value;
    measurementModel.subCategoryId = this.measurementForm.controls.subCategoryId.value; */
    
    const aroundBust = new MeasurementValue();
    aroundBust.min = this.measurementForm.controls.aroundBustMin.value;
    aroundBust.max = this.measurementForm.controls.aroundBustMax.value;
    aroundBust.description = this.measurementForm.controls.aroundBustDescription.value;
    const aroundAboveWaist = new MeasurementValue();
    aroundAboveWaist.min = this.measurementForm.controls.aroundAboveWaistMin.value;
    aroundAboveWaist.max = this.measurementForm.controls.aroundAboveWaistMax.value;
    aroundAboveWaist.description = this.measurementForm.controls.aroundAboveWaistDescription.value;
    const aroundHip = new MeasurementValue();
    aroundHip.min = this.measurementForm.controls.aroundHipMin.value;
    aroundHip.max = this.measurementForm.controls.aroundHipMax.value;
    aroundHip.description = this.measurementForm.controls.aroundHipDescription.value;
    const kameezLength = new MeasurementValue();
    kameezLength.min = this.measurementForm.controls.kameezLengthMin.value;
    kameezLength.max = this.measurementForm.controls.kameezLengthMax.value;
    kameezLength.description = this.measurementForm.controls.kameezLengthDescription.value;
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
    const kameez = new KameezMeasure();
    kameez.kameezClosingSide = this.measurementForm.controls.closingSide.value.map(e => e.closingSide);
    kameez.kameezClosingWith = this.measurementForm.controls.closingWith.value.map(e => e.closingWith);
    kameez.aroundBust = [aroundBust];
    kameez.aroundHip = [aroundHip];
    kameez.aroundAboveWaist = [aroundAboveWaist];
    kameez.sleeveLength = [sleeveLength];
    kameez.frontNeckDepth = [frontNeckDepth];
    kameez.backNeckDepth = [backNeckDepth];
    kameez.sleeveLength = [sleeveLength];
    kameez.aroundArm = [aroundArm];
    kameez.kameezLength = [kameezLength];
    const aroundWaist = new MeasurementValue();
    aroundWaist.min = this.measurementForm.controls.aroundWaistMin.value;
    aroundWaist.max = this.measurementForm.controls.aroundWaistMax.value;
    aroundWaist.description = this.measurementForm.controls.aroundWaistDescription.value;
    const aroundThigh = new MeasurementValue();
    aroundThigh.min = this.measurementForm.controls.aroundThighMin.value;
    aroundThigh.max = this.measurementForm.controls.aroundThighMax.value;
    aroundThigh.description = this.measurementForm.controls.aroundThighDescription.value;
    const aroundKnee = new MeasurementValue();
    aroundKnee.min = this.measurementForm.controls.aroundKneeMin.value;
    aroundKnee.max = this.measurementForm.controls.aroundKneeMax.value;
    aroundKnee.description = this.measurementForm.controls.aroundKneeDescription.value;
    const aroundCalf = new MeasurementValue();
    aroundCalf.min = this.measurementForm.controls.aroundCalfMin.value;
    aroundCalf.max = this.measurementForm.controls.aroundCalfMax.value;
    aroundCalf.description = this.measurementForm.controls.aroundCalfDescription.value;
    const aroundBottom = new MeasurementValue();
    aroundBottom.min = this.measurementForm.controls.aroundBottomMin.value;
    aroundBottom.max = this.measurementForm.controls.aroundBottomMax.value;
    aroundBottom.description = this.measurementForm.controls.aroundBottomDescription.value;
    const bottomLength = new MeasurementValue();
    bottomLength.min = this.measurementForm.controls.bottomLengthMin.value;
    bottomLength.max = this.measurementForm.controls.bottomLengthMax.value;
    bottomLength.description = this.measurementForm.controls.bottomLengthDescription.value;
    const bottomMeasrement = new BottomMeasurement();
    bottomMeasrement.waistClosingSide = this.measurementForm.controls.waistClosingSide.value.map(e => e.waistClosingSide);
    bottomMeasrement.waistClosingWith = this.measurementForm.controls.waistClosingWith.value.map(e => e.waistClosingWith);
    bottomMeasrement.fitOption = this.measurementForm.controls.fitOption.value.map(e => e.fitOption);
    bottomMeasrement.aroundWaist = [aroundWaist];
    bottomMeasrement.aroundThigh = [aroundThigh];
    bottomMeasrement.aroundKnee = [aroundKnee];
    bottomMeasrement.aroundCalf = [aroundCalf];
    bottomMeasrement.aroundBottom = [aroundBottom];
    bottomMeasrement.bottomLength = [bottomLength];
    measurementModel.bottomMeasurement = [bottomMeasrement];
    measurementModel.kameezMeasurement = [kameez];
    console.log(measurementModel);
    this.productService.createKameezMeasurement(measurementModel).subscribe(data => {
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
    this.productService.addKameezAroundBustImageName(this.imageData, id).subscribe(data => {
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
      this.uploadAroundHipImage(id);
    }
  }
  updateAroundAboveWaiseImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundAboveWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundHipImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundHipImage(id) {
    if (this.imageHolder3.imageName !== undefined && this.imageHolder3.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundHipImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, id).subscribe(data => {
        this.updateAroundHipImageName(this.imageHolder3.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadKameezLengthImage(id);
    }
  }
  updateAroundHipImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundHipImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadKameezLengthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadKameezLengthImage(id) {
    if (this.imageHolder4.imageName !== undefined && this.imageHolder4.imageName !== null) {
     /*  const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.kameezLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder4, id).subscribe(data => {
        this.updateKameezLengthImageName(this.imageHolder4.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadFrontNeckDepthImage(id);
    }
  }
  updateKameezLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadFrontNeckDepthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadFrontNeckDepthImage(id) {
    if (this.imageHolder5.imageName !== undefined && this.imageHolder5.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.frontNeckDepthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder5, id).subscribe(data => {
        this.updateFrontNeckDepthImageName(this.imageHolder5.imageName, id);
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
    this.productService.addKameezFrontNeckDepthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadBackNeckDepthImage(id);
    }, error => {
      console.log(error);
    });
  }

  uploadBackNeckDepthImage(id) {
    if (this.imageHolder6.imageName !== undefined && this.imageHolder6.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.backNeckDepthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder6, id).subscribe(data => {
        this.updateBackNeckDepthImageName(this.imageHolder6.imageName, id);
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
    this.productService.addKameezBackNeckDepthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadSleeveLengthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadSleeveLengthImage(id) {
    if (this.imageHolder7.imageName !== undefined && this.imageHolder7.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.sleeveLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder7, id).subscribe(data => {
        this.updateSleeveLengthImageName(this.imageHolder7.imageName, id);
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
    this.productService.addKameezSleeveLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundArmImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundArmImage(id) {
    if (this.imageHolder8.imageName !== undefined && this.imageHolder8.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundArmImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder8, id).subscribe(data => {
        this.updateAroundArmImageName(this.imageHolder8.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundWaistImage(id);
    }
  }
  updateAroundArmImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundArmImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundWaistImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundWaistImage(id) {
    if (this.imageHolder9.imageName !== undefined && this.imageHolder9.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundwaistImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder9, id).subscribe(data => {
        this.updateAroundWaistImageName(this.imageHolder9.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundThighImage(id);
    }
  }
  updateAroundWaistImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundThighImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundThighImage(id) {
    if (this.imageHolder10.imageName !== undefined && this.imageHolder10.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundThighImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder10, id).subscribe(data => {
        this.updateAroundThighImageName(this.imageHolder10.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundKneeImage(id);
    }
  }
  updateAroundThighImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundThighImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundKneeImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundKneeImage(id) {
    if (this.imageHolder11.imageName !== undefined && this.imageHolder11.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundKneeImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder11, id).subscribe(data => {
        this.updateAroundKneeImageName(this.imageHolder11.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundCalfImage(id);
    }
  }
  updateAroundKneeImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundkneeImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundCalfImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundCalfImage(id) {
    if (this.imageHolder12.imageName !== undefined && this.imageHolder12.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundCalfImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder12, id).subscribe(data => {
        this.updateAroundCalfImageName(this.imageHolder12.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundBottomImage(id);
    }
  }
  updateAroundCalfImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundCalfImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundBottomImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundBottomImage(id) {
    if (this.imageHolder13.imageName !== undefined && this.imageHolder13.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundBottomImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder13, id).subscribe(data => {
        this.updateAroundBottomImageName(this.imageHolder13.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadBottomLengthImage(id);
    }
  }
  updateAroundBottomImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezAroundBottomImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadBottomLengthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadBottomLengthImage(id) {
    if (this.imageHolder14.imageName !== undefined && this.imageHolder14.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.bottomLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder14, id).subscribe(data => {
        this.updateBottomLengthImageName(this.imageHolder14.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['product/viewkameezmeasurement']);
      /* this.uploadAroundArmImage(id); */
    }
  }
  updateBottomLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezBottomLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
     /*  this.uploadAroundArmImage(id); */
      this.router.navigate(['product/viewkameezmeasurement']);
    }, error => {
      console.log(error);
    });
  }
}
