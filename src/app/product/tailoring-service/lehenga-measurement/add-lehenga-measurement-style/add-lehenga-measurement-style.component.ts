import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { AppSetting } from '../../../../config/appSetting';
import { MeasurementImage } from '../create-lehenga-measurement/measurementImage.model';
import { LehengaMeasurement } from '../../../../shared/model/lehengaMeasurement.model';
import { LehengaMeasure } from '../../../../shared/model/lehengaMeasure.model';
import { CholiMeasurement } from '../../../../shared/model/choliMeasurement..model';
import { MeasurementStyle } from 'src/app/shared/model/measurementStyle.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-lehenga-measurement-style',
  templateUrl: './add-lehenga-measurement-style.component.html',
  styleUrls: ['./add-lehenga-measurement-style.component.css']
})
export class AddLehengaMeasurementStyleComponent implements OnInit {
  id: string;
  measurementImageUrl: string;
  holder: any;
  imageError1: boolean;
  fileToUpload: any;
  imageUploadStore: MeasurementImage = new MeasurementImage();
  frontStyleImg: any[];
  reader: FileReader;
  imageData = {
    imageName: String
  };
  imageError2: boolean;
  backStyleImg: any[];
  imageError3: boolean;
  sleeveStyleImg: any[];
  imageHolder1: MeasurementImage;
  check;
  showImage;
  imageHolder2: MeasurementImage;
  imageHolder3: MeasurementImage;
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
    this.productService.getSingleLehengaMeasurement(this.id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  frontNeckStyleImageUpload(images: any) {
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
    const holder = new CholiMeasurement();
    const subHolder = new MeasurementStyle();
    const store = new LehengaMeasurement();
    subHolder.title = title;
    holder.frontNeckStyle = [subHolder];
   /*  store.kameezMeasurement = [holder]; */
    this.productService.addLehengaFrontStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.choliMeasurement[0].frontNeckStyle.length - 1;
      const id = data.choliMeasurement[0].frontNeckStyle[length]._id;
      this.uploadFrontStyleImage(id);
/*       this.f.nativeElement.value = "";
      this.i1.nativeElement.src = ""; */
    }, error => {
      console.log(error);
    });
  }
  uploadFrontStyleImage(styleId) {
    if (this.imageHolder1.imageName !== undefined && this.imageHolder1.imageName !== null) {
     /*  const formData: any = new FormData();
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
    this.productService.addLehengaFrontStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addBack(title) {
    const holder = new CholiMeasurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.backNeckStyle = [subHolder];
    this.productService.addLehengaBackStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.choliMeasurement[0].backNeckStyle.length - 1;
      const id = data.choliMeasurement[0].backNeckStyle[length]._id;
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
      /* const formData: any = new FormData();
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
    this.productService.addLehengaBackStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }

  addSleeve(title) {
    const holder = new CholiMeasurement();
    const subHolder = new MeasurementStyle();
    subHolder.title = title;
    holder.sleeveStyle = [subHolder];
    this.productService.addLehengaSleeveStyleMeasurement(holder, this.id).subscribe(data => {
      console.log(data);
      const length = data.choliMeasurement[0].sleeveStyle.length - 1;
      const id = data.choliMeasurement[0].sleeveStyle[length]._id;
      this.uploadSleeveStyleImage(id);
      /* this.f1.nativeElement.value = "";
      this.i3.nativeElement.src = ""; */
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
      const formData: any = new FormData();
      formData.append('single', this.imageUploadStore.sleeveNeckStyleImage);
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
    this.productService.addLehengaSleeveStyleImageName(this.imageData, this.id, styleId).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
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
    this.productService.removeLehengaFrontNeckStyleImage(this.id, styleId).subscribe(data => {
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
    this.productService.removeLehengaBackNeckStyleImage(this.id, styleId).subscribe(data => {
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
    this.productService.removeLehengaSleeveStyleImage(this.id, styleId).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  getView() {
    this.router.navigate(['product/viewlehengameasurement']);
  }
}
