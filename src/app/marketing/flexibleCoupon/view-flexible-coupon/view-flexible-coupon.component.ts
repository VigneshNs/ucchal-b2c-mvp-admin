import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { MarketingService } from '../../marketing.service';
import {DeleteConfirmBoxComponent} from '../../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-flexible-coupon',
  templateUrl: './view-flexible-coupon.component.html',
  styleUrls: ['./view-flexible-coupon.component.css']
})
export class ViewFlexibleCouponComponent implements OnInit {
  holder;
  message;
  action;
  showNoData:boolean;
  displayedColumns: string[] = ['couponName', 'status', 'startingDate', 'endingDate','action'];
  constructor(private marketingService: MarketingService, private snackBar: MatSnackBar,public dialog: MatDialog,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFlexibleCoupon();
  }
  getFlexibleCoupon() {
    this.marketingService.getFlexibleCoupon().subscribe(data => {
      this.holder = data;
      console.log(this.holder);
      
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  addCoupon() {
    this.router.navigate(['marketing/addFlexibleCoupon']);
  }
  editCoupon(id) {
    this.router.navigate(['marketing/editFlexibleCoupon/', id]);
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteCoupon(id);
      }
    });
  }
  deleteCoupon(id) {
    this.message = 'Deleted Succesfully';
    this.marketingService.deleteFlexibleCoupon(id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
