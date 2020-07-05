import { Component, OnInit, Inject, Optional } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SalesService} from '../sales.service';

@Component({
  selector: 'app-popup-refund',
  templateUrl: './popup-refund.component.html',
  styleUrls: ['./popup-refund.component.css']
})
export class PopupRefundComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private saleService: SalesService,
              public dialogRef: MatDialogRef<PopupRefundComponent>) { }

  ngOnInit() {
  }
  onClick() {
    this.dialogRef.close(false);
  }
  onRefund(order) {
    if (order.paymentMode === 'razorpay') {
      const obj: any = [];
      obj.refundAmount = order.initiatedTotal - order.total;
      obj.paymentId = order.razorpayPaymentId;
      this.saleService.getRazorpayRefund(obj).subscribe(data => {
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
    } else if (order.paymentMode === 'paypal') {

    }
    console.log(order);
  }
  razorpayRefundCall() {

  }
  paypalRefundCall() {

  }
}
