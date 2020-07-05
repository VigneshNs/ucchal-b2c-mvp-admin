import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-overall-dashboard',
  templateUrl: './overall-dashboard.component.html',
  styleUrls: ['./overall-dashboard.component.css']
})
export class OverallDashboardComponent implements OnInit {
  productCount: any;
  customerCount: any;
  recentCustomer: any;

  constructor(private dashboardSerivce: DashboardService, private router: Router,
              private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.getProductCount();
    this.getCustomerCount();
    this.getRecentRegisteredCustomer();
  }
  getProductCount() {
    this.dashboardSerivce.getAllProductCount().subscribe(data => {
      this.productCount = data;
    }, error => {
      console.log(error);
    });
  }
  getCustomerCount() {
    this.dashboardSerivce.getAllCustomerCount().subscribe(data => {
      this.customerCount = data;
    }, error => {
      console.log(error);
    });
  }
  getRecentRegisteredCustomer() {
    this.dashboardSerivce.getRecentRegisteredCustomer().subscribe(data => {
      this.recentCustomer = data;
    }, error => {
      console.log(error);
    });
  }
}
