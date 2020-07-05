import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { HowToMeasure } from './how-to-measure.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AppSetting } from 'src/app/config/appSetting';
import { DeleteConfirmBoxComponent } from 'src/app/shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-how-to-measure',
  templateUrl: './how-to-measure.component.html',
  styleUrls: ['./how-to-measure.component.css']
})
export class HowToMeasureComponent implements OnInit {
  displayedColumns: string[] = ['image1', 'title', 'detail', 'delete'];
  subCategoryName: any;
  selectedSubCategory: any;
  sizeGuideForm: any;
  categoryData: any;
  superCategoryName: any;
  headerCatSelectedData: any;
  mainCategoryModel: any;
  mainCategoryName: any;
  selectedMainCategory: any;
  subCategoryModel: any;
  fileToUploadInches: any;
  imageError: boolean;
  urlInches: any[];
  reader: FileReader;
  howToMeasureModel: HowToMeasure;
  howToMeasureImage: HowToMeasure;
  measureModel:any;
  fileLength: any;
  fileToUploadCM: any;
  message: any;
  detailsForm: FormGroup;
  howToMeasure: HowToMeasure;
  showDetail = false;
  howToMeasureData: any;
  showNoData: boolean;
  howToMeasureUrl: string;
  check: any;
  showImage: any;
  imageNameFilter: any;
  showImageNameError: boolean;
  
  // howToMeasureForm: FormGroup;

  constructor( private fb: FormBuilder, private productService: ProductService,public dialog: MatDialog) { }

  ngOnInit() {
    this.howToMeasureUrl = AppSetting.howToMeasureImageUrl ;
    this.createForm();
    this.getAllCategory();
    this.showHowToMeasure();
    // this.getSizeGuide();
  }
  getAllCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.categoryData = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  setNewUser(superCategory) {
    this.superCategoryName = superCategory.categoryName;
    this.headerCatSelectedData = superCategory._id;
    this.productService.getMainCategory(this.headerCatSelectedData).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  selectMainCategory(mainId) {
    this.mainCategoryName = mainId.mainCategoryName;
    this.selectedMainCategory = mainId._id;
    this.productService.getSubCategory(this.headerCatSelectedData, mainId._id).subscribe(data => {
      console.log('sub', data);
      this.subCategoryModel = data.subCategory;
    }, error => {
      console.log(error);
    });
  }
  selectSubCategory(subId) {
    this.subCategoryName = subId.subCategoryName;
    this.selectedSubCategory = subId._id;
  }
  // createForm() {
  //   this.sizeGuideForm = this.fb.group({
  //     title: ['', Validators.required]
  //   });
  // }

  // handleFileInput(images: any) {
  //   this.fileToUploadCM = images;
  //   this.imageError = false;
  //   this.urlInches = [];
  //   const files = images;
  //   if (files) {
  //     for (const file of files) {
  //       this.reader = new FileReader();
  //       this.reader.onload = (e: any) => {
  //         this.urlInches.push(e.target.result);
  //       };
  //       this.reader.readAsDataURL(file);
  //     }
  //   }
  //  }

   handleFileInput(files: FileList) {
    this.fileToUploadCM = files[0];
    this.howToMeasureImage = new HowToMeasure();
    const reader = new FileReader();
    const file = this.fileToUploadCM;
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      this.check = reader.result;
      this.howToMeasureImage.image64 = this.fileToUploadCM.name;
      this.howToMeasureImage.image = this.check;
      this.showImage = this.check;
      console.log('ads image name', this.howToMeasureImage.image);
    };
    
    this.howToMeasureModel = this.howToMeasureModel;
    this.checkImageName();
  }

  checkImageName() {
    this.imageNameFilter = this.measureModel.filter(val => val.adsImageName.indexOf(this.howToMeasureModel.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }

   addHowToMeasure() {
    this.howToMeasureModel = new HowToMeasure();
    this.howToMeasureModel.superCategoryId = this.headerCatSelectedData;
    this.howToMeasureModel.mainCategoryId = this.selectedMainCategory;
    this.howToMeasureModel.subCategoryId = this.selectedSubCategory;
    this.howToMeasureModel.superCategoryName = this.superCategoryName;
    this.howToMeasureModel.mainCategoryName = this.mainCategoryName;
    this.howToMeasureModel.subCategoryName = this.subCategoryName;
    this.howToMeasureModel.name = this.detailsForm.controls.detailHeading.value;
    this.howToMeasureModel.detail = this.detailsForm.controls.details.value;
    this.productService.addHowToMeasure(this.howToMeasureModel).subscribe(data => {
      // this.createDetail(this.detailsForm);
    this.uploadImages(data._id);
    this.detailsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  // uploadImages(id) {
  //   /* this.message = 'Size Guide Added Successfully'; */
  //   const formData: any = new FormData();
  //   this.fileLength = this.fileToUploadCM.length;
  //   for (let i = 0; i <= this.fileLength; i++) {
  //     formData.append('single', this.fileToUploadCM[i]);
  //   }
  //   this.productService.addImage(formData, id).subscribe(data => {
  //     // this.snackBar.open(this.message, this.action, {
  //     //   duration: 3000,
  //     // });
  //     /* this.getSizeGuide(); */
  //     console.log(data);
  //     this.saveHowToMeasure(data.Key, id);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  uploadImages(id) {
    console.log(this.howToMeasureImage);
    this.productService.addImage(this.howToMeasureImage, id).subscribe(data => {
      this.howToMeasureImage  = data;
    
      console.log(data, 'uploaded images');
      // this.snackBar.open(this.message, this.action, {
      //   duration: 2000,
      // });
      
      this.saveHowToMeasure(this.fileToUploadCM.name, id);
    }, error => {
      console.log(error);
    });
  }


  saveHowToMeasure(name, id) {
    this.howToMeasureModel = new HowToMeasure();
    this.howToMeasureModel.image64 = name;
    this.productService.saveImageName(this.howToMeasureModel, id).subscribe(data => {
      // this.uploadImages(id);
      this.showHowToMeasure();
    }, error => {
      console.log(error);
    });
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
  // createDetail(detailsForm: FormGroup) {                    // Create Privacy Policy
  //   this.howToMeasureModel = new HowToMeasure();
  //   this.howToMeasureModel.name = detailsForm.controls.policyHeading.value;
  //   this.howToMeasureModel.detail = detailsForm.controls.policies.value;
  //   this.productService.CreateDetails(this.howToMeasureModel).subscribe(data => {
  //     // this.router.navigate(['cms/viewPrivacyPolicy']);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  cancel() {
    // this.router.navigate(['cms/viewPrivacyPolicy']);
  }
  addDetails(){
    this.showDetail = true;
  }
  hideDetails(){
    this.showDetail = false;
  }

  showHowToMeasure(){
    this.productService.getHowToMeasure().subscribe(data =>{
      this.howToMeasureData = new MatTableDataSource<any>(data);
      console.log(this.howToMeasureData);
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
      }, error => {
        console.log(error);
      });
}

deleteHowToMeasure(elem) {
  this.message = 'How To Measure deleted';      
  this.productService.deleteHowToMeasure(elem).subscribe(data => {
    // this.snackBar.open(this.message, this.action, {
    //   duration: 3000,
    // });
    this.howToMeasureData = new MatTableDataSource<any>(data);
    }, error => {
      console.log(error);
    });
}
openDialog(elem):void {
  const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
     
      this.deleteHowToMeasure(elem);
    }
  });
}
}
