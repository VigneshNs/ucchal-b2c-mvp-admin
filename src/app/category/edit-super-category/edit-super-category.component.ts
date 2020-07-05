import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SuperCategoryImage } from '../super-category/superCategoryImageDetial.model';
import { MatIconModule } from '@angular/material/icon';
import { AppSetting } from '../../config/appSetting';
import { SuperCategory } from '../super-category/superCategory.model';
import { AttributeEditService } from './../attribute-edit/attribute-edit.service';
import { FieldAttributeValue } from './../../shared/model/field-attribute-value.model';
import { CategoryService } from '../category.service';
import { FieldValue } from './../../shared/model/field-value';

@Component({
  selector: 'app-edit-super-category',
  templateUrl: './edit-super-category.component.html',
  styleUrls: ['./edit-super-category.component.css']
})
export class EditSuperCategoryComponent implements OnInit {
  categoryImageUrl: string;
  id: string;
  holder: any;
  categoryForm: FormGroup;
  activeStatus = [{ active: 'Enabled' }, { active: 'Disabled' }];
  dispatchStatus = [{ active: 'Enabled', value: true }, { active: 'Disabled', value: false }];
  updateData: any;
  isChangeImage = false;
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  fileLength: any;
  superCategoryModel: SuperCategory;
  imageHolder;
  fieldType: string[] = ['Text', 'Dropdown'];
  fieldSettingType: string[] = ['Size', 'Color', 'None'];
  deleteAttributeValue = false;
  fieldValue :FieldValue;
  countOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  fieldAttributeValue: any;
  allSortOrder = [{number: 1}, { number: 2}, { number: 3}, { number: 4}, { number: 5}, { number: 6}, { number: 7},
    { number: 8}, { number: 9}, { number: 10}, { number: 11}, { number: 12}, { number: 13}, { number: 14}, { number: 15},
     { number: 16}, { number: 17}, { number: 18}, { number: 19}, { number: 20}, { number: 21}, { number: 21}, { number: 22},
     { number: 24}, { number: 26}, { number: 27 }, { number: 28}, { number: 29}, { number: 30}, { number: 31 },
     { number: 32}, { number: 33}, { number: 34}, { number: 35}, { number: 36}, { number: 37}, { number: 38}, { number: 39},
     { number: 40}, { number: 41}, { number: 42}, { number: 43}, { number: 44}, { number: 45}, { number: 46}, { number: 47},
     { number: 48}, { number: 49}, { number: 50}];
  check: string | ArrayBuffer;
  showImage: string | ArrayBuffer;
  selectedSortOrder: any;
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute, private attributeEditService: AttributeEditService ) {
    this.categoryImageUrl = AppSetting.categoryImageUrl;
  
    /* this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    }); */
   }


  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.holder = data.supcategory;
      this.createForm();  
    });
    
    
    
  }
  cancelAttribute() {
    this.holder.attribute.forEach(element => {
        element.showDiv = false;
    });
  }
  editAttribute(id)   {
    this.holder.attribute.forEach(element => {
      if (element._id === id ) {
        element.showDiv = true;
      } else {
        element.showDiv = false;
      }
    });
  }
  editAttributeValue(field, fieldId){
    field.forEach(element => {
        element.showFieldDiv = false;
      if (element._id === fieldId ) {
        element.showFieldDiv = true;
      } 
    });
  }
  cancelAttributeValue(field){
    
    field.forEach(element => {
        element.showFieldDiv = false;
    });
  }
  
createForm() {
  this.categoryForm = this.fb.group({
    id: [''],
    categoryName: ['', Validators.required],
    categoryDescription: ['', Validators.required],
    sortOrder: ['', Validators.required],
    status: [''],
    editCategory: [''],
    dispatch: [''],
    updateFieldName: [''],
    updateFieldType: [''],
    updateFieldSettingType: [''],
    updateFieldEnable: [''],
    updateFieldEnableValue: [''],
    updateSortOrder: [''],
    attribute: this.fb.array([])
  });
}

updateCategory(categoryForm: FormGroup) {
  this.updateData = new SuperCategory();
  this.updateData.categoryName = categoryForm.controls.categoryName.value;
  this.updateData.categoryDescription = categoryForm.controls.categoryDescription.value;
  this.updateData.sortOrder = categoryForm.controls.sortOrder.value;
  this.updateData.status = categoryForm.controls.status.value;
  this.updateData.isDispatch = categoryForm.controls.dispatch.value;
  this.categoryService.updateSuperCategory(this.updateData, this.holder._id).subscribe(data => {
    this.updateImageName();
  }, error => {
    console.log(error);
  });
}
updateImageName() {
  /* if (!this.isChangeImage || this.fileToUpload === undefined) {
    this.router.navigate(['category/supercategory']);
  } else {
    this.uploadImages();
  } */
  if (this.imageHolder.categoryImageName) {
    this.uploadImages();
  } else {
    this.router.navigate(['category/supercategory']);
  }
}
cancelImageUpdate() {
  this.isChangeImage = false;
}
uploadImages() {
  /* const formData: any = new FormData();
  this.fileLength = this.fileToUpload.length;
  for (let i = 0; i <= this.fileLength; i++) {
    formData.append('single', this.fileToUpload[i]);
  } */
  this.categoryService.uploadImages(this.imageHolder, this.holder._id).subscribe(data => {
    this.updateSuperCategoryImagesName(this.imageHolder.categoryImage);
   /*  this.superCategoryFilter = data;
    this.superCategoryData = new MatTableDataSource<PeriodicElement>(data); */
    this.urls = [];
  }, error => {
    console.log(error);
  });
}
updateSuperCategoryImagesName(name) {
  this.superCategoryModel = new SuperCategory();
  this.superCategoryModel.categoryImageName = name;
  this.categoryService.editSuperCategoryImagesName(this.superCategoryModel, this.holder._id).subscribe(data => {
    /* this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    this.urls = []; */
    this.router.navigate(['category/supercategory']);
  }, error => {
    console.log(error);
  });
}
changeImage() {
  this.isChangeImage = true;
}
// handleFileInput(images: any) {
//   this.fileToUpload = images;
//   this.urls = [];
//   const files = images;
//   if (files) {
//     for (const file of files) {
//       this.reader = new FileReader();
//       this.reader.onload = (e: any) => {
//         this.urls.push(e.target.result);
//       };
//       this.reader.readAsDataURL(file);
//     }
//   }
// }
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
  this.imageHolder = this.imageHolder;
}
cancelCategoryEdit() {
  this.router.navigate(['category/supercategory']);
}
updateAttribute(attribute_id){
  this.fieldValue = new FieldValue();
  this.fieldValue.fieldName = this.categoryForm.controls.updateFieldName.value;
  this.fieldValue.fieldType =   this.categoryForm.controls.updateFieldType.value;
  this.fieldValue.fieldSetting =   this.categoryForm.controls.updateFieldSettingType.value;
  this.fieldValue.fieldEnable =   this.categoryForm.controls.updateFieldEnable.value;
  this.fieldValue.fieldEnableValue = this.categoryForm.controls.updateFieldEnableValue.value;
  this.fieldValue.sortOrder = this.categoryForm.controls.updateSortOrder.value;
  this.categoryService.editAttribute(this.holder._id, attribute_id, this.fieldValue).subscribe(data => {
    this.holder = data;
  }, error => {
    console.log(error);
  });
}
deleteAttributeSingle(attribute_id){
  this.categoryService.deleteAttribute(this.holder._id, attribute_id).subscribe(data => {
    this.holder = data;
  }, error => {
    console.log(error);
  });
}
addAttribute() {
  this.superCategoryModel = new SuperCategory();
  const filterAttribute = this.categoryForm.controls.attribute.value;
   filterAttribute.forEach(element => {
     element.fieldName = this.convertSentence(element.fieldName);
   });
  this.superCategoryModel.attribute = this.categoryForm.controls.attribute.value;
  this.categoryService.addAttribute(this.holder._id, this.superCategoryModel).subscribe(data => {
    this.holder = data;
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
 selectSortOrder(el) {
   this.selectedSortOrder = el.value;
   console.log(el.value);
 }
updateAttributeValueField(attribute_id, field_id, fieldAttributeValue){
  this.fieldAttributeValue = new FieldAttributeValue();
  this.fieldAttributeValue.fieldAttributeValue = fieldAttributeValue;
  this.fieldAttributeValue.sortOrder = this.selectedSortOrder;
  this.categoryService.editAttributeValueField(this.holder._id, attribute_id, field_id, this.fieldAttributeValue).subscribe(data => {
    this.holder = data;
  }, error => {
    console.log(error);
  });
}
deleteAttributeValueField(attribute_id, field_id) {
  this.categoryService.deleteAttributeValueField(this.holder._id, attribute_id, field_id).subscribe(data => {
    this.holder = data;
  }, error => {
    console.log(error);
  });
}

selectDropdownControl(e, ix) {
  /* this.fileldTypeStatic = e.value; */
  const controlAttributValue = (<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
  const control = (<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldType') as FormArray;
  controlAttributValue.removeAt(ix);
  control.setValue(e.value);
  /* (<FormArray>this.subCategoryForm.controls['attribute']).at(ix).get('fieldType').setValue(e.value); */
}
selectDropdown(e, attribute) {
  if(e.value === 'Text' && attribute.length > 0){
    this.deleteAttributeValue = true;
  } else  {
    this.deleteAttributeValue = false;
  }
}


addForm() {
  const fieldValue = this.fb.group({
    fieldName: ['', Validators.required],
    fieldType: ['Text'],
    fieldSetting: ['None', Validators.required],
    fieldEnable: [false, Validators.required],
    fieldEnableValue: [false, Validators.required],
    sortOrder: ['', Validators.required],
    fieldValue: this.fb.array([])  
  });
  this.categoryFieldsValueForms.push(fieldValue);
}
initFiledValue() {
  return this.fb.group({
    fieldAttributeValue: ['', Validators.required],
    sortOrder: ['']
  });
}
updateFiledValue() {
  return this.fb.group({
    fieldAttributeValue: ['', Validators.required],
    sortOrder: ['']
  })
}


selectTypeSetting(e, ix) {
  const controlAttributValue = (<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
  const control = (<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldSetting') as FormArray;
  controlAttributValue.removeAt(ix);
  control.setValue(e.value);
  console.log(control);
}
editFiledValue() {
  const control = (<FormArray>this.categoryForm.controls['updateFieldValue']) as FormArray;
  control.push(this.initFiledValue());
}
get updatedFieldsValueForms() {
  return this.categoryForm.get('updateFieldValue') as FormArray;
}
addFieldValueOpen(catId, att) {
  const selectAttribute = {catId: catId, dataId: att, name: 'Sup'};
  this.attributeEditService.openAttribute(selectAttribute).subscribe(data => {
    if(data){
    this.holder = data;
  }
  }, error => {
    console.log(error);
  });
}

addFiledValue(ix) {
  const control = (<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray;
  control.push(this.initFiledValue());
}
/* var s = input;
s = s.replace(/([A-Z])/g, ' $1').trim();
return s; */
removeFiledValue(ix, iy) {
  const control = (<FormArray>(<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldValue')  as FormArray);
  control.removeAt(iy);
}
get categoryFieldsValueForms() {
  return this.categoryForm.get('attribute') as FormArray;
}
deleteAttribute(i) {
  this.categoryFieldsValueForms.removeAt(i);
}
}
