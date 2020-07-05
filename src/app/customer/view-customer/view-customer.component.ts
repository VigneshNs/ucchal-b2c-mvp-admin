import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CustomerService } from '../customer.service';
import { CustomerModel } from './customer.model';
import { SelectionModel } from '@angular/cdk/collections';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  @ViewChild('MatPaginator', {static: true}) paginator: MatPaginator;
  holder: any;
  customerCount: any;
  todayCustomerCount: any;
  selection = new SelectionModel<any>(true, []);
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  message;
	action;	
  displayedColumns: string[] = ['Name', 'Email-Id', 'Mobile Number',  'Status', 'Date Of Registration',  'Address',  'Order',  'Action'];
  showNoData:boolean;
  public array: any;
  loader = false;
  private dataSource;
  constructor(private customerService: CustomerService, private fb: FormBuilder,private snackBar: MatSnackBar,public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.getAllCustomer();
    this.getCustomerCount();
    this.getTodayCustomerCount();
  }
  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(data => {
      this.holder = data;
     /*  console.log(data); */
      this.holder = new MatTableDataSource<any>(data);
      this.holder.paginator = this.paginator;
      this.holder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.loader = true;
      this.iterator();
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  getCustomerCount() {
    this.customerService.getAllCustomerCount().subscribe(data => {
      this.customerCount = data;
    }, error => {
      console.log(error);
    });
  }
  getTodayCustomerCount() {
    this.customerService.getTodayCustomerCount().subscribe(data => {
      this.todayCustomerCount = data;
    }, error => {
      console.log(error);
    });
  }
  getAddressData(row) {
    this.router.navigate(['customer/viewcustomeraddress/', row._id]);
  }
  addCustomer() {
    this.router.navigate(['customer/addCustomer']);
  }
  editCustomer(row) {
    this.router.navigate(['customer/editCustomer/', row._id]);
  }
  openDialog(row):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteCustomer(row);
      }
    });
  }
  deleteCustomer(row) {
    this.message = 'Deleted Successfully';
    this.customerService.deleteCustomerAccount(row._id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.getAllCustomer();
    }, error => {
      console.log(error);
    });
  }

 /*  deleteCustomer(row) {
    this.customerService.deleteCustomerAccount(row._id).subscribe(data => {
      this.getAllCustomer();
    }, error => {
      console.log(error);
    });
  } */
  changeStatus(e, id) {
    /* console.log(e.target.checked);
    console.log(id); */
    const temp = new CustomerModel();
    temp.publish = e.target.checked;
    this.customerService.changeCustomerStatus(temp, id).subscribe(data => {
      this.holder = data;
      this.holder = new MatTableDataSource<any>(data);
      this.holder.paginator = this.paginator;
      this.holder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.holder = part;
  }
  getOrderDetails(id) {
    this.router.navigate(['customer/viewCustomerOrderDetial/', id]);
  }
  viewCustomer(e) {
    this.router.navigate(['customer/viewsinglecustomer/', e._id]);
  }
}
