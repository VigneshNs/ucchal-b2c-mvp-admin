import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from './../../config/appSetting';
import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';
import { Review } from '../view-product-review/product-review.model';

@Component({
  selector: 'app-view-single-product-review',
  templateUrl: './view-single-product-review.component.html',
  styleUrls: ['./view-single-product-review.component.css']
})
export class ViewSingleProductReviewComponent implements OnInit {
  id: string;
  holder: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ViewSingleProductReviewComponent>,
              private fb: FormBuilder, private router: Router, private productService: ProductService,
              private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSingleProductReviewWithProduct();
  }
  getSingleProductReviewWithProduct() {
    this.productService.getSingleReviewWithProduct(this.data).subscribe(value => {
      console.log(value);
      this.holder = value;
    }, error => {
      console.log(error);
    });
  }
  back() {
    this.dialogRef.close(true);
  }
}
