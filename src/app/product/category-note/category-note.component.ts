import { Component, OnInit } from '@angular/core';
import { SuperCategory } from 'src/app/shared/model/superCategory.model';
import { CategoryService } from 'src/app/category/category.service';
import { MainCategory } from 'src/app/shared/model/mainCategory.model';
import { SubCategory } from 'src/app/shared/model/sub-category.model';
import { CategoryNote } from 'src/app/shared/model/categoryNote.model';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category-note',
  templateUrl: './category-note.component.html',
  styleUrls: ['./category-note.component.css']
})
export class CategoryNoteComponent implements OnInit {
  supCategoryDetails: SuperCategory;
  mainCategorySelected: boolean;
  dataSubDeatils: any[];
  superCategoryModel: any;
  downloadExcelS3Data: any;
  dataSubDeatilsTest: any;
  subCategorySelected: boolean;
  mainCategoryDetails: any;
  subCategoryDetails: any;
  supCategorySelected: boolean;
  note: any;
  showNote: boolean;
  displayNote: any;
  mainCatlength;
  active: boolean;
  editN = false;
  noteNew: any;

  constructor(private categoryService: CategoryService,private productService: ProductService) {
    this.dataSubDeatils = new Array();
   }

  ngOnInit() {
    this.getSuperCategory();
    this.getNote();
  }

  categorySelected(e) {
    this.supCategoryDetails = new SuperCategory();
    this.mainCategorySelected = true;
    this.supCategoryDetails = e.value;
    this.dataSubDeatils = new Array();
    // this.excelFormatCenter = new Array();
    // this.downloadExcelS3Data = this.superCategoryModel.find(element => element._id === this.supCategoryDetails._id);
    // const dataSub = {};
    this.dataSubDeatils = this.supCategoryDetails.attribute;
     this.mainCatlength = this.supCategoryDetails.mainCategory
    if(this.mainCatlength == 0){
      this.active = true;
      console.log(this.active)
    } else {
      this.active = false;
    }

    
   
  }
  public getKeys =  (arr) => {
    var key, keys = [];
    for (let i = 0; i < arr.length; i++) {
        for (key in arr[i]) {
            if (arr[i].hasOwnProperty(key)) {
                keys.push({name: key, value: arr[i][key]});
            }
        }
    }
    return keys;
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      console.log(this.superCategoryModel,"super");
    });
  }
  categoryMainCategory(e) {
    
    this.subCategorySelected = true;
    this.mainCategoryDetails = new MainCategory();
    this.downloadExcelS3Data = new Object();
    this.mainCategoryDetails = e.value;
    console.log(this.mainCategoryDetails,"main");
  }
  categorySubCategory(e) {
    
    this.subCategoryDetails = new SubCategory();
    this.subCategoryDetails = e.source.value;
    console.log(this.supCategoryDetails,"sub");
    /* this.dataSubDeatils = new Category */
    this.supCategorySelected = true;
    const dataSub = {};
    this.dataSubDeatils = new Array();
    // this.excelFormatCenter = new Array();
    this.dataSubDeatils = this.subCategoryDetails.attribute;
    console.log(this.dataSubDeatils);
    // for (const ite of this.dataSubDeatils) {
    //   if (!dataSub[ite.fieldName]) {
    //     const subele = ite.fieldName;
    //     dataSub[subele] = '';
    //   }
    // }
    // this.excelFormatCenter.push(dataSub);
    this.active = true;
  }

  createNote(val){
    this.note = new CategoryNote();
    this.note.note = val;
    // console.log(val);
    // console.log(this.supCategoryDetails,"sup note")
    this.note.superCategoryId = this.supCategoryDetails._id;
    // console.log(this.supCategoryDetails._id);
    this.note.superCategoryName = this.supCategoryDetails.categoryName;
    if(this.supCategoryDetails.mainCategory.length > 0){
      if(this.mainCategoryDetails.subCategory.length > 0){
        this.note.subCategoryId = this.subCategoryDetails._id;
        this.note.subCategoryName = this.subCategoryDetails.subCategoryName;
        // console.log(this.subCategoryDetails._id,"sub detail");
      } 
    }
    console.log(this.note)
    this.productService.SaveNote(this.note).subscribe(data => {
      this.displayNote = data;
      this.displayNote.forEach( d => {
        d.edit = false;
      })
      console.log(data);
      
    })
  }
  
  showInput(){
    this.showNote = true;
  }

  getNote(){
    this.productService.getCatNote().subscribe(data =>{
      this.displayNote = data;
      this.displayNote.forEach( d => {
        d.edit = false;
      })
      console.log(this.displayNote);
    })
  }

  deleteNote(id){
    this.productService.deleteCatNote(id).subscribe(data => {
      console.log(data);
      this.displayNote = data;
      this.displayNote.forEach( d => {
        d.edit = false;
      })
    })
  }
  editNote(id,note){
    note.edit = true;
    // this.editN = true;
  }
  updateNote(note,newNote){
    this.noteNew = new CategoryNote();
    this.noteNew.note = newNote;
    note.edit = false;
    this.productService.editNote(note._id,this.noteNew).subscribe(data => {
      this.displayNote = data;
      this.displayNote.forEach( d => {
        d.edit = false;
      })
    })
  }
}


