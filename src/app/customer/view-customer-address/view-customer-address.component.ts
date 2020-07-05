import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { CustomerService } from '../customer.service';
import { CustomerModel } from '../view-customer/customer.model';
import { AddressDetails } from '../view-customer/addressDetails.model';

@Component({
  selector: 'app-view-customer-address',
  templateUrl: './view-customer-address.component.html',
  styleUrls: ['./view-customer-address.component.css']
})
export class ViewCustomerAddressComponent implements OnInit {
  id: string;
  holder: any;
  addressHolder: AddressDetails;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    this.getSingleCustomer();
  }
  getSingleCustomer() {
    this.customerService.getSingleCustomer(this.id).subscribe(data => {
      this.holder = data.addressDetails;
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['customer/viewCustomer']);
  }
  addAddress(name, build, street, land, city, state, pin) {
    this.addressHolder = new AddressDetails();
    this.addressHolder.name = name.value;
    this.addressHolder.building = build.value;
    this.addressHolder.streetAddress = street.value;
    this.addressHolder.landmark = land.value;
    this.addressHolder.city = city.value;
    this.addressHolder.state = state.value;
    this.addressHolder.pincode = pin.value;
    this.customerService.uploadCustomerAddress(this.addressHolder, this.id).subscribe(data => {
      this.getSingleCustomer();
    }, error => {
      console.log(error);
    });
  }
  getDelete(row) {
    this.customerService.customerAddressDelete(this.id, row._id).subscribe(data => {
      this.getSingleCustomer();
    }, error => {
      console.log(error);
    });
  }
}
