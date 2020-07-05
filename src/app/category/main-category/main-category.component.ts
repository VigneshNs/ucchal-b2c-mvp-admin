import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from './../../shared/model/mainCategory.model';


export interface PeriodicElement {
  categoryName: string;
  description: string;

}
@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
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
  urls = new Array<string>();
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  savedLength;
  savedCategory: SuperCategory;
  imageError: boolean;

  displayedColumns: string[] = [ 'categoryName', 'description', 'status', 'delete'];
  constructor(private fb: FormBuilder,public dialog: MatDialog, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { 
    this.getSuperCategory();
  }

  ngOnInit() {
    this.createForm();
   
  }
  createForm() {
    this.mainCategoryForm = this.fb.group({
      id: [''],
      mainCategoryName: ['', Validators.required],
      mainCategoryDescription: ['']
    });
  }
  addMainCategorys() {
    this.router.navigate(['category/addmaincategory']);
  }
  editMainCategory(id)
  {
    console.log(id);
    // [routerLink]="['/category/editmaincategory/',headCatSelected, element._id]"
    this.router.navigate(['category/editmaincategory/',this.headCatSelected,id]);

    }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
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
  addMainCategory() {
    this.message = 'Main Category Added';
    this.mainCategoryModel = new MainCategory();
    this.mainCategoryModel.mainCategoryName =  this.mainCategoryForm.controls.mainCategoryName.value,
    this.mainCategoryModel.mainCategoryDescription =  this.mainCategoryForm.controls.mainCategoryDescription.value,
    this.mainCategoryModel._id = this.headerCatSelectedData;
    this.categoryService.addMainCategory(this.mainCategoryModel).subscribe(data => {
      console.log('saved data', data);
      this.savedLength = data.length - 1;
      this.savedCategory = data[this.savedLength];
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryForm.reset();
      this.uploadImages(this.savedCategory);
    }, error => {
      console.log(error);
    });
  }
  uploadImages(cat) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.categoryService.uploadMainCategoryImages(formData, this.headerCatSelectedData, cat._id, cat.mainCategoryName).subscribe(data => {
      this.urls = [];
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