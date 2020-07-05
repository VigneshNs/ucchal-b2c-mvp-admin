import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator,MatDialog, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';
import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { SubCategory } from './sub-category.model';
import { AppSetting } from '../../config/appSetting';
import { SuperCategoryImage } from '../super-category/superCategoryImageDetial.model';

export interface PeriodicElement {
  categoryName: string;
  description: string;
}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  mainCategoryModel: MainCategory;
  subCategoryModel: SubCategory;
  subCategoryData;
  subCategoryForm: FormGroup;
  headerCatSelectedData;
  selectedMainCategory;
  getMainCategoryId;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  selectedDisable = false;
  displayedColumns: string[] = ['imageTab', 'categoryName', 'description', 'status', 'metatag', 'delete'];
  fileToUpload;
  imageError: boolean;
  urls: any[];
  reader: FileReader;
  fileLength: any;
  temp1: any;
  temp2: any;
  temp3: any;
  categoryImageUrl: string;
  fileldTypeStatic = 'Text';
  fieldType: string[] = ['Text', 'Dropdown'];
  fieldSettingType: string[] = ['Size', 'Color', 'None'];
  imageHolder: any;
  check;
  showImage;
  constructor(private fb: FormBuilder,public dialog: MatDialog, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) {
    this.categoryImageUrl = AppSetting.subCategoryImageUrl;
  }
  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.subCategoryForm = this.fb.group({
      id: [''],
      subCategoryName: ['', Validators.required],
      subCategoryDescription: ['', Validators.required],
      metaTagTitle: ['', Validators.required],
      metaTagDescription: ['', Validators.required],
      attribute: this.fb.array([])
    });
  }
  addSubCategorys() {
    this.router.navigate(['category/addsubcategory']);
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  selectDropdown(e, ix) {
    /* this.fileldTypeStatic = e.value; */
    const controlAttributValue = (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    const control = (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldType') as FormArray;
    controlAttributValue.removeAt(ix);
    control.setValue(e.value);
    /* (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldType').setValue(e.value); */
  }
  addForm() {
    const fieldValue = this.fb.group({
      fieldName: ['', Validators.required],
      fieldType: ['Text'],
      fieldSetting:['None'],
      fieldValue: this.fb.array([])  
    });
    this.categoryFieldsValueForms.push(fieldValue);
  }
  initFiledValue() {
    return this.fb.group({
      fieldAttributeValue: ['', Validators.required],
    })
  }
  
  addFiledValue(ix) {
    const control = (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    control.push(this.initFiledValue());
  }
  /* var s = input;
  s = s.replace(/([A-Z])/g, ' $1').trim();
return s; */
  removeFiledValue(ix, iy) {
    const control = (<FormArray>(<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldValue')  as FormArray);
    control.removeAt(iy);
  }
  get categoryFieldsValueForms() {
    return this.subCategoryForm.get('attribute') as FormArray;
  }
  deleteAttribute(i) {
    this.categoryFieldsValueForms.removeAt(i);
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  selectMainCategory(id) {
    this.selectedMainCategory = id;
  }
  addSubCategory() {
    if (this.headerCatSelectedData && this.selectedMainCategory) {
      this.message = 'Sub Category added successfully';
      this.subCategoryModel = new SubCategory();
      this.subCategoryModel.subCategoryName = this.subCategoryForm.controls.subCategoryName.value;
      this.subCategoryModel.subCategoryDescription = this.subCategoryForm.controls.subCategoryDescription.value;
      this.subCategoryModel.metaTagTitle = this.subCategoryForm.controls.metaTagTitle.value;
      this.subCategoryModel.metaTagDescription = this.subCategoryForm.controls.metaTagDescription.value;
      const filterAttribute = this.subCategoryForm.controls.attribute.value
      filterAttribute.forEach(element => {
        element.fieldName = this.convertSentence(element.fieldName)
      });
      console.log(filterAttribute);
      this.subCategoryModel.attribute = this.subCategoryForm.controls.attribute.value,
      this.categoryService.addSubCategory(this.subCategoryModel, this.headerCatSelectedData, this.selectedMainCategory).subscribe(data => {
          this.snackBar.open(this.message, this.action, {
            duration: 3000,
          });
          this.uploadImages(this.headerCatSelectedData, this.selectedMainCategory, data._id);
        });
    } else {
      this.selectedDisable = true;
    }
  }
  convertSentence(text){
    var output = text.replace(/\w+/g, function(txt) {
      // uppercase first letter and add rest unchanged
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/\s/g, '');
    
    const test = output.replace(/^\w/, c => c.toLowerCase());
    return test;
    
  }
  selectTypeSetting(e, ix) {
    const controlAttributValue = (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    const control = (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldSetting') as FormArray;
    controlAttributValue.removeAt(ix);
    control.setValue(e.value);
    console.log(control);
  }

  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  getSubCategory(id) {
    this.getMainCategoryId = id;
    this.categoryService.getSubCategory(this.headCatSelected, this.getMainCategoryId).subscribe(data => {
      this.subCategoryData = new MatTableDataSource<PeriodicElement>(data.subCategory);
    }, err => {
      console.log(err);
    });
  }
  deleteSubCategory(element) {
    this.message = 'Deleted Successfully';
this.categoryService.deleteSubCategory(this.headCatSelected, this.getMainCategoryId, element).subscribe(data => {
  this.snackBar.open(this.message, this.action, {
    duration: 3000,});
  this.subCategoryData = new MatTableDataSource<PeriodicElement>(data.subCategory);
}, err => {
  console.log(err);
});
 }
 openDialog(element):void {
  console.log(element);
  const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
     
      this. deleteSubCategory(element);
    }
  });
}

 /*  deleteSubCategory(element) {
    this.categoryService.deleteSubCategory(this.headCatSelected, this.getMainCategoryId, element).subscribe(data => {
      this.subCategoryData = new MatTableDataSource<PeriodicElement>(data.subCategory);
    }, err => {
      console.log(err);
    });
  } */
  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    this.imageError = false;
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  } */
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.urls = [];
    this.imageHolder = new SuperCategoryImage();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.urls.push(reader.result);
      this.check = reader.result;
      this.imageHolder.categoryImage = this.fileToUpload.name;
      this.imageHolder.categoryImageName = this.check;
      this.showImage = this.check;
    };
  }
  uploadImages(supId, minId, id) {
/*     const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    } */
    this.categoryService.uploadSubCategoryImages(this.imageHolder, id).subscribe(data => {
      this.updateSubCategoryImagesName(this.imageHolder.categoryImage, supId, minId, id);
      /* this.superCategoryFilter = data; */
      console.log(data);
      /*  this.subCategoryData = new MatTableDataSource<PeriodicElement>(data); */
      this.urls = [];
    }, error => {
      console.log(error);
    });
  }
  updateSubCategoryImagesName(name, supId, minId, id) {
    this.subCategoryModel = new SubCategory();
    this.subCategoryModel.subCategoryImageName = name;
    this.categoryService.editSubCategoryImagesName(this.subCategoryModel, supId, minId, id).subscribe(data => {
      /* this.superCategoryFilter = data; */
      console.log(data);
      this.subCategoryData = new MatTableDataSource<PeriodicElement>(data);
      this.urls = [];
    }, error => {
      console.log(error);
    });
  }

}
