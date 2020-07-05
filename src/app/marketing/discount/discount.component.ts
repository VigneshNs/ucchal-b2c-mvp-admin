import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { DiscountModel } from './discount.model';
import { DiscountCondition } from './discountCondition.model';
import { MarketingService } from '../marketing.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discountForm: FormGroup;
  amountType = ['Flat', 'Percentage'];
  fieldType = ['Product Name', 'Product Category'];
  operatorValue;
  showPercentage = false;
  showCondition = false;
  showProduct = false;
  showCategory = false;
  afterSelect = false;
  setAllOffer = false;
  checked = false;
  dataStore: any;
  advancedSetting = false;
  discoutModel;
  fieldValue: any;
  conditionModel: DiscountCondition;
  dataSource: any;
  productID: any;
  proudctStorage: any;
  holderValue: any;
  holder: any;
  catVal: any;
  proudctData: any;
  categoryData: any;

  constructor(private marketingService: MarketingService, private snakeBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.getDiscount();
    this.getAllCategory();
    this.getAllProduct();
  }
  createForm() {
    this.discountForm = this.fb.group({
      name: [''],
      amountType: [''],
      typeValue: [''],
      applyOn: [''],
      startDate: [''],
      endDate: [''],
      field: [''],
      operator: [''],
      value: ['']
      /* conditions: this.fb.array([]) */
    });
    /* this.addForm(); */
  }
  /* addForm() {
    const conditions = this.fb.group({
      field: [''],
      operator: [''],
      value: ['']
    });
    this.conditionForm.push(conditions);
  }
  get conditionForm() {
    return this.discountForm.get('conditions') as FormArray;
  } */
  getDiscount() {
    this.marketingService.getDiscount().subscribe(data => {
      this.dataSource = data;
      this.dataSource = this.dataSource.map(element => element.conditions.map(elem => elem.value));
      this.productID = this.dataSource.flat(Infinity);
      console.log(this.productID);
    }, error => {
      console.log(error);
    });
  }
  changesPercentage(event) {
    if (event.value === 'Percentage') {
      this.showPercentage = true;
    } else {
      this.showPercentage = false;
    }
  }
  changeApplyOn(event) {
    if (event.value === 'allProduct') {
      this.discountForm.controls.conditions.reset();
      this.showCondition = false;
    } else {
      this.showCondition = true;
    }
  }
  changesField(event) {
    this.afterSelect = true;
    if (event.value === 'Product Name') {
      this.operatorValue = ['All_Offer_Proudct', 'All_UnOffered_Product'];
      this.showProduct = true;
      this.showCategory = false;
    } else if (event.value === 'Product Category') {
      this.operatorValue = ['All_Offer_Category', 'All_UnOffered_Category'];
      this.showProduct = false;
      this.showCategory = true;
    }
    this.getOperationValue();
  }
  getOperationValue() {
    if (this.showProduct) {
      this.dataStore = this.proudctData;
    } else if (this.showCategory) {
      this.dataStore = this.categoryData;
    }
    }
  changesProductName(event) {
    if (this.showCategory) {
      console.log(event.value);
    }
  }
  getAllProduct() {
    this.marketingService.getProducts().subscribe(data => {
      this.holderValue = data;
      this.proudctData = data;
      console.log('product', this.proudctData);
    }, err => {
      console.log(err);
    });
  }
  proudctOperation(event) {
    if (this.showProduct) {
      if (event.value === 'All_Offer_Proudct') {
        this.proudctStorage = this.dataStore;
      } else {
        this.proudctStorage = this.dataStore.filter(element => !this.productID.includes(element._id));
      }
    } else if (this.showCategory) {
      if (event.value === 'All_Offer_Category') {
        this.setAllOffer = true;
      } else {
        this.setAllOffer = false;
      }
    }
  }
  getAllCategory() {
      this.marketingService.getSuperCategory().subscribe(data => {
        this.categoryData = data;
        console.log(this.categoryData);
      }, err => {
        console.log(err);
      });
  }


changeValue(value) {
    this.checked = !value;
}
changeAdvancedSetting(advancedSetting) {
  this.advancedSetting = !advancedSetting;
  this.discountForm.controls.startDate.reset();
  this.discountForm.controls.endDate.reset();
}

onSubmit() {
  this.discoutModel = new DiscountModel();
  this.discoutModel.name = this.discountForm.controls.name.value;
  this.discoutModel.amountType = this.discountForm.controls.amountType.value;
  this.discoutModel.typeValue = this.discountForm.controls.typeValue.value;
  this.discoutModel.applyOn = this.discountForm.controls.applyOn.value;
  /* this.discoutModel.conditions = this.discountForm.controls.conditions.value; */
  this.discoutModel.discountStatus = this.checked;
  this.discoutModel.advanceSettings = this.advancedSetting;
  this.discoutModel.startDate = this.discountForm.controls.startDate.value;
  this.discoutModel.endDate = this.discountForm.controls.endDate.value;
  this.conditionModel = new DiscountCondition();
  this.conditionModel.field = this.discountForm.controls.field.value;
  this.conditionModel.operator = this.discountForm.controls.operator.value;
  /* this.conditionModel.value = this.catVal.map(el => el._id); */
  this.conditionModel.value = this.discountForm.controls.value.value;
  this.discoutModel.conditions = this.conditionModel;
  this.marketingService.createDiscount(this.discoutModel).subscribe(data => {
    console.log(data);
    this.cancel();
  }, error => {
    console.log(error);
  });
}
cancel() {
  this.router.navigate(['marketing/viewDiscount']);
}
onCheck() {
  if (this.showProduct) {
    this.catVal = this.discountForm.controls.value.value;
  } else if (this.showCategory) {
    console.log(this.holderValue);
    this.holder = this.holderValue.filter(element => this.discountForm.controls.value.value.includes(element.superCategoryId) );
    console.log(this.holder);
    if (this.setAllOffer) {
      this.catVal = this.holder;
    } else {
      this.catVal = this.holder.filter(element => !this.productID.includes(element._id));
      console.log(this.catVal);
    }
  }
  this.onSubmit();
}

}
