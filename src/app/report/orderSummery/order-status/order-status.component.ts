import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
   /* orderData: any; */
   @Input() newData: any;
   @Input() confrimData: any;
   @Input() cancelData: any;
  statusName = ['New', 'Confirmed', 'Order Cancelled'];
  @Input() newTotal: any;
  @Input() confrimTotal: any;
  @Input() cancelTotal: any;
  @Input() isOrderStatusDownload: boolean;
  @Output() orderStatusValue = new EventEmitter<any>();
  orderValue: {
    status: string,
    noOfOrder: string,
    revenue: string
  };
  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    /* this.getOrder(); */
  }

/*   getOrder() {
    this.reportService.getOrder().subscribe(data => {
      this.orderData = data;
      this.newData = this.orderData.filter(a => a.orderStatus === 'New');
      this.confrimData = this.orderData.filter(b => b.orderStatus === 'Confirmed');
      this.cancelData = this.orderData.filter(c => c.orderStatus === 'Order Cancelled');
      this.newTotal = this.newData.map(e => e.total).reduce((a, b) => a + b);
      this.confrimTotal = this.confrimData.map(e => e.total).reduce((a, b) => a + b);
      this.cancelTotal = this.cancelData.map(e => e.total).reduce((a, b) => a + b);
      console.log(this.newTotal);
      
      console.log('new', this.newData);
      console.log(this.orderData);
    }, error => {
      console.log(error);
    });
  } */
  download(newLength, confirmLenglth, cancelLength, newTotal, confirmTotal, cancelTotal) {
    const array = [];
    this.orderValue = {
      status: 'New Order',
      noOfOrder: newLength,
      revenue: newTotal
    };
    array.push(this.orderValue);
    this.orderValue = {
      status: 'Confirmed Order',
      noOfOrder: confirmLenglth,
      revenue: confirmTotal
    };
    array.push(this.orderValue);
    this.orderValue = {
      status: 'Cancelled Order',
      noOfOrder: cancelLength,
      revenue: cancelTotal
    };
    array.push(this.orderValue);
    /* console.log(array); */
    this.isOrderStatusDownload = false;
    this.orderStatusValue.emit(array);
  }
}
