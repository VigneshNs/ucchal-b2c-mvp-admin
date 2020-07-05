import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppSetting } from '../../config/appSetting';
import { MainCategory } from './../../shared/model/mainCategory.model';
import { FieldValue } from '../../shared/model/field-value';
import { FieldAttributeValue } from '../../shared/model/field-attribute-value.model';
import { CategoryService } from '../category.service';
import { AttributeEditService } from './../attribute-edit/attribute-edit.service';
import { SuperCategoryImage } from '../super-category/superCategoryImageDetial.model';

@Component({
  selector: 'app-edit-main-category',
  templateUrl: './edit-main-category.component.html',
  styleUrls: ['./edit-main-category.component.css']
})
export class EditMainCategoryComponent implements OnInit {
  categoryImageUrl;
  id;
  mainid: string;
  categoryForm: FormGroup;
  holder: any;
  mainCat: MainCategory;
  deleteAttributeValue = false;
  fieldValue: FieldValue;
  fieldAttributeValue: FieldAttributeValue;
  fieldType: string[] = ['Text', 'Dropdown'];
  fieldSettingType: string[] = ['Size', 'Color', 'None'];
  isChangeImage = false;
  fileToUpload: any;
  imageError: boolean;
  urls: any[];
  reader: FileReader;
  imageName: SuperCategoryImage = new SuperCategoryImage();
  imageHolder: SuperCategoryImage;
  check;
  showImage;
  activeStatus = [{ active: 'Enabled' }, { active: 'Disabled' }];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute, private attributeEditService: AttributeEditService) {
    this.categoryImageUrl = AppSetting.mainCategoryBannerImageUrl;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.mainid = params.get('mainid');
    });
  }

  ngOnInit() {
    this.createForm();
    this.getMainCategory();
  }
  createForm() {
    this.categoryForm = this.fb.group({
      mainCategoryName: [''],
      mainCategoryDescription: [''],
      metaTagTitle: [''],
      metaTagDescription: [''],
      status: [''],
      updateFieldName: [''],
      updateFieldType: [''],
      updateFieldSettingType: [''],
      updateFieldEnable: [''],
      updateFieldEnableValue: [''],
      attribute: this.fb.array([])
    }, error => {
      console.log(error);
    });
  }

  changeImage() {
    this.isChangeImage = true;
  }
  getMainCategory() {
    this.categoryService.getSingleMainCategory(this.id, this.mainid).subscribe(data => {
      this.holder = data;
      console.log('main', this.holder);
    }, error => {
      console.log(error);
    });
  }
  updateMainCategory(categoryForm: FormGroup) {
    this.mainCat = new MainCategory();
    this.mainCat.mainCategoryName = categoryForm.controls.mainCategoryName.value;
    this.mainCat.mainCategoryDescription = categoryForm.controls.mainCategoryDescription.value;
    this.mainCat.status = categoryForm.controls.status.value;
    this.categoryService.updateMainCategory(this.mainCat, this.id, this.mainid).subscribe(data => {
      /* this.router.navigate(['category/maincategory']); */
      this.checkMainCategory();
    }, error => {
      console.log(error);
    });
  }
  checkMainCategory() {
    if (this.imageHolder !== undefined) {
      this.uploadImages();
    } else {
      this.router.navigate(['category/maincategory']);
    }
  }
  cancelMainCategoryEdit() {
    this.router.navigate(['category/maincategory']);
  }
  cancelAttribute() {
    this.holder.attribute.forEach(element => {
      element.showDiv = false;
    });
  }
  editAttribute(id) {
    this.holder.attribute.forEach(element => {
      if (element._id === id) {
        element.showDiv = true;
      } else {
        element.showDiv = false;
      }
    });
  }
  editAttributeValue(field, fieldId) {
    field.forEach(element => {
      element.showFieldDiv = false;
      if (element._id === fieldId) {
        element.showFieldDiv = true;
      }
    });
  }
  cancelAttributeValue(field) {

    field.forEach(element => {
      element.showFieldDiv = false;
    });
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
    })
  }
  updateFiledValue() {
    return this.fb.group({
      fieldAttributeValue: ['', Validators.required]
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
    const selectAttribute = { catId: this.id, mainId: this.mainid, attributeId: att, name: 'Main' };
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
    const control = (<FormArray>(<FormArray>this.categoryForm.controls['attribute']).at(ix).get('fieldValue') as FormArray);
    control.removeAt(iy);
  }
  get categoryFieldsValueForms() {
    return this.categoryForm.get('attribute') as FormArray;
  }
  deleteAttribute(i) {
    this.categoryFieldsValueForms.removeAt(i);
  }

  updateAttribute(attribute_id) {
    this.fieldValue = new FieldValue();
    this.fieldValue.fieldName = this.categoryForm.controls.updateFieldName.value;
    this.fieldValue.fieldType = this.categoryForm.controls.updateFieldType.value;
    this.fieldValue.fieldSetting = this.categoryForm.controls.updateFieldSettingType.value;
    this.fieldValue.fieldEnable = this.categoryForm.controls.updateFieldEnable.value;
    this.fieldValue.fieldEnableValue = this.categoryForm.controls.updateFieldEnableValue.value;
    this.categoryService.mainCategoryEditAttribute(this.id, this.mainid, attribute_id, this.fieldValue).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  deleteAttributeSingle(attribute_id) {
    this.categoryService.mainCategoryDeleteAttribute(this.id, this.mainid, attribute_id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addAttribute() {
    this.mainCat = new MainCategory();
    const filterAttribute = this.categoryForm.controls.attribute.value;
    filterAttribute.forEach(element => {
      element.fieldName = this.convertSentence(element.fieldName);
    });
    this.mainCat.attribute = this.categoryForm.controls.attribute.value;
    this.categoryService.mainCategoryAddAttribute(this.id, this.mainid, this.mainCat).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  updateAttributeValueField(attribute_id, field_id, fieldAttributeValue) {
    this.fieldAttributeValue = new FieldAttributeValue();
    this.fieldAttributeValue.fieldAttributeValue = fieldAttributeValue;
    this.categoryService.mainCategoryEditAttributeValueField(this.id, this.mainid, attribute_id, field_id, this.fieldAttributeValue).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  convertSentence(text) {
    var output = text.replace(/\w+/g, function (txt) {
      // uppercase first letter and add rest unchanged
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/\s/g, '');
    const test = output.replace(/^\w/, c => c.toLowerCase());
    return test;
  }

  deleteAttributeValueField(attribute_id, field_id) {
    /* console.log(attribute_id, field_id); */
    this.categoryService.mainCategoryDeleteAttributeValueField(this.id, this.mainid, attribute_id, field_id).subscribe(data => {
      /* this.holder = data; */
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

  cancelCategoryEdit() {
    this.router.navigate(['category/subcategory']);
  }
  selectDropdown(e, attribute) {
    if (e.value === 'Text' && attribute.length > 0) {
      this.deleteAttributeValue = true;
    } else {
      this.deleteAttributeValue = false;
    }
  }
  /* handleFileInput(images: any) {
    this.fileToUpload = images;
    this.imageError = false;
    this.imageName.categoryImage = this.fileToUpload[0];
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
   cancelImageUpdate() {
     this.isChangeImage = false;
     this.urls = [];
   }
   uploadImages() {
  //   const formData: any = new FormData();
  //   /* this.fileLength = this.fileToUpload.length; */
  //  /*  for (let i = 0; i <= this.fileLength; i++) { */
  //   formData.append('single', this.imageName.categoryImage);
  //   /* } */
    this.categoryService.mainCategoryImagesUpload(this.imageHolder, this.mainid).subscribe(data => {
      this.urls = [];
      this.updateImageName(this.imageHolder.categoryImage, this.id, this.mainid);
    }, error => {
      console.log(error);
    });
  }
  updateImageName(name, supId, id) {
    const imageName = new MainCategory();
    imageName.mainCategoryImageName = name;
    this.categoryService.uploadMainCategoryImagesName(imageName, supId, id).subscribe(data => {
      this.router.navigate(['category/maincategory']);
      this.isChangeImage = false;
    }, error => {
      console.log(error);
    });
  }
}
