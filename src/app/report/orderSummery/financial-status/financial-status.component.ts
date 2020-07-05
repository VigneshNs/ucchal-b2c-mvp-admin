import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css']
})
export class FinancialStatusComponent implements OnInit {
  /* orderData: any; */
  @Input() pendingData: any;
  @Input() successData: any;
  statusName = ['New', 'Confirmed', 'Order Cancelled'];
  @Input() pendingTotal: any;
  @Input() successTotal: any;
  @Input() isFinancialStatusDownload: boolean;
  @Output() financialValue = new EventEmitter<any>();
  orderValue: {
    status: string,
    noOfOrder: string,
    revenue: string
  };
  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    /* this.getOrder(); */
  }
  /* getOrder() {
    this.reportService.getOrder().subscribe(data => {
      this.orderData = data;
      this.pendingData = this.orderData.filter(a => a.paymentStatus === 'Pending');
      this.successData = this.orderData.filter(b => b.paymentStatus === 'Success');
      this.pendingTotal = this.pendingData.map(e => e.total).reduce((a, b) => a + b);
      this.successTotal = this.successData.map(e => e.total).reduce((a, b) => a + b);
    }, error => {
      console.log(error);
    });
  } */
  download(pLength, sLength, pTotal, sTotal) {
    this.isFinancialStatusDownload = false;
    const array = [];
    this.orderValue = {
      status: 'Pending Order',
      noOfOrder: pLength,
      revenue: pTotal
    };
    array.push(this.orderValue);
    this.orderValue = {
      status: 'Success Order',
      noOfOrder: sLength,
      revenue: sTotal
    };
    array.push(this.orderValue);
    this.financialValue.emit(array);
  }
}
