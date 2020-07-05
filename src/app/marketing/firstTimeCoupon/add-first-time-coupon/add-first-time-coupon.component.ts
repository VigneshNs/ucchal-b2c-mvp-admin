import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { Coupon } from './coupon.model';
import { Condition } from './condition.model';
import { MarketingService } from '../../marketing.service';

@Component({
  selector: 'app-add-first-time-coupon',
  templateUrl: './add-first-time-coupon.component.html',
  styleUrls: ['./add-first-time-coupon.component.css']
})
export class AddFirstTimeCouponComponent implements OnInit {
  couponForm: FormGroup;
  /* amountType = ['Flat', 'Percentage']; */
  amountType = 'Percentage';
  /* Field = ['Order total', 'Order quantity']; */
  Field = 'Order quantity';
  Operator = ['equal', 'greater than', 'less than'];
  showPercentage = false;
  isOrderTotal = false;
  isOrderQty = false;
  isCouponStatus = false;
  isAdvanceSettig = false;
  createHolder;
  createSubHolder;

  constructor(private marketingService: MarketingService, private snakeBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.couponForm = this.fb.group({
      couponCode: [''],
      description: [''],
      amountType: [''],
      typeValue: [''],
      couponStatus: [''],
      maximumUsage: [0],
      startDate: [''],
      endDate: [''],
      field: [''],
      operator: [''],
      value: [''],
      advanceSettings: ['']
    });
  }
  changesAmountType(event) {
    this.couponForm.controls.typeValue.reset();
    if (event.value === 'Percentage') {
      this.showPercentage = true;
    } else {
      this.showPercentage = false;
    }
  }
  changesField(event) {
    if (event.value === 'Order total') {
      this.isOrderTotal = true;
    } else if (event.value === 'Order quantity') {
      this.isOrderQty = true;
    }
  }
  changeCouponStatus() {
    this.isCouponStatus = !this.isCouponStatus;
  }
  changeAdvanceSettings() {
    this.isAdvanceSettig = !this.isAdvanceSettig;
  }
  createDiscount(couponForm: FormGroup) {
    this.createHolder = new Coupon();
    this.createHolder.couponCode = couponForm.controls.couponCode.value.toUpperCase();
    this.createHolder.description = couponForm.controls.description.value;
    this.createHolder.amountType = this.amountType;
    this.createHolder.typeValue = couponForm.controls.typeValue.value;
   /*  this.createSubHolder = new Condition();
    this.createSubHolder.field = this.Field;
    this.createSubHolder.operator = couponForm.controls.operator.value;
    this.createSubHolder.value = couponForm.controls.value.value; */
   /*  if (!this.isAdvanceSettig) {
      couponForm.controls.maximumUsage.reset();
      couponForm.controls.startDate.reset();
      couponForm.controls.endDate.reset();
    } */
    /* this.createHolder.maximumUsage = couponForm.controls.maximumUsage.value;
    this.createHolder.startDate = couponForm.controls.startDate.value;
    this.createHolder.endDate = couponForm.controls.endDate.value; */
   /*  this.createHolder.conditions = this.createSubHolder; */
   /*  this.createHolder.advanceSettings = this.isAdvanceSettig; */
    this.createHolder.couponStatus = this.isCouponStatus;
    this.marketingService.createFirstTimeCoupon(this.createHolder).subscribe(data => {
      this.router.navigate(['marketing/viewfirstcoupon']);
    }, error => {
      console.log(error);
    });
  }
  cancelCreation() {
    this.router.navigate(['marketing/viewfirstcoupon']);
  }
}
