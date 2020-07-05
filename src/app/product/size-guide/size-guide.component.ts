import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatDialog} from '@angular/material';
import { SizeGuide } from './size-guide.model';
import { ProductService } from './../product.service';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
import { SizeGuideService } from '../edit-size-guide/size-guide.service';
import { SizeGuideImage } from '../edit-size-guide/size-guideImage.model';
export interface PeriodicElement {
  image: string;
  title: string;
}

@Component({
  selector: 'app-size-guide',
  templateUrl: './size-guide.component.html',
  styleUrls: ['./size-guide.component.css']
})
export class SizeGuideComponent implements OnInit {
  sizeGuideUrl;
  sizeGuideForm: FormGroup;
  fileLength;
  fileToUploadCM;
  fileToUploadInches;
  urlCM: any[];
  urlInches: any[];
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  imageError: boolean;
  message;
  action;
  showNoData:boolean;
  sizeGuideModel: SizeGuide;
  displayedColumns: string[] = ['image1', 'image2', 'title', 'delete'];
  sizeguideData;
  categoryData: any;
  headerCatSelectedData: any;
  mainCategoryModel: any;
  selectedMainCategory: any;
  subCategoryModel: any;
  selectedSubCategory: string;
  superCategoryName: any;
  mainCategoryName: any;
  subCategoryName: any;
  vendorModel: any;
  selectedVendorName: any;
  selectedVendorId: any;
  imageHolder: SizeGuideImage;
  check;
  showImage;
  imageHolder2: SizeGuideImage;
  constructor(private fb: FormBuilder,public dialog: MatDialog, private router: Router,
              private productService: ProductService, private sizeGuideService: SizeGuideService,
              private snackBar: MatSnackBar) {
       this.sizeGuideUrl = AppSetting.sizeGuideImageUrl;
       this.getAllCategory();
       this.getSizeGuide();
       this.getAllVendor();
      }

  ngOnInit() {
    this.createForm();
    
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
  createForm() {
    this.sizeGuideForm = this.fb.group({
      title: ['', Validators.required]
    });
  }
  /* handleFileInputCM(images: any) {
    this.fileToUploadCM = images;
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
  } */
  /* handleFileInputInches(images: any) {
    this.fileToUploadInches = images;
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
   selectVendor(vendor) {
     this.selectedVendorName = vendor.vendorName;
     this.selectedVendorId = vendor._id;
   }
  addSizeGuide() {
    this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.superCategoryId = this.headerCatSelectedData;
    this.sizeGuideModel.mainCategoryId = this.selectedMainCategory;
    this.sizeGuideModel.subCategoryId = this.selectedSubCategory;
    this.sizeGuideModel.superCategoryName = this.superCategoryName;
    this.sizeGuideModel.mainCategoryName = this.mainCategoryName;
    this.sizeGuideModel.subCategoryName = this.subCategoryName;
    this.sizeGuideModel.vendorId = this.selectedVendorId;
    this.sizeGuideModel.vendorName = this.selectedVendorName;
    this.productService.addSizeGuide(this.sizeGuideModel).subscribe(data => {
    this.uploadImagesCM(data._id);
    }, error => {
      console.log(error);
    });
  }
  uploadImagesCM(id) {
    /* this.message = 'Size Guide Added Successfully'; */
   /*  const formData: any = new FormData();
    this.fileLength = this.fileToUploadCM.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUploadCM[i]);
    } */
    this.productService.uploadSizeGuide(this.imageHolder, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.getSizeGuide(); */
      console.log(data);
      this.saveSizeGuideNameCM(this.imageHolder.imageName, id);
    }, error => {
      console.log(error);
    });
  }
  uploadImagesInches(id) {
    /* this.message = 'Size Guide Added Successfully';
    const formData: any = new FormData();
    this.fileLength = this.fileToUploadInches.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUploadInches[i]);
    } */
    this.productService.uploadSizeGuide(this.imageHolder2, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.getSizeGuide(); */
      console.log(data);
      this.saveSizeGuideNameInches(this.imageHolder2.imageName, id);
    }, error => {
      console.log(error);
    });
  }
  saveSizeGuideNameCM(name, id) {
    this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.sizeChartCM = name;
    this.productService.saveImageNameCM(this.sizeGuideModel, id).subscribe(data => {
      this.uploadImagesInches(id);
    }, error => {
      console.log(error);
    });
  }
  saveSizeGuideNameInches(name, id) {
    this.sizeGuideModel = new SizeGuide();
    this.sizeGuideModel.sizeChartInches = name;
    this.productService.saveImageNameInches(this.sizeGuideModel, id).subscribe(data => {
      this.getSizeGuide();
    }, error => {
      console.log(error);
    });
  }
  getSizeGuide() {
    this.productService.getSizeGuide().subscribe(data => {
      this.sizeguideData = new MatTableDataSource<PeriodicElement>(data);
      console.log('size guide', data);
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
      }, error => {
        console.log(error);
      });
  }
  deleteSizeGuide(elem) {
    this.message = 'Size Guide deleted';
    this.productService.deleteSizeGuide(elem).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.sizeguideData = new MatTableDataSource<PeriodicElement>(data);
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
       
        this.deleteSizeGuide(elem);
      }
    });
  }
  /* deleteSizeGuide(elem) {
    this.productService.deleteSizeGuide(elem._id).subscribe(data => {
      this.sizeguideData = new MatTableDataSource<PeriodicElement>(data);
      }, error => {
        console.log(error);
      });
  } */
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, err => {
      console.log(err);
    });
  }
  onEdit(sizeGuide) {
    this.sizeGuideService.editSizeGuide(sizeGuide).subscribe(data => {
      if (data) {
        this.sizeguideData = new MatTableDataSource<PeriodicElement>(data);
        console.log('size guide', data);
        if (data.length === 0) {
          this.showNoData = true;
        } else {
          this.showNoData = false;
        }
      }
    });
  }
}
