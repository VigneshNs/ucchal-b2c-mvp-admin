import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent implements OnInit {
  orderDetails = [ {name: 'By Status' , link: '/report/ordersummary/orderstatus'},
  {name: 'By Financial Status' , link: '/report/ordersummary/financialstatus'},
  {name: 'By Payment Mode' , link: '/report/ordersummary/paymentmodestatus'}
];
selectedItemTab = this.orderDetails[0].name;
  reportForm: FormGroup;
  orderData: any;
  newData: any;
  confrimData: any;
  cancelData: any;
  newTotal = 0;
  confrimTotal = 0;
  cancelTotal = 0;
  pendingTotal = 0;
  successTotal = 0;
  pendingData: any;
  successData: any;
  paymentGateData: any;
  cashOnDeliveryData: any;
  paymentGateTotal = 0;
  cashOnDeliveryTotal = 0;
  date: {start: Date, end: Date};
  isOrderStatusDownload = false;
  isFinancialStatusDownload = false;
  isPaymentStatusDownload = false;
  excelName: string;
  constructor(private reportService: ReportService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getOrder();
  }
  createForm() {
    this.reportForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }
  selectedTab(tab) {
    this.selectedItemTab = tab;
  }
  getOrder() {
    this.reportService.getOrder().subscribe(data => {
      this.orderData = data;
      this.getOrderStatus();
      this.getFinancialStatus();
      this.getPaymentStatus();
    }, error => {
      console.log(error);
    });
  }
  getOrderStatus() {
    this.newData = this.orderData.filter(a => a.orderStatus === 'New');
    this.confrimData = this.orderData.filter(b => b.orderStatus === 'Confirmed');
    this.cancelData = this.orderData.filter(c => c.orderStatus === 'Order Cancelled');
    this.newTotal = this.newData.length !== 0 ? this.newData.map(e => e.total).reduce((a, b) => a + b) : 0;
    this.confrimTotal = this.confrimData.length !== 0 ? this.confrimData.map(e => e.total).reduce((a, b) => a + b) : 0;
    this.cancelTotal = this.cancelData.length !== 0 ? this.cancelData.map(e => e.total).reduce((a, b) => a + b) : 0;
  }
  getFinancialStatus() {
      this.pendingData = this.orderData.filter(a => a.paymentStatus === 'Pending');
      this.successData = this.orderData.filter(b => b.paymentStatus === 'Success');
      this.pendingTotal = this.pendingData.length !== 0 ? this.pendingData.map(e => e.total).reduce((a, b) => a + b) : 0;
      this.successTotal = this.successData.length !== 0 ? this.successData.map(e => e.total).reduce((a, b) => a + b) : 0;
  }
  getPaymentStatus() {
      this.paymentGateData = this.orderData.filter(a => a.paymentMode === 'Payment gateway');
      this.cashOnDeliveryData = this.orderData.filter(b => b.paymentMode === 'Cash on delivery');
      this.paymentGateTotal = this.paymentGateData.length !== 0 ? this.paymentGateData.map(e => e.total).reduce((a, b) => a + b) : 0;
      this.cashOnDeliveryTotal = this.cashOnDeliveryData.length !== 0 ? this.cashOnDeliveryData.map(e => e.total).reduce((a, b) => a + b) : 0;
  }
  getDate() {
    this.date = {
      start: this.reportForm.controls.startDate.value,
      end: this.reportForm.controls.endDate.value
    };
    this.reportService.getOrderBetweenDate(this.date).subscribe(data => {
      this.orderData = data;
      this.getOrderStatus();
      this.getFinancialStatus();
      this.getPaymentStatus();
    }, error => {
      console.log(error);
    });
  }
  exportAsXLSX(value):void {
    this.reportService.exportAsExcelFile( value, this.excelName);
 }
 downloadOrderStatus(elmenet) {
  this.isOrderStatusDownload = false;
  this.isFinancialStatusDownload = false;
  this.isPaymentStatusDownload = false;
  this.exportAsXLSX(elmenet);
 }
 getDownload() {
   const currentDate = new Date();
   const date = currentDate.getDate();
   const month = currentDate.getMonth() + 1;
   const year = currentDate.getFullYear();
   const todayDate = date + '/' + month + '/' + year;
   if (this.selectedItemTab === 'By Status') {
     this.isOrderStatusDownload = true;
     this.excelName = 'Order Status' + ' ' + todayDate;
   } else if (this.selectedItemTab === 'By Financial Status') {
     this.isFinancialStatusDownload = true;
     this.excelName = 'Financial Status' + ' ' + todayDate;
   } else if (this.selectedItemTab === 'By Payment Mode') {
     this.isPaymentStatusDownload = true;
     this.excelName = 'Payment Mode Status' + ' ' + todayDate;
   }
 }
}
