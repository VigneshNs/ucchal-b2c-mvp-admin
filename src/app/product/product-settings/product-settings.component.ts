import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PriceFilter } from './../../shared/model/price-filter.model';
import { ProductService } from '../product.service';
import
 { ProductSettings } from './../product-settings/product-settings.model';
import { ProductModule } from '../product.module';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';
@Component({
   selector: 'app-product-settings',
   templateUrl: './product-settings.component.html',
   styleUrls: ['./product-settings.component.css']
})

export class ProductSettingsComponent implements OnInit {
  productSettingsForm: FormGroup;
  showFormControl: boolean;
  showColorForm: boolean;
  showMaterialControl: boolean;
  showOccasionControl: boolean;
  showSizeControl: boolean;
  showTagsControl: boolean;
  showNoteControl: boolean;
  priceFilterModelData: PriceFilter;
  priceFilterModel: PriceFilter;
  settingsModelData: ProductSettings;
  settingsModel: ProductSettings;
  showDispatchTime: boolean;
  message;
  showDiscount: boolean;
  showNoData:boolean;
  action;
  note:any;
  allSettings:any;
  constructor(private fb: FormBuilder,private dialog:MatDialog, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getProductSettings();
    this.getAllSettings();
  }
  createForm() {
    this.productSettingsForm = this.fb.group({
      priceRangeMinimum: [],
      priceRangeMaximum: [],
      color: [],
      material: [],
      occasion: [''],
      size: [''],
      tags: [''],
      discount: [''],
      dispatchTime: [''],
      note:['']
    });
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.settingsModel = data;
      this.priceFilterModelData=data;
      console.log(this.settingsModel,"hi");
      // if(data.length === 0) {
      //   console.log(data.length);
      //   this.showNoData = true;
      // } else {
      //   this.showNoData = false;
      // }
    }, err => {
      console.log(err);
    
    });
  }

  getAllSettings(){
    this.productService.getAllSettings().subscribe(data => {
      this.allSettings = data;
      this.allSettings.forEach(e => {
        this.note = e.note;
      });
      // this.note = data.note;
      console.log(this.note,"note");
    })
  }


  createPriceRange() {
    this.showFormControl = true;
  }
  createColor() {
    this.showColorForm = true;
  }
  createMaterial() {
    this.showMaterialControl = true;
  }
  cancelPriceRange() {
    this.showFormControl = false;
  }
  cancelColor() {
    this.showColorForm = false;
  }
  cancelMaterial() {
    this.showMaterialControl = false;
  }
  createOccasion() {
    this.showOccasionControl = true;
  }
  cancelOccasion() {
    this.showOccasionControl = false;
  }
  createSize() {
    this.showSizeControl = true;
  }
  cancelSize() {
    this.showSizeControl = false;
  }
  createTags() {
    this.showTagsControl = true;
  }
  cancelTags() {
    this.showTagsControl = false;
  }
  createDiscount() {
    this.showDiscount = true;
  }
  cancelDiscount() {
    this.showDiscount = false;
  }
  createDispatchTime() {
    this.showDispatchTime = true;
  }
  cancelDispatchTime() {
    this.showDispatchTime = false;
  }

  createNote() {
    this.showNoteControl = true;
  }
  cancelNote() {
    this.showNoteControl = false;
  }

  saveNote() {
    this.message = 'Note Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.note = this.productSettingsForm.controls.note.value;
    this.productService.saveNotes(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showNoteControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }

  deleteNote(val) {
    this.message = 'Note Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.note = val;
    this.productService.deleteNote(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  savePriceRange() {
    
    this.priceFilterModel = new PriceFilter();
    this.priceFilterModel.minPrice = this.productSettingsForm.controls.priceRangeMinimum.value;
    this.priceFilterModel.maxPrice = this.productSettingsForm.controls.priceRangeMaximum.value;
    this.productService.addPriceRange(this.priceFilterModel).subscribe(data => {
      this.priceFilterModelData = data;
      this.message = 'Price Range Added';
      this.showFormControl = false;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     
      console.log(data.length);
      if(data[0].filterOptionPriceValue.length === 0) {
       
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deletePriceRange(id, val) {
    this.message = 'Price Range Deleted';
    this.productService.deletePriceRange(id, val).subscribe(data => {
      this.priceFilterModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  /* saveColor() {
    this.message = 'Color Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = this.productSettingsForm.controls.color.value;
    this.productService.addColor(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  } */
  openDeletePriceRange(id, val):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deletePriceRange(id, val);
      }
    });
  }
  deleteColor(val) {
    this.message = 'Color Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.productService.deleteColor(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveMaterial() {
    this.message = 'Material Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.material = this.productSettingsForm.controls.material.value;
    this.productService.addMaterial(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showMaterialControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteMaterial(val) {
    this.message = 'Material Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.productService.deleteMaterial(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveOccasion() {
    this.message = 'Occasion Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.occasion = this.productSettingsForm.controls.occasion.value;
    this.productService.addOccasion(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showOccasionControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteOccasion(val) {
    this.message = 'Occasion Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.productService.deleteOccasion(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveSize() {
    this.message = 'Size Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.size = this.productSettingsForm.controls.size.value;
    this.productService.addSize(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showSizeControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  viewColor() {
    this.router.navigate(['product/viewcolor']);
}
  deleteSize(val) {
    this.message = 'Size Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.productService.deleteSize(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  /* saveTags() {
    this.message = 'Tags Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.tags = this.productSettingsForm.controls.tags.value;
    this.productService.addTags(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showTagsControl = false;
    }, error => {
      console.log(error);
    });
  }
  deleteTags(val) {
    this.message = 'Tags Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.tags = val;
    this.productService.deleteTags(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showTagsControl = false;
    }, error => {
      console.log(error);
    });
  } */
  savePriceDiscount() {
    this.message = 'Discount Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.discount = this.productSettingsForm.controls.discount.value;
    this.productService.addDiscount(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showDiscount = false;
    }, error => {
      console.log(error);
    });
  }
  deleteDiscount(val) {
    this.message = 'Discount Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.discount = val;
    this.productService.deleteDiscount(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showDiscount = false;
    }, error => {
      console.log(error);
    });
  }
  saveDisptchTime() {
    this.message = 'DispatchTime Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.dispatchTime = this.productSettingsForm.controls.dispatchTime.value;
    this.productService.addDispatchTime(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showDispatchTime = false;
    }, error => {
      console.log(error);
    });
  }
  deleteDispatchTime(val) {
    this.message = 'Dispatch Time Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.dispatchTime = val;
    this.productService.deleteDispatchTime(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showDispatchTime = false;
    }, error => {
      console.log(error);
    });
  }
}
