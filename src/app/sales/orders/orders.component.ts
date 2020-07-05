import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import {SalesService} from '../sales.service';
import {Order} from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['order', 'view', 'date',  'status', 'itemStatus', 'total'];
  filterColumns = ['Order Id', 'Status', 'Email Id', 'Created On', 'Payment Type'];
  orderDetails: Order[];
  orderModel: any;
  allOrderCount;
  newOrderCount;
  activeOrderCount;
  completedOrderCount;
  cancelledOrderCount;
  orderForm: FormGroup;
  loader = false;

  constructor(private fb: FormBuilder,
              private salesService: SalesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.getAllOrders();
  }
  createForm() {
    this.orderForm = this.fb.group({
      optionValue: this.fb.array([])
    });
  }
  addForm() {
    const orderoptionValue = this.fb.group({
      field: [''],
      value: [''],
    });
    this.productOptionValueForms.push(orderoptionValue);
  }
  get  productOptionValueForms() {
    return this.orderForm.get('optionValue') as FormArray;
  }
  deleteRequirements(i) {
    this.productOptionValueForms.removeAt(i);
  }
getAllOrders() {
  this.salesService.getOrders().subscribe(data => {
    console.log('order', data);
    this.orderDetails = data;
    this.orderModel = data;
    this.allOrderCount = data.length;
    this.orderModel = new MatTableDataSource<Order>(data);
    this.orderModel.sort = this.sort;
    this.orderModel.paginator = this.paginator;
    this.loader = true;
    this.newOrderCount = this.orderDetails.filter(order => order.orderStatus === 'New').length;
    this.activeOrderCount = this.orderDetails.filter(order => order.orderStatus === 'Processing').length;
    this.completedOrderCount = this.orderDetails.filter(order => order.orderStatus === 'Completed').length;
    this.cancelledOrderCount = this.orderDetails.filter(order => order.orderStatus === 'Cancelled').length;
  }, err => {
    console.log(err);
  });
}
viewNewOrders() {
  this.orderModel =  this.orderDetails.filter(order => order.orderStatus === 'New');
}

viewActiveOrders() {
  this.orderModel =  this.orderDetails.filter(order => order.orderStatus === 'Processing');
}
viewCompletedOrders() {
  this.orderModel =  this.orderDetails.filter(order => order.orderStatus === 'Completed');
}
viewCancelledOrders() {
  this.orderModel =  this.orderDetails.filter(order => order.orderStatus === 'Cancelled');
}
applyFilter(filterValue: string) {
  this.orderModel.filter = filterValue.trim().toLowerCase();
}
showOrderDetails(order) {
  this.router.navigate(['sales/viewsingleorder', order._id ]);
  }
}
