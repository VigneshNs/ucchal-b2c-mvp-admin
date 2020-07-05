import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-payment-mode-status',
  templateUrl: './payment-mode-status.component.html',
  styleUrls: ['./payment-mode-status.component.css']
})
export class PaymentModeStatusComponent implements OnInit {
  /* orderData: any; */
  @Input() paymentGateData: any;
  @Input() cashOnDeliveryData: any;
  statusName = ['New', 'Confirmed', 'Order Cancelled'];
  @Input() paymentGateTotal: any;
  @Input() cashOnDeliveryTotal: any;
  @Input() isPaymentStatusDownload: boolean;
  @Output() paymentStatusValue = new EventEmitter<any>();
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
      this.paymentGateData = this.orderData.filter(a => a.paymentMode === 'Payment gateway');
      this.cashOnDeliveryData = this.orderData.filter(b => b.paymentMode === 'Cash on delivery');
      this.paymentGateTotal = this.paymentGateData.map(e => e.total).reduce((a, b) => a + b);
      this.cashOnDeliveryTotal = this.cashOnDeliveryData.map(e => e.total).reduce((a, b) => a + b);
    }, error => {
      console.log(error);
    });
  } */
  download(pLength, cLength, pTotal, cTotal) {
    this.isPaymentStatusDownload = false;
    const array = [];
    this.orderValue = {
      status: 'Payment gateway',
      noOfOrder: pLength,
      revenue: pTotal
    };
    array.push(this.orderValue);
    this.orderValue = {
      status: 'Cash on delivery',
      noOfOrder: cLength,
      revenue: cTotal
    };
    array.push(this.orderValue);
    this.paymentStatusValue.emit(array);
  }
}
