import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from '../../../product.service';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../../../config/appSetting';
import { MeasurementImage } from '../add-measurement/measurementImage.model';
import { Measurement } from '../../../../shared/model/measurement.model';
import { MeasurementStyle } from '../../../../shared/model/measurementStyle.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';

@Component({
  selector: 'app-add-measurement-style',
  templateUrl: './add-measurement-style.component.html',
  styleUrls: ['./add-measurement-style.component.css']
})
export class AddMeasurementStyleComponent implements OnInit {
  @ViewChild('backTitle',{static:false}) b;
  @ViewChild('frontTitle',{static:false}) f;
  @ViewChild('frontTitle',{static:false}) f1;
  @ViewChild('img1',{static:false}) i1;
  @ViewChild('img2',{static:false}) i2;
  @ViewChild('img3',{static:false}) i3;
  
  id: string;
  holder: any;
  measurementImageUrl;
  imageError1: boolean;
  fileToUpload: any;
  frontStyleImg: any[];
  reader: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  imageData = {
    imageName: String
  };
  imageError2: boolean;
  backStyleImg: any[];
  sleeveStyleImg: any[];
  imageError3: boolean;
  imageHolder1: MeasurementImage;
  check;
  showImage;
  imageHolder2: MeasurementImage;
  imageHolder3: MeasurementImage;
  message = 'Customer Added This Style';
  action: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService, private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getMeasurement();
    this.measurementImageUrl = AppSetting.measurementImageUrl;
   }

  ngOnInit() {
  }
  
  getMeasurement() {
    this.productService.getSingleMeasurement(this.id).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  frontNeckStyleImageUpload(images: FileList) {
    this.imageError1 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.frontNeckStyleImage = this.fileToUpload[0];
    this.frontStyleImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.frontStyleImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.frontStyleImg = [];
    this.imageHolder1 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.frontStyleImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder1.imageName = this.fileToUpload.name;
      this.imageHolder1.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  addFront(title) {
    const holder = new Measurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.frontNeckStyle = [subHolder];
    this.productService.addFrontStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.frontNeckStyle.length - 1;
      const id = data.frontNeckStyle[length]._id;
      this.uploadFrontStyleImage(id);
      this.f.nativeElement.value = "";
      this.i1.nativeElement.src = "";
    }, error => {
      console.log(error);
    });
  }
  uploadFrontStyleImage(styleId) {
    if (this.imageHolder1.imageName !== undefined && this.imageHolder1.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.frontNeckStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder1, this.id).subscribe(data => {
        this.updateFrontStyleImageName(this.imageHolder1.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getMeasurement();
    }
  }
  updateFrontStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addFrontStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addBack(title) {
    const holder = new Measurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.backNeckStyle = [subHolder];
    this.productService.addBackStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.backNeckStyle.length - 1;
      const id = data.backNeckStyle[length]._id;
      this.uploadBackStyleImage(id);
      this.b.nativeElement.value = "";
      this.i2.nativeElement.src = "";
    }, error => {
      console.log(error);
    });
  }
  backNeckStyleImageUpload(images: FileList) {
    this.imageError2 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.backNeckStyleImage = this.fileToUpload[0];
    this.backStyleImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.backStyleImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.backStyleImg = [];
    this.imageHolder2 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.backStyleImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder2.imageName = this.fileToUpload.name;
      this.imageHolder2.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  uploadBackStyleImage(styleId) {
    if (this.imageHolder2.imageName !== undefined && this.imageHolder2.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.backNeckStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder2, this.id).subscribe(data => {
        this.updateBackStyleImageName(this.imageHolder2.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getMeasurement();
    }
  }
  updateBackStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addBackStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }

  addSleeve(title) {
    const holder = new Measurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.sleeveStyle = [subHolder];
    this.productService.addSleeveStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.sleeveStyle.length - 1;
      const id = data.sleeveStyle[length]._id;
      this.uploadSleeveStyleImage(id);
      this.f1.nativeElement.value = "";
      this.i3.nativeElement.src = "";
    }, error => {
      console.log(error);
    });
  }
  sleeveStyleImageUpload(images: any) {
    this.imageError3 = false;
   /*  this.fileToUpload = images;
    this.imageUploadStore.sleeveNeckStyleImage = this.fileToUpload[0];
    this.sleeveStyleImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.sleeveStyleImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.sleeveStyleImg = [];
    this.imageHolder3 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.sleeveStyleImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder3.imageName = this.fileToUpload.name;
      this.imageHolder3.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  uploadSleeveStyleImage(styleId) {
    if (this.imageHolder3.imageName !== undefined && this.imageHolder3.imageName !== null) {
     /*  const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.sleeveNeckStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, this.id).subscribe(data => {
        this.updateSleeveStyleImageName(this.imageHolder3.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getMeasurement();
    }
  }
  updateSleeveStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addSleeveStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  getView() {
    this.router.navigate(['product/viewMeasurement']);
  }
  checkBeforeFrontDelete(styleId, tit) {
    const hold = {
      title: tit
    };
    this.productService.checkFrontNeckStyle(hold).subscribe(data => {
      const holder = data;
      if (holder.length === 0) {
        this.removeFront(styleId);
      } else {
        this.snackBar.open(this.message, this.action, {
          duration: 2000,
       });
      }
    });
  }
  removeFront(styleId) {
    this.productService.deleteFrontNeckStyle(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  checkBeforeBackDelete(styleId, tit) {
    const hold = {
      title: tit
    };
    this.productService.checkBackNeckStyle(hold).subscribe(data => {
      const holder = data;
      if (holder.length === 0) {
        this.removeBack(styleId);
      } else {
        this.snackBar.open(this.message, this.action, {
          duration: 2000,
       });
      }
    });
  }
  removeBack(styleId) {
    this.productService.deleteBackNeckStyle(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  checkBeforeSleeveDelete(styleId, tit) {
    const hold = {
      title: tit
    };
    this.productService.checkSleeveStyle(hold).subscribe(data => {
      const holder = data;
      if (holder.length === 0) {
        this.removeSleeve(styleId);
      } else {
        this.snackBar.open(this.message, this.action, {
          duration: 2000,
       });
      }
    });
  }
  removeSleeve(styleId) {
    this.productService.deleteSleeveLengthStyle(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
