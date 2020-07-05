import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MarketingService } from '../../marketing.service';

@Component({
  selector: 'app-view-first-time-coupon',
  templateUrl: './view-first-time-coupon.component.html',
  styleUrls: ['./view-first-time-coupon.component.css']
})
export class ViewFirstTimeCouponComponent implements OnInit {
  holder: any;
  isHave = false;
  showNoData: boolean;
  displayedColumns: string[] = ['couponName', 'description', 'status' , 'action'];
  constructor(private marketingService: MarketingService, private snakeBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFirstTimeCoupon();
  }
 /*  getFirstTimeCoupon() {
    this.marketingService.getFirstTimeCoupon().subscribe(data => {
      console.log(data);
      this.holder = data;
      if (this.holder.length === 0) {
        this.isHave = true;
      } else {
        this.isHave = false;
      }
    }, error => {
      console.log(error);
    });
  } */
  getFirstTimeCoupon() {
    this.marketingService.getFirstTimeCoupon().subscribe(data => {
      console.log(data);
      this.holder = data;
      if(data.length === 0) {
        this.isHave = true;
        this.showNoData = true;
      } else {
        this.showNoData = false;
        this.isHave = false;
      }
    }, error => {
      console.log(error);
    });
  }
  getChange() {
    this.router.navigate(['marketing/editFirstTimeCoupon']);
  }
  getAdd() {
    this.router.navigate(['marketing/addfirsttimeCoupon']);
  }
}
