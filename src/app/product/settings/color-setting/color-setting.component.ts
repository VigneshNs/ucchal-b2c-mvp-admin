import { Component, OnInit } from '@angular/core';
import { Color } from './color-settings.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProductService } from './../../product.service';
import {DeleteConfirmBoxComponent} from '../../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-color-setting',
  templateUrl: './color-setting.component.html',
  styleUrls: ['./color-setting.component.css']
})
export class ColorSettingComponent implements OnInit {
  colorModel: any;
  colorCodes:any;
  colorSettingsForm: FormGroup;
  showFormControl: boolean;
  showColorForm: boolean;
  showMaterialControl: boolean;
  showOccasionControl: boolean;
  showSizeControl: boolean;
  showTagsControl: boolean;
  message;
  action;
  public hue: string;
  color: string;
  displayedColumns: string[] = ['color', 'colorName', 'action'];
  // privacyPolicyForm: FormGroup;
  colorModels: Color;
  constructor(private fb: FormBuilder,private dialog:MatDialog, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getColor();
  }
  createForm() {
    this.colorSettingsForm = this.fb.group({
      colorName: [''],
      colorChoose: this.fb.array([])
    });
    this.addColorForm();
  }
  addColorForm() {
    const colorChoose = this.fb.group({
      chooseColor: ['', Validators.required],
      // policyAnswers: ['', Validators.required],
    });
    this.colorForms.push(colorChoose);
  }
  get colorForms() {
    return this.colorSettingsForm.get('colorChoose') as FormArray;
  }
  deletePolicies(i) {
    this.colorForms.removeAt(i);
  }
  createColor(colorSettingsForm: FormGroup) {                    // Create Privacy Policy
    const colorModels = new Color();
    colorModels.colorName = colorSettingsForm.controls.colorName.value;
    colorModels.colorChoose = colorSettingsForm.controls.colorChoose.value.map(e => e.chooseColor);
    this.productService.addColor(colorModels).subscribe(data => {
      this.colorModel = data;
    }, error => {
      console.log(error);
    });
    this.colorSettingsForm.reset();
  }
  // createForm() {
  //   this.colorSettingsForm = this.fb.group({
  //     colorName: [],
  //     // colorCode: [],
  //     colorChoose: this.fb.array([]),
  //   });
  // }


  // saveColor() {
  //   this.message = 'Color Added';
  //   const colorModel = new Color();
  //   colorModel.colorName = this.colorSettingsForm.controls.colorName.value;
  //    colorModel.colorChoose = this.colorSettingsForm.controls.colorChoose.value;
  //   // this.colorModel.colorCode = this.color;
  //   this.productService.addColor(colorModel).subscribe(data => {
  //   this.colorModel = data;
  //     this.getColor();
  //     this.snackBar.open(this.message, this.action, {
  //       duration: 3000,
  //     });
  //   }, err => {
  //     console.log(err);
  //   });
  //   this.colorSettingsForm.reset();
  // }
  cancel() {
      this.router.navigate(['product/productsettings']);
  }
  getColor() {
    this.productService.getColors().subscribe(data => {
      this.colorModel = data;
      console.log('color',this.colorModel);
    }, err => {
      console.log(err);
    });
    this.colorSettingsForm.reset();
  }
  openDialog(value):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this.deleteSingleColor(value);
      }
    });
  }
  deleteSingleColor(id) {
    this.message = 'Color Deleted';
    this.productService.deleteColor(id).subscribe(data => {
      this.colorModel = data;
      console.log('delete color',this.colorModel);
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
}
