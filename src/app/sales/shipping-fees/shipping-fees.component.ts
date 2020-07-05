import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SalesService } from '../sales.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-fees',
  templateUrl: './shipping-fees.component.html',
  styleUrls: ['./shipping-fees.component.css']
})
export class ShippingFeesComponent implements OnInit {
  holder: any;
  showError :boolean;
  shippingFeeForm:FormGroup;
  create: {
    minimumPrice: number;
    fees: number;
  };
  modify: {
    status: boolean
  };
  countryModel;
  dropDown: any;
  constructor(private salesService: SalesService, private fb: FormBuilder) {
  
    this.getPriceRate();
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.shippingFeeForm = this.fb.group({
     
      minimumPrice: ['', Validators.required],
      fees: ['', Validators.required],
      status: [''],
      countryCode: ['', Validators.required]
    });
   
  }
  getPriceRate() {
    this.salesService.getCountryWisePrice().subscribe(data => {
      this.countryModel = data;
      console.log('country', data);
      this.getShippingFees();
    }, error => {
      console.log(error);
    });
  }
  getShippingFees() {
    this.salesService.getShippingFees().subscribe(data => {
      this.holder = data;
      console.log(data, 'fees');
    }, error => {
      console.log(error);
    });
  }
  checkValue(country, min, fees) {
    if (min === '' || fees === '' || country === undefined ) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.addFees(min, fees, country);
    console.log(min, fees);
  }
  addFees(min, fee, country) {
    
    /* this.create = {
      minimumPrice: this.shippingFeeForm.controls.minimumPrice.value,
      fees: this.shippingFeeForm.controls.fees.value,
      countryCode: this.shippingFeeForm.controls.countryCode.value
    }; */
    const obj: any = {};
    obj.minimumPrice = this.shippingFeeForm.controls.minimumPrice.value;
    obj.fees = this.shippingFeeForm.controls.fees.value;
    obj.countryCode = this.shippingFeeForm.controls.countryCode.value;
    
    this.salesService.addShippingFees(obj).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  changeStatus(fees) {
    
    console.log(fees);
    const obj: any = {};
    obj.status = fees.status === false ? true : false;
    this.salesService.updateShippingFeesStatus(obj, fees._id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onDelete(fees) {
    this.salesService.deleteShippingFees(fees._id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
