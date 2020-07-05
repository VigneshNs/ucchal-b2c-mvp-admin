import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Order } from '../orders/order.model';
import { Route, ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import { PurchaseOrder } from '../purchase-order-view/purchase-order.model';

@Component({
  selector: 'app-view-all-purchase-order',
  templateUrl: './view-all-purchase-order.component.html',
  styleUrls: ['./view-all-purchase-order.component.css']
})
export class ViewAllPurchaseOrderComponent implements OnInit {

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.getAllPurchaseOrder();
  }
  getAllPurchaseOrder() {
    this.salesService.getAllPurchaseOrder().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
