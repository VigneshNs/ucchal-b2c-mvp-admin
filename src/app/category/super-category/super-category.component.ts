   import { Component, OnInit } from '@angular/core';
   import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
   import { Router } from '@angular/router';
   import {MatPaginator, MatTableDataSource,MatDialog} from '@angular/material';
   import {MatIconModule} from '@angular/material/icon';
   import { AppSetting } from '../../config/appSetting';
   import {SuperCategory} from './superCategory.model';
   import {CategoryService} from '../category.service';
   import { MatSnackBar } from '@angular/material';
   import { Action } from 'rxjs/internal/scheduler/Action';
   import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';
   export interface PeriodicElement {
     categoryName: string;
     description: string;
   
   }
   
   @Component({
     selector: 'app-super-category',
     templateUrl: './super-category.component.html',
     styleUrls: ['./super-category.component.css']
   })
   export class SuperCategoryComponent implements OnInit {
     superCategoryForm: FormGroup;
     superCategoryModel: SuperCategory;
     categoryFilter;
     imageError: boolean;
     superCategoryFilter: SuperCategory[];
     superCategoryData;
     showCategoryName: boolean;
     checKCategoryName: boolean;
     showNoData:boolean;
     displayedColumns: string[] = ['logo', 'categoryName', 'description', 'Sort Order', 'Status' , 'delete'];
     fileLength;
     fileToUpload;
     urls = new Array<string>();
     selecteValue: any = [];
     reader: FileReader = new FileReader();
     savedLength;
     savedCategory: SuperCategory;
     activeStatus = [{ active: 'Enabled' }, { active: 'Disabled' }];
     selectedStatus: any;
     selectStatus = false;
     checKSortOrder  = false;
     editChecKSortOrder = false;
     editChecKCategoryName = true;
     message = 'Super Category added successfully';
     action;
     categoryImageUrl: string;
     loader = false;
     fieldType: string[] = ['Text', 'Dropdown'];
     fieldSettingType: string[] = ['Size', 'Color', 'None'];
     constructor(private fb: FormBuilder,public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar, private categoryService: CategoryService ) {
       this.categoryImageUrl = AppSetting.categoryImageUrl;
      }
  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.superCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      sortOrder: ['', Validators.required],
      status: [''],
      editCategory: [''],
      attribute: this.fb.array([])
    });
  }
  editSuperCategory(id)
  {
    console.log(id);
    // (element._id)" [routerLink]="['/category/editsupercategory/', element._id]"
    // [routerLink]="['/category/editmaincategory/',headCatSelected, element._id]"
    this.router.navigate(['category/editsupercategory/',id]);

    }
    addSuperCategorys() {
      this.router.navigate(['category/addsupercategory']);
    }
  getSuperCategory() {
    this.categoryService.getSuperCategoryforCategoryAdmin().subscribe(data => {
      this.superCategoryModel = data;
      console.log(this.superCategoryModel);
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
      this.loader = true;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    });
  }
  selectDropdownList(e, ix){
    const controlAttributValue = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    const control = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldType') as FormArray;
    controlAttributValue.removeAt(ix);
    control.setValue(e.value);
  }
  selectDropdown(e, ix) {
    /* this.fileldTypeStatic = e.value; */
    const controlAttributValue = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    const control = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldType') as FormArray;
    controlAttributValue.removeAt(ix);
    (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldType').setValue(e.value);
    control.setValue(e.value);
    
  }
 
  addForm() {
    const fieldValue = this.fb.group({
      fieldName: ['', Validators.required],
      fieldType: ['Text'],
      fieldSetting: ['None', Validators.required],
      fieldValue: this.fb.array([])  
    });
    this.categoryFieldsValueForms.push(fieldValue);
  }
  initFiledValue() {
    return this.fb.group({
      fieldAttributeValue: ['', Validators.required]
    })
  }
  selectTypeSetting(e, ix) {
    const controlAttributValue = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    const control = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldSetting') as FormArray;
    controlAttributValue.removeAt(ix);
    control.setValue(e.value);
  }
  addFiledValue(ix) {
    const control = (<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
    control.push(this.initFiledValue());
  }
  /* var s = input;
  s = s.replace(/([A-Z])/g, ' $1').trim();
return s; */
  removeFiledValue(ix, iy) {
    const control = (<FormArray>(<FormArray>this.superCategoryForm.controls['attribute']).at(ix).get('fieldValue')  as FormArray);
    control.removeAt(iy);
  }
  get categoryFieldsValueForms() {
    return this.superCategoryForm.get('attribute') as FormArray;
  }
  deleteAttribute(i) {
    this.categoryFieldsValueForms.removeAt(i);
  }
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
  handleFileInput(images: any) {
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
  }

  uploadImages(id) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.fileToUpload[i]);
    }
    this.categoryService.uploadImages(formData, id).subscribe(data => {
      this.updateSuperCategoryImagesName(data, id);
     /*  this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data); */
      this.urls = [];
    }, error => {
      console.log(error);
    });
  }

  addSuperCategory() {
    if (this.selectedStatus) {
      this.superCategoryModel = new SuperCategory();
      this.superCategoryModel.categoryName = this.superCategoryForm.controls.categoryName.value;
      this.superCategoryModel.categoryDescription = this.superCategoryForm.controls.categoryDescription.value;
      this.superCategoryModel.sortOrder = this.superCategoryForm.controls.sortOrder.value;
      this.superCategoryModel.status = this.selectedStatus;
      const filterAttribute =  this.superCategoryForm.controls.attribute.value;
      filterAttribute.forEach(element => {
        element.fieldName = this.convertSentence(element.fieldName)
      });
      this.superCategoryModel.attribute = this.superCategoryForm.controls.attribute.value;
      this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
        this.superCategoryFilter = data;
        console.log(data);
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
        this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
        this.savedLength = data.length - 1;
        this.savedCategory = data[this.savedLength];
        this.uploadImages(this.savedCategory._id);
        this.superCategoryForm.reset();
      });
    } else {
        this.selectStatus = true;
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
  updateSuperCategoryImagesName(catimage, id) {
    this.superCategoryModel = new SuperCategory();
    this.superCategoryModel.categoryImageName = catimage.originalname;
    this.categoryService.editSuperCategoryImagesName(this.superCategoryModel, id).subscribe(data => {
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
      this.urls = [];
    }, error => {
      console.log(error);
    });
  }

  statusValue(e) {
    this.selectedStatus = e.value;
  }
  /*  this.uploadImages(this.savedCategory._id);
 /*  uploadImages(id) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.categoryService.uploadImages(formData, id).subscribe(data => {
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
      this.urls = [];
    }, error => {
      console.log(error);
    });
  } */
  openDialog(value):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this.deleteSuperCategory(value);
      }
    });
  }
  deleteSuperCategory(value) {
    this.message = 'Deleted Successfully';
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.superCategoryFilter = deleteData;
      
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(deleteData);
    },error => {
      console.log(error);
    });
  }
 /*  deleteSuperCategory(value) {
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryFilter = deleteData;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(deleteData);
    });
  } */
  categoryVerify(val) {
    this.superCategoryFilter.forEach(element => {
      if (element.categoryName === val ) {
        element.checkCategoryName = true;
        this.checKCategoryName = true;
        this.editChecKCategoryName = true;
      } else {
        element.checkCategoryName = false;
        this.checKCategoryName = false;
        this.editChecKCategoryName = false;
      }
    });
  }
  categorySortOrder(val) {
    this.superCategoryFilter.forEach(element => {
      if (element.sortOrder.toString() === val ) {
        this.checKSortOrder = true;
        this.editChecKSortOrder = true;
      } else {
        this.checKSortOrder = false;
        this.editChecKSortOrder = false;
      }
    });
  }
  edit(cat) {
    this.superCategoryFilter.map(category => {
      cat.editing = false;
      console.log(category);
    });
    cat.editing = true;
  }
}
