import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {
  holder: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  message;
  action;
  showNoData:boolean;
  displayedColumns: string[] = ['Name', 'mobileNumber', 'vendorCode',  'contractDate', 'View', 'delete'];
  vendorVal;
  @ViewChild('MatPaginator', {static: true}) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar,public dialog: MatDialog,
    private vendorService: VendorService, private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.getAllVendor();
  }
  getAllVendor() {
    this.vendorService.getAllVendor().subscribe(data => {
      this.holder = data;
      this.vendorVal = data;
      this.holder = new MatTableDataSource<any>(data);
      this.holder.paginator = this.paginator;
      this.holder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, err => {
      console.log(err);
    });
  }
  addVendor() {
    this.router.navigate(['vendor/vendorRegistration']);
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteVendor(id);
      }
    });
  }
  deleteVendor(row) {
    this.message = 'Deleted Successfully'; 
    this.vendorService.deleteSingleVendor(row._id).subscribe(data => {
        this.holder = data;
        this.vendorVal = data;
        this.holder = new MatTableDataSource<any>(data);
        this.holder.paginator = this.paginator;
        this.holder = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
        this.iterator();
      }, err => {
        console.log(err);
      });
    
  }
 /*  deleteVendor(row) {
    if (window.confirm('Are you sure to delete ' + row.vendorName)) {
      this.vendorService.deleteSingleVendor(row._id).subscribe(data => {
        this.holder = data;
        this.vendorVal = data;
        this.holder = new MatTableDataSource<any>(data);
        this.holder.paginator = this.paginator;
        this.holder = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else {
      console.log('no');
    }
  } */
  viewAddress(data) {
    sessionStorage.setItem('userId', data._id);
    this.router.navigate(['vendor/overallAddress']);
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
  filterVendor(data) {
    this.holder = new MatTableDataSource<VendorModel>(data);
    this.holder.paginator = this.paginator;
    this.holder = data;
  }
  uploadVendor() {
    this.router.navigate(['vendor/uploadDocument']);
  }
}
