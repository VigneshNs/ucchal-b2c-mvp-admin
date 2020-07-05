import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from '../../shared/model/mainCategory.model';
import { SuperCategoryImage } from '../super-category/superCategoryImageDetial.model';
export interface PeriodicElement {
  categoryName: string;
  description: string;

}
@Component({
  selector: 'app-add-main-category',
  templateUrl: './add-main-category.component.html',
  styleUrls: ['./add-main-category.component.css']
})
export class AddMainCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  selectedSuperCat = [];
  filterSuperCategoryModel = [];
  selectedmainCategoryModel: MainCategory[];
  duplicationError: boolean;
  mainCategoryModel: MainCategory;
  mainCategoryForm: FormGroup;
  headerCatSelectedData;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  fileLength;
  fileToUpload;
  isChangeImage = false;
  urls: any[];
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  savedLength;
  savedCategory: SuperCategory;
  imageError: boolean;
  fieldType: string[] = ['Text', 'Dropdown'];
  activeStatus = [{ active: 'Enabled' }, { active: 'Disabled' }];
  fieldSettingType: string[] = ['Size', 'Color', 'None'];
  displayedColumns: string[] = [ 'categoryName', 'description',  'delete'];
  imageHolder: any;
  check;
  showImage;
  selectedStatus: any;
  constructor(private fb: FormBuilder,public dialog: MatDialog, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.mainCategoryForm = this.fb.group({
      id: [''],
      mainCategoryName: ['', Validators.required],
      mainCategoryDescription: [''],
      status: [''],
      attribute: this.fb.array([])
    });
  }
  cancelMainCategory()
  {
    this.router.navigate(['category/maincategory']);
  }
  addMainCategorys() {
    this.router.navigate(['category/addmaincategory']);
  }
  statusValue(e) {
    this.selectedStatus = e.value;
   }
  editMainCategory(id)
  {
    console.log(id);
    // [routerLink]="['/category/editmaincategory/',headCatSelected, element._id]"
    this.router.navigate(['category/editmaincategory/',this.headCatSelected,id]);

    }
    selectDropdown(e, ix) {
      /* this.fileldTypeStatic = e.value; */
      const controlAttributValue = (<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
      const control = (<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldType') as FormArray;
      controlAttributValue.removeAt(ix);
      control.setValue(e.value);
     /*  (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldType').setValue(e.value); */
     }
     
addForm() {
  const fieldValue = this.fb.group({
    fieldName: ['', Validators.required],
    fieldType: ['Text'],
    fieldSetting: ['None', Validators.required],
    fieldEnable: [false, Validators.required],
    fieldEnableValue: [false, Validators.required],
    fieldValue: this.fb.array([])
  });
  this.categoryFieldsValueForms.push(fieldValue);
 }
 initFiledValue() {
  return this.fb.group({
    fieldAttributeValue: ['', Validators.required]
  });
 }
 changeImage() {
   this.isChangeImage = true;
 }
 cancelImageUpdate() {
   this.isChangeImage = false;
 }
 selectTypeSetting(e, ix) {
  const controlAttributValue = (<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
  const control = (<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldSetting') as FormArray;
  controlAttributValue.removeAt(ix);
  control.setValue(e.value);
 }
 addFiledValue(ix) {
  const control = (<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
  control.push(this.initFiledValue());
 }
 removeFiledValue(ix, iy) {
  const control = (<FormArray>(<FormArray>this.mainCategoryForm.controls['attribute']).at(ix).get('fieldValue')  as FormArray);
  control.removeAt(iy);
 }
 get categoryFieldsValueForms() {
  return this.mainCategoryForm.get('attribute') as FormArray;
 }
 deleteAttribute(i) {
  this.categoryFieldsValueForms.removeAt(i);
 }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      console.log(data);
      this.superCategoryModel = data;
      this.filterSuperCategoryModel = data;
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.filterSuperCategoryModel.forEach(element => {
      if (element._id === id) {
        this.selectedmainCategoryModel = element.mainCategory;
      }
    });
  }
  categoryVerify(val) {
    this.selectedmainCategoryModel.forEach(element => {
      if (element.mainCategoryName === val) {
        element.mainCategoryNameError = true;
        this.duplicationError = true;
      } else {
        element.mainCategoryNameError = false;
        this.duplicationError = false;
      }
    });
    console.log(this.selectedmainCategoryModel);
  }
 /*  handleFileInput(images: any) {
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
    // base64 image upload
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
  addMainCategory() {
    this.message = 'Main Category Added';
    this.mainCategoryModel = new MainCategory();
    this.mainCategoryModel.mainCategoryName =  this.mainCategoryForm.controls.mainCategoryName.value,
    this.mainCategoryModel.mainCategoryDescription =  this.mainCategoryForm.controls.mainCategoryDescription.value,
    this.mainCategoryModel._id = this.headerCatSelectedData;
    this.mainCategoryModel.status = this.selectedStatus;
    const filterAttribute =  this.mainCategoryForm.controls.attribute.value;
    filterAttribute.forEach(element => {
      element.fieldName = this.convertSentence(element.fieldName);
    });
    this.mainCategoryModel.attribute = this.mainCategoryForm.controls.attribute.value;
    this.categoryService.addMainCategory(this.mainCategoryModel).subscribe(data => {
      
      this.savedLength = data.length - 1;
      this.savedCategory = data[this.savedLength];
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryForm.reset();
      /* this.cancelMainCategory(); */
      this.uploadImages(this.savedCategory);
    }, error => {
      console.log(error);
    });
  }
  convertSentence(text){
    var output = text.replace(/\w+/g, function(txt) {
      // uppercase first letter and add rest unchanged
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/\s/g, '');
    const test = output.replace(/^\w/, c => c.toLowerCase());
    return test;
   }
  uploadImages(cat) {
   /*  const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    } */
    this.categoryService.mainCategoryImagesUpload(this.imageHolder, cat._id).subscribe(data => {
      this.urls = [];
      this.updateImageName(this.imageHolder.categoryImage, this.headCatSelected, cat._id);
    }, error => {
      console.log(error);
    });
  }
  updateImageName(name, supId, id) {
    const imageName = new MainCategory();
    imageName.mainCategoryImageName = name;
    this.categoryService.uploadMainCategoryImagesName(imageName, supId, id).subscribe(data => {
      this.router.navigate(['category/maincategory']);
     /*  this.isChangeImage = false; */
    }, error => {
      console.log(error);
    });
  }
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      console.log(data);
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data.mainCategory);
    }, error => {
      console.log(error);
    });
  }
  deleteMainCategory(id) {
    this.message = 'Deleted Successfully';
    this.categoryService.deleteMainCategory(this.headCatSelected, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteMainCategory(id);
      }
    });
  }
  /* deleteMainCategory(id) {
    this.message = 'Main Category deleted';
    this.categoryService.deleteMainCategory(this.headCatSelected, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
} */
}
