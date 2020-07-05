import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from './../../config/appSetting';
import { CustomerService } from '../customer.service';
import { Order } from '../../sales/orders/order.model';

@Component({
  selector: 'app-view-customer-order-details',
  templateUrl: './view-customer-order-details.component.html',
  styleUrls: ['./view-customer-order-details.component.css']
})
export class ViewCustomerOrderDetailsComponent implements OnInit {
  id: string;
  holder: Order;

  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService,
              private snackBar: MatSnackBar, private route: ActivatedRoute) {
                this.route.paramMap.subscribe((params: ParamMap) => {
                  this.id = params.get('id');
                });
               }

  ngOnInit() {
    this.getCustomerOrder();
  }
  getCustomerOrder() {
    this.customerService.getCustomerOrderDetails(this.id).subscribe(data => {
      this.holder = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  viewOrder(id) {
    this.router.navigate(['sales/viewsingleorder/', id ]);
  }
}
