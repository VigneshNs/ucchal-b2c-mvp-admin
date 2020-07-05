import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DispatchFilter } from './../../../shared/model/dispatch-filter.model';
import { ProductService } from '../../product.service';
import
 { ProductSettings } from './../../product-settings/product-settings.model';
import {DeleteConfirmBoxComponent} from '../../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-dispatch-setting',
  templateUrl: './dispatch-setting.component.html',
  styleUrls: ['./dispatch-setting.component.css']
})

export class DispatchSettingComponent implements OnInit {
  productSettingsForm: FormGroup;
  showFormControl: boolean;
  showColorForm: boolean;
  showMaterialControl: boolean;
  showOccasionControl: boolean;
  showSizeControl: boolean;
  showTagsControl: boolean;
  dispatchFilterModelData: DispatchFilter;
  dispatchFilterModel: DispatchFilter;
  settingsModelData: ProductSettings;
settingsModel: ProductSettings;
  message;
  showNoData:boolean;
  action;
  constructor(private fb: FormBuilder,private dialog:MatDialog, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getProductSettings();
  }
  createForm() {
    this.productSettingsForm = this.fb.group({
      dispatchDay: [],
      
    });
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.dispatchFilterModelData = data;
      
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
  createPriceRange() {
    this.showFormControl = true;
  }
  createColor() {
    this.showColorForm = true;
  }
  createMaterial() {
    this.showMaterialControl = true;
  }
  dispatchRangeMaximum() {
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
  saveDispatchRange() {
    
    this.dispatchFilterModel = new DispatchFilter();
    this.dispatchFilterModel.day = this.productSettingsForm.controls.dispatchDay.value;
    this.productService.addDispatchRange(this.dispatchFilterModel).subscribe(data => {
      this.dispatchFilterModelData = data;
      this.dispatchFilterModelData[0].filterDispatchValue = this.dispatchFilterModelData[0].filterDispatchValue.sort((a,b)=> a.day-b.day);
      console.log('day',this.dispatchFilterModelData)
      this.message = 'Dispatch Range Added';
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showFormControl = false;
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
  deleteDispatchRange(id, val) {
    this.message = 'Price Dispatch Deleted';
    this.productService.deleteDispatchRange(id, val).subscribe(data => {
      this.dispatchFilterModelData = data;
      this.dispatchFilterModelData[0].filterDispatchValue = this.dispatchFilterModelData[0].filterDispatchValue.sort((a,b)=> a.day-b.day);
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
  openDeleteDispatchRange(id, val):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteDispatchRange(id, val);
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
}
