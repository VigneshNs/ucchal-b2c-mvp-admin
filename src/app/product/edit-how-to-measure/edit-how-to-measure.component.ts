import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from 'src/app/config/appSetting';
import { HowToMeasure } from '../how-to-measure/how-to-measure.model';

@Component({
  selector: 'app-edit-how-to-measure',
  templateUrl: './edit-how-to-measure.component.html',
  styleUrls: ['./edit-how-to-measure.component.css']
})
export class EditHowToMeasureComponent implements OnInit {
  howToMeasureUrl: any;
  id: string;
  holder: any;
  holder1: any;
  detailsForm: any;
  howToMeasureForm: HowToMeasure;
  fileToUpload: File;
  imageHolder: HowToMeasure;
  urlInches: any[];
  check: string | ArrayBuffer;
  showImage: string | ArrayBuffer;
  howToMeasure: any;
  isEditInches: boolean;
  isImageChanes: boolean;
  urls: any[];

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService,
    private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
      this.howToMeasureUrl = AppSetting.howToMeasureImageUrl ;
this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
this.id = params.get('id');
});
}

  ngOnInit() {
    this.createForm();
    this.getSingleSizeGuide();
  }

  createForm() {
    // this.howToMeasureForm = this.fb.group({

    // })
    this.detailsForm = this.fb.group({
      detailHeading:[''],
      details: this.fb.array([])
    });
    this.addDetailForm();
  }
  addDetailForm() {
    const detail = this.fb.group({
      name: ['', Validators.required],
      detail: ['', Validators.required],
    });
    this.detailForm.push(detail);
  }
  get detailForm() {
    return this.detailsForm.get('details') as FormArray;
  }
  deleteDetail(i) {
    this.detailForm.removeAt(i);
  }
  getSingleSizeGuide() {
    this.productService.getSingleHowToMeasure(this.id).subscribe(data => {
      this.holder1 = data;
    this.holder1.detail.forEach( d => {
      this.holder = d;
    })
      console.log(this.holder,"holder val");
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  cancelUpdate() {
    this.router.navigate(['product/howtomeasure']);
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.urls = [];
    this.imageHolder = new HowToMeasure();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.urls.push(reader.result);
      this.check = reader.result;
      this.imageHolder.image64 = this.fileToUpload.name;
      this.imageHolder.image = this.check;
      this.showImage = this.check;
    };
  }

  uploadImages(id) {
      this.productService.addImage(this.imageHolder, id).subscribe(data => {
        // this.snackBar.open(this.message, this.action, {
        //   duration: 3000,
        // });
        /* this.getSizeGuide(); */
        console.log(data);
        this.saveHowToMeasureName(this.imageHolder.image64, id);
      }, error => {
        console.log(error);
      });
    }


    saveHowToMeasureName(name, id) {
      this.howToMeasure = new HowToMeasure();
      this.howToMeasure.image64 = name;
      this.productService.saveImageName(this.howToMeasure, id).subscribe(data => {
        this.router.navigate(['product/howtomeasure']);
          // this.uploadImages(id);
      
      }, error => {
        console.log(error);
      });
    }
    changeImage() {
      this.isImageChanes = true;
    }

    submitUpdate() {
      const holder = new HowToMeasure();
      this.productService.updateHowToMeasure(holder, this.holder1._id).subscribe(data => {
        this.uploadImages(this.holder1._id)
      });
    }

   
}
