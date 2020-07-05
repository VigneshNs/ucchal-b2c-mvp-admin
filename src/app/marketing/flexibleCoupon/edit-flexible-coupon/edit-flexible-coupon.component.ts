import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MarketingService } from '../../marketing.service';
import { Coupon } from '../add-flexible-coupon/coupon.model';
import { Condition } from '../add-flexible-coupon/condition.model';

@Component({
  selector: 'app-edit-flexible-coupon',
  templateUrl: './edit-flexible-coupon.component.html',
  styleUrls: ['./edit-flexible-coupon.component.css']
})
export class EditFlexibleCouponComponent implements OnInit {
  id;
  holder;
  subHolder;
  couponForm: FormGroup;
  /* amountType = ['Flat', 'Percentage']; */
  amountType = 'Percentage';
  Field = ['Order total', 'Order quantity'];
  /* Field = 'Order quantity'; */
  Operator = ['equal', 'greater than', 'less than'];
  showPercentage = false;
  isOrderTotal = false;
  isOrderQty = false;
  isCouponStatus = false;
  isAdvanceSettig = false;
  createHolder;
  createSubHolder;
  message;
  action;

  constructor(private marketingService: MarketingService, private snackBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
            this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
            });
        }

  ngOnInit() {
    this.createForm();
    this.getSingleFlexibleCoupon();
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
  getSingleFlexibleCoupon() {
    this.marketingService.getSingleFlexibleCoupon(this.id).subscribe(data => {
      this.holder = data;
      this.subHolder = this.holder.conditions[0];
      this.checkAdvanceSettings(data);
      this.checkCouponStatus(data);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  checkAdvanceSettings(coupon) {
    if (coupon.advanceSettings) {
      this.isAdvanceSettig = true;
    } else if (!coupon.advanceSettings) {
      this.isAdvanceSettig = false;
    }
  }
  checkCouponStatus(coupon) {
    if (coupon.couponStatus) {
      this.isCouponStatus = true;
    } else if (!coupon.changeCouponStatus) {
      this.isCouponStatus = false;
    }
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
  cancelCreation() {
    this.router.navigate(['marketing/viewFlexibleCoupon']);
  }
  updateDiscount(couponForm: FormGroup) {
    this.message="Updated Successfully";
    this.createHolder = new Coupon();
    this.createHolder.couponCode = couponForm.controls.couponCode.value.toUpperCase();
    this.createHolder.description = couponForm.controls.description.value;
    this.createHolder.amountType = this.amountType;
    this.createHolder.typeValue = couponForm.controls.typeValue.value;
    this.createSubHolder = new Condition();
    this.createSubHolder.field = couponForm.controls.field.value;
    this.createSubHolder.operator = couponForm.controls.operator.value;
    this.createSubHolder.value = couponForm.controls.value.value;
    if (!this.isAdvanceSettig) {
      couponForm.controls.maximumUsage.reset();
      couponForm.controls.startDate.reset();
      couponForm.controls.endDate.reset();
    }
    this.createHolder.maximumUsage = couponForm.controls.maximumUsage.value;
    this.createHolder.startDate = couponForm.controls.startDate.value;
    this.createHolder.endDate = couponForm.controls.endDate.value;
    this.createHolder.conditions = this.createSubHolder;
    this.createHolder.advanceSettings = this.isAdvanceSettig;
    this.createHolder.couponStatus = this.isCouponStatus;
    this.marketingService.updateFlexibleCoupon(this.createHolder, this.id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['marketing/viewFlexibleCoupon']);
    }, error => {
      console.log(error);
    });
  }
}

