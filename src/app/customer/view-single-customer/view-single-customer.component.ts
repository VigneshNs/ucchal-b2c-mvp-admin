import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { CustomerService } from '../customer.service';
import { CustomerModel } from '../view-customer/customer.model';

@Component({
  selector: 'app-view-single-customer',
  templateUrl: './view-single-customer.component.html',
  styleUrls: ['./view-single-customer.component.css']
})
export class ViewSingleCustomerComponent implements OnInit {
  userId: string;
  holder: any;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
    });
    this.getSingleCustomer(this.userId);
  }

  ngOnInit() {
  }
  getSingleCustomer(userId) {
    this.customerService.getSingleCustomer(userId).subscribe(data => {
      this.holder = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
