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
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  genderValue = ['male', 'female', 'other'];
  holder: CustomerModel;
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
  getCustomerValue(first, last, mail, mob, pass, dob, gen, loc) {
    this.holder = new CustomerModel();
    this.holder.firstName = first.value;
    this.holder.lastName = last.value;
    this.holder.emailId = mail.value;
    this.holder.mobileNumber = mob.value;
    this.holder.password = pass.value;
    this.holder.dateOfBirth = dob.value;
    this.holder.gender = gen.value;
    this.holder.location = loc.value;
    this.customerService.createCustomerAccount(this.holder).subscribe(data => {
      if (data.result) {
        this.holder = data;
      } else {
      this.router.navigate(['customer/viewCustomer']);
    }
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['customer/viewCustomer']);
  }
}
