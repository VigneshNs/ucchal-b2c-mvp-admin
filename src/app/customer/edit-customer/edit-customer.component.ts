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
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  id: string;
  holder: any;
  genderValue = ['male', 'female', 'other'];

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
      this.holder = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
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
    this.customerService.updateCustomerAccount(this.holder, this.id).subscribe(data => {
     /*  if (data.result) {
        this.holder = data;
      } else { */
      this.router.navigate(['customer/viewCustomer']);
    /* } */
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['customer/viewCustomer']);
  }
}
