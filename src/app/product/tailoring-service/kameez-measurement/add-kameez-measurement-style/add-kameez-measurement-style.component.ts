import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { MeasurementImage } from '../create-kameez-measurement/measurementImage.model';
import { KameezMeasure } from '../../../../shared/model/kameezMeas.model';
import { KameezMeasurement } from '../../../../shared/model/kameezMeasurement.model';
import { BottomMeasurement } from '../../../../shared/model/bottomMeasurement.model';
import { MeasurementStyle } from '../../../../shared/model/measurementStyle.model';
import { MeasurementValue } from '../../../../shared/model/measurementValue.model';
import { AppSetting } from '../../../../config/appSetting';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-kameez-measurement-style',
  templateUrl: './add-kameez-measurement-style.component.html',
  styleUrls: ['./add-kameez-measurement-style.component.css']
})
export class AddKameezMeasurementStyleComponent implements OnInit {
  @ViewChild('backTitle', {static: false}) b;
  @ViewChild('frontTitle', {static: false}) f;
  @ViewChild('frontTitle', {static: false}) f1;
  @ViewChild('img1', {static: false}) i1;
  @ViewChild('img2', {static: false}) i2;
  @ViewChild('img3', {static: false}) i3;
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
  bottomStyleImg: any[];
  imageHolder1: MeasurementImage;
  check;
  showImage;
  imageHolder2: MeasurementImage;
  imageHolder3: MeasurementImage;
  imageHolder4: MeasurementImage;
  message = 'Customer Added This Style';
  action: string;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private router: Router, private snackBar: MatSnackBar) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.measurementImageUrl = AppSetting.measurementImageUrl;
    this.getSingleMeasurement();
   }

  ngOnInit() {
  }
  getSingleMeasurement() {
    this.productService.getSingleKameezMeasurement(this.id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  frontNeckStyleImageUpload(images: any) {
    this.imageError1 = false;
    /* this.fileToUpload = images;
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
    const holder = new KameezMeasure();
    const subHolder = new MeasurementStyle();
    const store = new KameezMeasurement();
    subHolder.title = title;
    holder.frontNeckStyle = [subHolder];
   /*  store.kameezMeasurement = [holder]; */
    this.productService.addKameezFrontStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.kameezMeasurement[0].frontNeckStyle.length - 1;
      const id = data.kameezMeasurement[0].frontNeckStyle[length]._id;
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
      this.getSingleMeasurement();
    }
  }
  updateFrontStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezFrontStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addBack(title) {
    const holder = new KameezMeasure();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.backNeckStyle = [subHolder];
    this.productService.addKameezBackStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.kameezMeasurement[0].backNeckStyle.length - 1;
      const id = data.kameezMeasurement[0].backNeckStyle[length]._id;
      this.uploadBackStyleImage(id);
    /*   this.b.nativeElement.value = "";
      this.i2.nativeElement.src = ""; */
    }, error => {
      console.log(error);
    });
  }
  backNeckStyleImageUpload(images: any) {
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
     /*  const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.backNeckStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder2, this.id).subscribe(data => {
        this.updateBackStyleImageName(this.imageHolder2.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getSingleMeasurement();
    }
  }
  updateBackStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezBackStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }

  addSleeve(title) {
    const holder = new KameezMeasure();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.sleeveStyle = [subHolder];
    this.productService.addKameezSleeveStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.kameezMeasurement[0].sleeveStyle.length - 1;
      const id = data.kameezMeasurement[0].sleeveStyle[length]._id;
      this.uploadSleeveStyleImage(id);
      this.f1.nativeElement.value = "";
      this.i3.nativeElement.src = "";
    }, error => {
      console.log(error);
    });
  }
  sleeveStyleImageUpload(images: any) {
    this.imageError3 = false;
    /* this.fileToUpload = images;
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
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.sleeveNeckStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder3, this.id).subscribe(data => {
        this.updateSleeveStyleImageName(this.imageHolder3.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getSingleMeasurement();
    }
  }
  updateSleeveStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezSleeveStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
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
    this.productService.deleteKameezFrontNeckStyle(this.id, styleId).subscribe(data => {
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
    this.productService.deleteKameezBackNeckStyle(this.id, styleId).subscribe(data => {
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
    this.productService.deleteKameezSleeveLengthStyle(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  checkBeforeBottomDelete(styleId, tit) {
    const hold = {
      title: tit
    };
    this.productService.checkBottomStyle(hold).subscribe(data => {
      const holder = data;
      if (holder.length === 0) {
        this.removeBottom(styleId);
      } else {
        this.snackBar.open(this.message, this.action, {
          duration: 2000,
       });
      }
    });
  }
  removeBottom(styleId) {
    this.productService.deleteKameezBottomStyle(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addBottom(title) {
    const holder = new BottomMeasurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.bottomStyle = [subHolder];
    this.productService.addKameezBottomStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.bottomMeasurement[0].bottomStyle.length - 1;
      const id = data.bottomMeasurement[0].bottomStyle[length]._id;
      this.uploadBottomStyleImage(id);
      /* this.f1.nativeElement.value = "";
      this.i3.nativeElement.src = ""; */
    }, error => {
      console.log(error);
    });
  }
  bottomStyleImageUpload(images: any) {
    this.imageError3 = false;
    /* this.fileToUpload = images;
    this.imageUploadStore.bottomStyleImage = this.fileToUpload[0];
    this.bottomStyleImg = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.bottomStyleImg.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    } */
    this.fileToUpload = images[0];
    this.bottomStyleImg = [];
    this.imageHolder4 = new MeasurementImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.bottomStyleImg.push(reader.result);
      this.check = reader.result;
      this.imageHolder4.imageName = this.fileToUpload.name;
      this.imageHolder4.uploadedImage = this.check;
      this.showImage = this.check;
    };
  }
  uploadBottomStyleImage(styleId) {
    if (this.imageHolder4.imageName !== undefined && this.imageHolder4.imageName !== null) {
      /* const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.bottomStyleImage); */
      this.productService.uploadImageForMeasurement(this.imageHolder4, this.id).subscribe(data => {
        this.updateBottomStyleImageName(this.imageHolder4.imageName, styleId);
      }, error => {
        console.log(error);
      });
    } else {
      this.getSingleMeasurement();
    }
  }
  updateBottomStyleImageName(name, styleId) {
    this.imageData = {
      imageName: name
    };
    this.productService.addKameezBottomStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
