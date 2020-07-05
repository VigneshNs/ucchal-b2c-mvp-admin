import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MeasurementImage } from '../create-lehenga-measurement/measurementImage.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';
import { LehengaMeasurement } from '../../../../shared/model/lehengaMeasurement.model';
import { LehengaMeasure } from '../../../../shared/model/lehengaMeasure.model';
import { CholiMeasurement } from '../../../../shared/model/choliMeasurement..model';
import { AppSetting } from '../../../../config/appSetting';

@Component({
  selector: 'app-edit-lehenga-measurement',
  templateUrl: './edit-lehenga-measurement.component.html',
  styleUrls: ['./edit-lehenga-measurement.component.css']
})
export class EditLehengaMeasurementComponent implements OnInit {
  superCategoryModel: any;
  measurementForm: FormGroup;
  imageError: boolean;
  fileToUpload: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  measurementImageUrl: string;
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
  editAroundBustImg = false;
  editAroundAboveWaistImg = false;
  editCholiLengthImg = false;
  editAroundWaistImg = false;
  editLehengaLengthImg = false;
  editAroundHipImg = false;
  lehengaLengthImg: any[];
  imageData = {
    imageName: String
  };
  id: string;
  holder: any;
  imageHolder1: MeasurementImage;
  check;
  showImage;
  imageHolder2: MeasurementImage;
  imageHolder3: MeasurementImage;
  imageHolder4: MeasurementImage;
  imageHolder5: MeasurementImage;
  imageHolder6: MeasurementImage;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.measurementImageUrl = AppSetting.measurementImageUrl;
    this.getSingleMeasurement();
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
  getSingleMeasurement() {
    this.productService.getSingleLehengaMeasurement(this.id).subscribe(data => {
      this.holder = data;
      this.addMeasurementTypeForm();
      this.addCholiClosingSideFormValue();
      this.addCholiClosingWithFormValue();
      this.addLiningFormValue();
      this.addLehengaClosingSideFormValue();
      this.addLehengaClosingWithFormValue();
    }, error => {
      console.log(error);
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
  addMeasurementTypeForm() {
    for (let i = 0; i <= this.holder.measurementType.length - 1; i++) {
      const measurementType = this.fb.group({
        typeName: [this.holder.measurementType[i].typeName],
        typeDescription: [this.holder.measurementType[i].typeDescription]
      });
      this.typeForms.push(measurementType);
    }
  }
  addCholiClosingSideFormValue() {
    for (let i = 0; i <= this.holder.choliMeasurement[0].choliClosingSide.length - 1; i++) {
      const choliClosingSide = this.fb.group({
        choliClosingSide: [this.holder.choliMeasurement[0].choliClosingSide[i]],
      });
      this.choliClosingSideForms.push(choliClosingSide);
    }
  }
  addCholiClosingWithFormValue() {
    for (let i = 0; i <= this.holder.choliMeasurement[0].choliClosingWith.length - 1; i++) {
      const choliClosingWith = this.fb.group({
        choliClosingWith: [this.holder.choliMeasurement[0].choliClosingWith[i]],
      });
      this.choliClosingWithForms.push(choliClosingWith);
    }
  }
  addLiningFormValue() {
    for (let i = 0; i <= this.holder.choliMeasurement[0].lining.length - 1; i++) {
      const lining = this.fb.group({
        lining: [this.holder.choliMeasurement[0].lining[i]],
      });
      this.liningForms.push(lining);
    }
  }
  addLehengaClosingSideFormValue() {
    for (let i = 0; i <= this.holder.lehengaMeasurement[0].lehengaClosingSide.length - 1; i++) {
      const lehengaClosingSide = this.fb.group({
        lehengaClosingSide: [this.holder.lehengaMeasurement[0].lehengaClosingSide[i]],
      });
      this.lehengaClosingSideForms.push(lehengaClosingSide);
    }
  }
  addLehengaClosingWithFormValue() {
    for (let i = 0; i <= this.holder.lehengaMeasurement[0].lehengaClosingWith.length - 1; i++) {
      const lehengaClosingWith = this.fb.group({
        lehengaClosingWith: [this.holder.lehengaMeasurement[0].lehengaClosingWith[i]],
      });
      this.lehengaClosingWithForms.push(lehengaClosingWith);
    }
  }
  editAroundBust() {
    this.editAroundBustImg = true;
  }
  editAroundAboveWaist() {
    this.editAroundAboveWaistImg = true;
  }
  editCholiLength() {
    this.editCholiLengthImg = true;
  }
  editAroundWaist() {
    this.editAroundWaistImg = true;
  }
  editAroundHip() {
    this.editAroundHipImg = true;
  }
  editLehengaLength() {
    this.editLehengaLengthImg = true;
  }
  cancelImage() {
    this.editAroundBustImg = false;
    this.editAroundAboveWaistImg = false;
    this.editAroundHipImg = false;
    this.editLehengaLengthImg = false;
    this.editCholiLengthImg = false;
    this.editAroundWaistImg = false;
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
  saveAroundBustImage() {
    if (this.imageHolder1.imageName !== undefined && this.imageHolder1.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundBustImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder1, this.id).subscribe(data => {
        this.updateAroundBustImageName(this.imageHolder1.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateAroundBustImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundBustImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.holder = data;
      this.editAroundBustImg = false;
    }, error => {
      console.log(error);
    });
  }
  saveAroundAboveWaistImage() {
    if (this.imageHolder2.imageName !== undefined && this.imageHolder2.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundAboveWaistImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder2, this.id).subscribe(data => {
        this.updateAroundAboveWaiseImageName(this.imageHolder2.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateAroundAboveWaiseImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundAboveWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.holder = data;
      this.editAroundAboveWaistImg = false;
    }, error => {
      console.log(error);
    });
  }

  saveCholiLengthImage() {
    if (this.imageHolder3.imageName !== undefined && this.imageHolder3.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.choliLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, this.id).subscribe(data => {
        this.updateCholiLengthImageName(this.imageHolder3.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateCholiLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    console.log('check',this.imageData);
    this.productService.addLehengaColiLengthImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.holder = data;
      this.editCholiLengthImg = false;
    }, error => {
      console.log(error);
    });
  }
  saveAroundWaistImage() {
    if (this.imageHolder4.imageName !== undefined && this.imageHolder4.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundwaistImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder4, this.id).subscribe(data => {
        this.updateAroundWaistImageName(this.imageHolder4.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateAroundWaistImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundWaistImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.holder = data;
      this.editAroundWaistImg = false;
    }, error => {
      console.log(error);
    });
  }
  saveAroundHipImage() {
    if (this.imageHolder5.imageName !== undefined && this.imageHolder5.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.aroundHipImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder5, this.id).subscribe(data => {
        this.updateAroundHipImageName(this.imageHolder5.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateAroundHipImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaAroundHipImageName(this.imageData, id).subscribe(data => {
      console.log(data);
      this.holder = data;
      this.editAroundHipImg = false;
    }, error => {
      console.log(error);
    });
  }
  saveLehengaLengthImage() {
    if (this.imageHolder6.imageName !== undefined && this.imageHolder6.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.lehengaLengthImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder6, this.id).subscribe(data => {
        this.updateLehengaLengthImageName(this.imageHolder6.imageName, this.id);
      }, error => {
        console.log(error);
      });
    }
  }
  updateLehengaLengthImageName(name, id) {
    this.imageData = {
      imageName: name
    };
    this.productService.addLehengaLengthImageName(this.imageData, id).subscribe(data => {
      this.holder = data;
      this.editLehengaLengthImg = false;
    }, error => {
      console.log(error);
    });
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
    aroundBust.imageName = this.holder.choliMeasurement[0].aroundBust[0].imageName;
    const aroundAboveWaist = new MeasurementValue();
    aroundAboveWaist.min = this.measurementForm.controls.aroundAboveWaistMin.value;
    aroundAboveWaist.max = this.measurementForm.controls.aroundAboveWaistMax.value;
    aroundAboveWaist.description = this.measurementForm.controls.aroundAboveWaistDescription.value;
    aroundAboveWaist.imageName = this.holder.choliMeasurement[0].aroundAboveWaist[0].imageName;
    const aroundHip = new MeasurementValue();
    aroundHip.min = this.measurementForm.controls.aroundHipMin.value;
    aroundHip.max = this.measurementForm.controls.aroundHipMax.value;
    aroundHip.description = this.measurementForm.controls.aroundHipDescription.value;
    aroundHip.imageName = this.holder.lehengaMeasurement[0].aroundHip[0].imageName;
    const choliLength = new MeasurementValue();
    choliLength.min = this.measurementForm.controls.choliLengthMin.value;
    choliLength.max = this.measurementForm.controls.choliLengthMax.value;
    choliLength.description = this.measurementForm.controls.choliLengthDescription.value;
    choliLength.imageName = this.holder.choliMeasurement[0].choliLength[0].imageName;
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
    aroundWaist.imageName = this.holder.lehengaMeasurement[0].aroundWaist[0].imageName;
    const lehengaLength = new MeasurementValue();
    lehengaLength.min = this.measurementForm.controls.lehengaLengthMin.value;
    lehengaLength.max = this.measurementForm.controls.lehengaLengthMax.value;
    lehengaLength.description = this.measurementForm.controls.lehengaLengthDescription.value;
    lehengaLength.imageName = this.holder.lehengaMeasurement[0].lehengaLength[0].imageName;
    const lehengaMeasure = new LehengaMeasure();
    lehengaMeasure.lehengaClosingSide = this.measurementForm.controls.lehengaClosingSide.value.map(e => e.lehengaClosingSide);
    lehengaMeasure.lehengaClosingWith = this.measurementForm.controls.lehengaClosingWith.value.map(e => e.lehengaClosingWith);
    lehengaMeasure.aroundWaist = [aroundWaist];
    lehengaMeasure.aroundHip = [aroundHip];
    lehengaMeasure.lehengaLength = [lehengaLength];
    measurementModel.choliMeasurement = [choli];
    measurementModel.lehengaMeasurement = [lehengaMeasure];
   /*  console.log(measurementModel); */
    this.productService.updateLehengaMeasurement(measurementModel, this.id).subscribe(data => {
      console.log(data);
      this.router.navigate(['product/viewlehengameasurement']);
    }, error => {
      console.log(error);
    });
  }
}
