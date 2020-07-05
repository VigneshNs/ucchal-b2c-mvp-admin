import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css']
})
export class RecentOrderComponent implements OnInit {
  orderData: any;
  customer: {customerId: [string]};
  cusomterData: any;
  orderValue: {
    orderID: string,
    total: number,
    emailId: string,
    createdOn: Date,
    paymentMode: string
  };
  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    this.getOrderOfRecent();
  }
  getOrderOfRecent() {
    this.reportService.getOrderOfRecent().subscribe(data => {
      this.orderData = data;
      const temp = [];
      this.orderData.forEach(element => {
        temp.push(element.customerId);
      });
      this.getCustomerDetails(temp);
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
      this.cusomterData = data;
      this.orderData.forEach(element => {
        for ( const customer of this.cusomterData) {
          if (element.customerId === customer._id) {
            element.emailId = customer.emailId;
          }
        }
      });
      console.log(this.orderData);
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
    this.reportService.exportAsExcelFile( value, 'Recent Order' + ' ' + todayDate);
 }
 download() {
   const array = [];
   this.orderData.forEach(e => {
     this.orderValue = {
       orderID: e.orderId,
       total: e.total,
       emailId: e.emailId,
       createdOn: e.orderDate,
       paymentMode: e.paymentMode
     };
     array.push(this.orderValue);
   });
   this.exportAsXLSX(array);
 }
}
