import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MeasurementImage } from './measurementImage.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';
import { LehengaMeasurement } from '../../../../shared/model/lehengaMeasurement.model';
import { LehengaMeasure } from '../../../../shared/model/lehengaMeasure.model';
import { CholiMeasurement } from '../../../../shared/model/choliMeasurement..model';


@Component({
  selector: 'app-create-lehenga-measurement',
  templateUrl: './create-lehenga-measurement.component.html',
  styleUrls: ['./create-lehenga-measurement.component.css']
})
export class CreateLehengaMeasurementComponent implements OnInit {
  superCategoryModel: any;
  measurementForm: FormGroup;
  imageError: boolean;
  fileToUpload: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  aroundBustImg: any[];
  reader: FileReader;
  imageError1: boolean;
  aroundAboveWaistImg: any[];
  choliLengthImg: any[];
  imageError2: boolean;
  imageError3: boolean;
  aroundWaistImg: any[];
  imageError4: boolean;
  aroundHipImg: any[];
  imageError5: boolean;
  lehengaLengthImg: any[];
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
      choliLengthMin: [''],
      choliLengthMax: [''],
      choliLengthDescription: [''],
      aroundWaistMin: [''],
      aroundWaistMax: [''],
      aroundWaistDescription: [''],
      aroundHipMin: [''],
      aroundHipMax: [''],
      aroundHipDescription: [''],
      lehengaLengthMin: [''],
      lehengaLengthMax: [''],
      lehengaLengthDescription: [''],
      choliClosingSide: this.fb.array([]),
      choliClosingWith: this.fb.array([]),
      lining: this.fb.array([]),
      lehengaClosingSide: this.fb.array([]),
      lehengaClosingWith: this.fb.array([])
    });
  }
  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
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
  addCholiClosingSideForm() {
    const choliClosingSide = this.fb.group({
      choliClosingSide: ['']
    });
    this.choliClosingSideForms.push(choliClosingSide);
  }
  get choliClosingSideForms() {
    return this.measurementForm.get('choliClosingSide') as FormArray;
  }
  deleteCholiClosingSide(i) {
    this.choliClosingSideForms.removeAt(i);
  }
  addCholiClosingWithForm() {
    const choliClosingWith = this.fb.group({
      choliClosingWith: ['']
    });
    this.choliClosingWithForms.push(choliClosingWith);
  }
  get choliClosingWithForms() {
    return this.measurementForm.get('choliClosingWith') as FormArray;
  }
  deleteCholiClosingWith(i) {
    this.choliClosingWithForms.removeAt(i);
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
  addLehengaClosingWithForm() {
    const lehengaClosingWith = this.fb.group({
      lehengaClosingWith: ['']
    });
    this.lehengaClosingWithForms.push(lehengaClosingWith);
  }
  get lehengaClosingWithForms() {
    return this.measurementForm.get('lehengaClosingWith') as FormArray;
  }
  deleteLehengaClosingWith(i) {
    this.lehengaClosingWithForms.removeAt(i);
  }
  addClosingSideForm() {
    const lehengaClosingSide = this.fb.group({
      lehengaClosingSide: ['']
    });
    this.lehengaClosingSideForms.push(lehengaClosingSide);
  }
  get lehengaClosingSideForms() {
    return this.measurementForm.get('lehengaClosingSide') as FormArray;
  }
  deleteClosingSide(i) {
    this.lehengaClosingSideForms.removeAt(i);
  }
  aroundBustImageUpload(images: any) {
    this.imageError = false;
    /* this.fileToUpload = images;
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
  aroundAboveWaistImageUpload(images: any) {
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
  choliLengthImageUpload(images: any) {
    this.imageError2 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.choliLengthImage = this.fileToUpload[0];
    this.choliLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.choliLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.choliLengthImg = [];
    this.imageHolder3 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.choliLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder3.imageName = this.fileToUpload.name;
      this.imageHolder3.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundWaistImageUpload(images: any) {
    this.imageError3 = false;
   /*  this.fileToUpload = images;
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
    this.imageHolder4 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundWaistImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder4.imageName = this.fileToUpload.name;
      this.imageHolder4.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  aroundHipImageUpload(images: any) {
    this.imageError4 = false;
   /*  this.fileToUpload = images;
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
    this.imageHolder5 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.aroundHipImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder5.imageName = this.fileToUpload.name;
      this.imageHolder5.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  lehengaLengthImageUpload(images: any) {
    this.imageError5 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.lehengaLengthImage = this.fileToUpload[0];
    this.lehengaLengthImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.lehengaLengthImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.lehengaLengthImg = [];
    this.imageHolder6 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.lehengaLengthImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder6.imageName = this.fileToUpload.name;
      this.imageHolder6.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  onSubmit() {
    const measurementModel = new LehengaMeasurement();
    measurementModel.measurementName = this.measurementForm.controls.measurementName.value;
    measurementModel.measurementType = this.measurementForm.controls.measurementType.value;
    measurementModel.price = this.measurementForm.controls.amount.value;
    measurementModel.discount = this.measurementForm.controls.discount.value;
    measurementModel.superCategoryId = this.measurementForm.controls.superCategoryId.value;
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
    const choliLength = new MeasurementValue();
    choliLength.min = this.measurementForm.controls.choliLengthMin.value;
    choliLength.max = this.measurementForm.controls.choliLengthMax.value;
    choliLength.description = this.measurementForm.controls.choliLengthDescription.value;
    const choli = new CholiMeasurement();
    choli.choliClosingSide = this.measurementForm.controls.choliClosingSide.value.map(e => e.choliClosingSide);
    choli.choliClosingWith = this.measurementForm.controls.choliClosingWith.value.map(e => e.choliClosingWith);
    choli.lining = this.measurementForm.controls.lining.value.map(e => e.lining);
    choli.aroundBust = [aroundBust];
    choli.aroundAboveWaist = [aroundAboveWaist];
    choli.choliLength = [choliLength];
    const aroundWaist = new MeasurementValue();
    aroundWaist.min = this.measurementForm.controls.aroundWaistMin.value;
    aroundWaist.max = this.measurementForm.controls.aroundWaistMax.value;
    aroundWaist.description = this.measurementForm.controls.aroundWaistDescription.value;
    const lehengaLength = new MeasurementValue();
    lehengaLength.min = this.measurementForm.controls.lehengaLengthMin.value;
    lehengaLength.max = this.measurementForm.controls.lehengaLengthMax.value;
    lehengaLength.description = this.measurementForm.controls.lehengaLengthDescription.value;
    const lehengaMeasure = new LehengaMeasure();
    lehengaMeasure.lehengaClosingSide = this.measurementForm.controls.lehengaClosingSide.value.map(e => e.lehengaClosingSide);
    lehengaMeasure.lehengaClosingWith = this.measurementForm.controls.lehengaClosingWith.value.map(e => e.lehengaClosingWith);
    lehengaMeasure.aroundWaist = [aroundWaist];
    lehengaMeasure.aroundHip = [aroundHip];
    lehengaMeasure.lehengaLength = [lehengaLength];
    measurementModel.choliMeasurement = [choli];
    measurementModel.lehengaMeasurement = [lehengaMeasure];
   /*  console.log(measurementModel); */
    this.productService.createLehengaMeasurement(measurementModel).subscribe(data => {
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
    this.productService.addLehengaAroundBustImageName(this.imageData, id).subscribe(data => {
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
      this.uploadCholiLengthImage(id);
    }
  }
  updateAroundAboveWaiseImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundAboveWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadCholiLengthImage(id);
    }, error => {
      console.log(error);
    });
  }

  uploadCholiLengthImage(id) {
    if (this.imageHolder3.imageName !== undefined && this.imageHolder3.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.choliLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, id).subscribe(data => {
        this.updateCholiLengthImageName(this.imageHolder3.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundWaistImage(id);
    }
  }
  updateCholiLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaColiLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundWaistImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundWaistImage(id) {
    if (this.imageHolder4.imageName !== undefined && this.imageHolder4.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundwaistImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder4, id).subscribe(data => {
        this.updateAroundWaistImageName(this.imageHolder4.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadAroundHipImage(id);
    }
  }
  updateAroundWaistImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadAroundHipImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadAroundHipImage(id) {
    if (this.imageHolder5.imageName !== undefined && this.imageHolder5.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundHipImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder5, id).subscribe(data => {
        this.updateAroundHipImageName(this.imageHolder5.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.uploadLehengaLengthImage(id);
    }
  }
  updateAroundHipImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundHipImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.uploadLehengaLengthImage(id);
    }, error => {
      console.log(error);
    });
  }
  uploadLehengaLengthImage(id) {
    if (this.imageHolder6.imageName !== undefined && this.imageHolder6.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.lehengaLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder6, id).subscribe(data => {
        this.updateLehengaLengthImageName(this.imageHolder6.imageName, id);
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['product/viewlehengameasurement']);
    }
  }
  updateLehengaLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaLengthImageName(this.imageData, id).subscribe(data => {
      this.router.navigate(['product/viewlehengameasurement']);
    }, error => {
      console.log(error);
    });
  }
}
