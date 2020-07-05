import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppSetting } from '../../config/appSetting';
import { SuperCategory } from '../super-category/superCategory.model';
import { FieldValue } from '../../shared/model/field-value';
import { CategoryService } from '../category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.css']
})
export class AttributeEditComponent implements OnInit {
  categoryForm: FormGroup;
  fieldValue: FieldValue;
  constructor(private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
  public dialogRef: MatDialogRef<AttributeEditComponent>, 
    private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.categoryForm = this.fb.group({
      fieldValue: this.fb.array([])
    });
  }

  addForm() {
    const fieldValue = this.fb.group({
      fieldAttributeValue: ['', Validators.required]
    });
    this.fieldAttributeValueForms.push(fieldValue);
  }
  addAttribute(catId, attId){
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldValue = this.categoryForm.controls.fieldValue.value;
    this.categoryService.addAttributeValueField(catId, attId, this.fieldValue).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
    
  }
  updateSubcategoryAttribute(catId, mainId, subId, attributeId) {
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldValue = this.categoryForm.controls.fieldValue.value;
    this.categoryService.subCategoryAddAttributeValueField(catId, mainId, subId, attributeId, this.fieldValue).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
  }
  addMainAttribute(catId, mainId, attributeId) {
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldValue = this.categoryForm.controls.fieldValue.value;
    this.categoryService.mainCategoryAddAttributeValueField(catId, mainId,  attributeId, this.fieldValue).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
  }
  addSuperAttribute(catId, attributeId) {
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldValue = this.categoryForm.controls.fieldValue.value;
    this.categoryService.addAttributeValueField(catId, attributeId, this.fieldValue).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
  }
get fieldAttributeValueForms() {
  return this.categoryForm.get('fieldValue') as FormArray;
}

deleteAttribute(i) {
  this.fieldAttributeValueForms.removeAt(i);
}

}
