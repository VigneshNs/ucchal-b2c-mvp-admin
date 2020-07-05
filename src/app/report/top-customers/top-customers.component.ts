import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.css']
})
export class TopCustomersComponent implements OnInit {
  reportForm: FormGroup;
  orderData;
  customerData;
  customer: {customerId: [string]};
  date: {start: string, end: string};
  orderValue: {
    name: string,
    emailId: string,
    totalPrice: number
  };
  constructor(private reportService: ReportService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getTotalByOrder();
  }
  createForm() {
    this.reportForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }
  getTotalByOrder() {
    this.reportService.getOrderTotalAmountByCustomer().subscribe(data => {
      this.orderData = data;
      const temp = [];
      this.orderData.forEach(element => {
        temp.push(element._id);
      });
      this.getCustomerDetails(temp);
      console.log(temp);
    }, error => {
      console.log(error);
    });
  }
  getCustomerDetails(userid) {
    this.customer = {
      customerId: userid
    };
    this.reportService.getCustomerDetailForReport(this.customer).subscribe(data => {
      console.log(data);
      this.customerData = data;
      this.orderData.forEach(element => {
        for ( const customer of this.customerData) {
          if (element._id === customer._id) {
            element.emailId = customer.emailId;
            element.name = customer.firstName;
          }
        }
      });
      console.log(this.orderData);
    }, error => {
      console.log(error);
    });
  }
  getDate() {
    this.date = {
      start: this.reportForm.controls.startDate.value,
      end: this.reportForm.controls.endDate.value
    };
    this.reportService.getOrderTotalAmountByBetweenDate(this.date).subscribe(data => {
      this.orderData = data;
      const temp = [];
      this.orderData.forEach(element => {
        temp.push(element._id);
      });
      this.getCustomerDetails(temp);
    }, error => {
      console.log(error);
    });
  }
  exportAsXLSX(value):void {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const todayDate = date + '/' + month + '/' + year;
    this.reportService.exportAsExcelFile( value, 'Top Customer' + ' ' + todayDate);
 }
 download() {
   const array = [];
   this.orderData.forEach(e => {
     this.orderValue = {
       name: e.name,
       emailId: e.emailId,
       totalPrice: e.totalAmount
     };
     array.push(this.orderValue);
   });
   this.exportAsXLSX(array);
 }
}
