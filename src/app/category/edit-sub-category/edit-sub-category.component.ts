import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppSetting } from '../../config/appSetting';
import { SubCategory } from '../sub-category/sub-category.model';
import { AttributeEditService } from './../attribute-edit/attribute-edit.service';
import { FieldAttributeValue } from './../../shared/model/field-attribute-value.model';
import { CategoryService } from '../category.service';
import { FieldValue } from './../../shared/model/field-value';
import { SuperCategoryImage } from '../super-category/superCategoryImageDetial.model';
@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
  categoryImageUrl;
  id;
  mainid;
  subid;
  categoryForm: FormGroup;
  holder: any;
  isChangeImage = false;
  fileToUpload: any;
  urls: any[];
  reader: FileReader;
  updateData: SubCategory;
  fileLength: any;
  subCategoryModel: SubCategory;
  deleteAttributeValue = false;
  fieldValue: FieldValue;
  activeStatus = [{ active: 'Enabled' }, { active: 'Disabled' }];
  dispatchStatus = [{ active: 'Enabled', value: true }, { active: 'Disabled', value: false }];
  fieldType: string[] = ['Text', 'Dropdown'];
  fieldSettingType: string[] = ['Size', 'Color', 'None'];
  fieldAttributeValue: any;
  imageName: SuperCategoryImage = new SuperCategoryImage();
  allSortOrder = [{number: 1}, { number: 2}, { number: 3}, { number: 4}, { number: 5}, { number: 6}, { number: 7},
    { number: 8}, { number: 9}, { number: 10}, { number: 11}, { number: 12}, { number: 13}, { number: 14}, { number: 15},
     { number: 16}, { number: 17}, { number: 18}, { number: 19}, { number: 20}, { number: 21}, { number: 21}, { number: 22},
     { number: 24}, { number: 26}, { number: 27 }, { number: 28}, { number: 29}, { number: 30}, { number: 31 },
     { number: 32}, { number: 33}, { number: 34}, { number: 35}, { number: 36}, { number: 37}, { number: 38}, { number: 39},
     { number: 40}, { number: 41}, { number: 42}, { number: 43}, { number: 44}, { number: 45}, { number: 46}, { number: 47},
     { number: 48}, { number: 49}, { number: 50}];
  imageHolder: SuperCategoryImage;
  check;
  showImage;
  selectedSortOrder: any;
  countOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private attributeEditService:AttributeEditService,
              private activatedRoute: ActivatedRoute) {
                this.categoryImageUrl = AppSetting.subCategoryImageUrl;
                this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
                this.id = params.get('id');
                this.mainid = params.get('mainid');
                this.subid = params.get('subid');
                });
               }

  ngOnInit() {
    this.createForm();
    this.getSingleSubCategory();
  }
  createForm() {
    this.categoryForm = this.fb.group({
      subCategoryName: [''],
      subCategoryDescription: [''],
      metaTagTitle: [''],
      metaTagDescription: [''],
      editCategory: [''],
      updateFieldName: [''],
      updateFieldType: [''],
      dispatch: [''],
      status: [''],
      updateFieldSettingType: [''],
      updateFieldEnable: [''],
      updateFieldEnableValue: [''],
      updateSortOrder: [''],
      attribute: this.fb.array([])
    });
  }
  getSingleSubCategory() {
    this.categoryService.getSingleSubCategory(this.id, this.mainid, this.subid).subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
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
  

  changeImage() {
    this.isChangeImage = true;
  }
  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    this.urls = [];
    this.imageName.categoryImage = this.fileToUpload[0];
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
  cancelImageUpdate() {
    this.isChangeImage = false;
  }
  
  onChange(value) {
    this.categoryForm.controls.updateFieldEnable.setValue(value.checked);
  }
  updateCategory(createForm: FormGroup) {
    this.updateData = new SubCategory();
    this.updateData.subCategoryName = createForm.controls.subCategoryName.value;
    this.updateData.subCategoryDescription = createForm.controls.subCategoryDescription.value;
    this.updateData.metaTagTitle = createForm.controls.metaTagTitle.value;
    this.updateData.metaTagDescription = createForm.controls.metaTagDescription.value;
    this.updateData.status = createForm.controls.status.value;
    this.updateData.isDispatch = createForm.controls.dispatch.value;
    this.categoryService.updateSubcategory(this.updateData, this.id, this.mainid, this.subid).subscribe(data => {
      this.updateImageName();
    }, error => {
      console.log(error);
    });
  }
  updateImageName() {
    if (!this.isChangeImage || this.fileToUpload === undefined) {
      this.router.navigate(['category/subcategory']);
    } else {
      this.uploadImages();
    }
  }
  selectSortOrder(el) {
    this.selectedSortOrder = el.value;
    console.log(el.value);
  }
  uploadImages() {
//     const formData: any = new FormData();
//  /*    this.fileLength = this.fileToUpload.length;
//     for (let i = 0; i <= this.fileLength; i++) { */
//       formData.append('single', this.imageName.categoryImage);
//    /*  } */
    this.categoryService.uploadSubCategoryImages(this.imageHolder, this.subid).subscribe(data => {
      this.updateSubCategoryImagesName(this.imageHolder.categoryImage, this.id, this.mainid, this.subid);
    }, error => {
      console.log(error);
    });
  }
  updateSubCategoryImagesName(name, supId, minId, id) {
    this.subCategoryModel = new SubCategory();
    this.subCategoryModel.subCategoryImageName = name;
    this.categoryService.editSubCategoryImagesName(this.subCategoryModel, supId, minId, id).subscribe(data => {
      this.router.navigate(['category/subcategory']);
    }, error => {
      console.log(error);
    });
  }
  cancelCategoryEdit() {
    this.router.navigate(['category/subcategory']);
  }
  updateAttribute(attribute_id){
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldName = this.categoryForm.controls.updateFieldName.value;
    this.fieldValue.fieldType =   this.categoryForm.controls.updateFieldType.value;
    this.fieldValue.fieldSetting =   this.categoryForm.controls.updateFieldSettingType.value;
    this.fieldValue.fieldEnable =   this.categoryForm.controls.updateFieldEnable.value;
    this.fieldValue.fieldEnableValue = this.categoryForm.controls.updateFieldEnableValue.value;
    this.fieldValue.sortOrder = this.categoryForm.controls.updateSortOrder.value;
    this.categoryService.subCategoryEditAttribute(this.id, this.mainid, this.subid, attribute_id, this.fieldValue).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  deleteAttributeSingle(attribute_id){
    this.categoryService.subCategoryDeleteAttribute(this.id, this.mainid, this.subid, attribute_id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addAttribute() {
    this.subCategoryModel = new SubCategory();
    
    const filterAttribute =  this.categoryForm.controls.attribute.value;
   filterAttribute.forEach(element => {
     element.fieldName = this.convertSentence(element.fieldName);
   });
   this.subCategoryModel.attribute = this.categoryForm.controls.attribute.value;
    this.categoryService.subCategoryAddAttribute(this.id, this.mainid, this.subid,  this.subCategoryModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  updateAttributeValueField(attribute_id, field_id, fieldAttributeValue){
    this.fieldAttributeValue = new FieldAttributeValue();
    this.fieldAttributeValue.fieldAttributeValue = fieldAttributeValue;
    this.fieldAttributeValue.sortOrder = this.selectedSortOrder;
    this.categoryService.subCategoryEditAttributeValueField(this.id, this.mainid, this.subid, attribute_id, field_id, this.fieldAttributeValue).subscribe(data => {
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
  
  deleteAttributeValueField(attribute_id, field_id) {
    this.categoryService.subCategoryDeleteAttributeValueField(this.id, this.mainid, this.subid, attribute_id, field_id).subscribe(data => {
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
    })
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
  addFieldValueOpen(att) {
    const selectAttribute = { catId: this.id, mainId:  this.mainid, subId: this.subid, attributeId: att, name: 'Sub'};
    this.attributeEditService.openAttribute(selectAttribute).subscribe(data => {
      this.holder = data;
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
