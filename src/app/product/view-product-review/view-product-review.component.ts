import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from './../../config/appSetting';
import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';
import { Review } from './product-review.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductReviewService } from '../view-single-product-review/product-review.service';

export interface PeriodicElement {
  productName: string;
  rating: number;
}

@Component({
  selector: 'app-view-product-review',
  templateUrl: './view-product-review.component.html',
  styleUrls: ['./view-product-review.component.css']
})
export class ViewProductReviewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<PeriodicElement>(true, []);
  displayedColumns: string[] = ['select', 'productName', 'publish', 'rating', 'emailId',
  'creationDate', 'acition'];
  productData: MatTableDataSource<Review>;
  dataSource: MatTableDataSource<PeriodicElement>;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService,
              private snackBar: MatSnackBar, private productReviewService: ProductReviewService) { }

  ngOnInit() {
    this.getAllReviewWithProduct();
  }
  getAllReviewWithProduct()  {
    this.productService.getAllReviewWithProduct().subscribe(data => {
      console.log('review', data);
      this.productData = new MatTableDataSource<Review>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.rating + 1}`;
  }

  setPublishads() {
    this.productService.publishMethodProductReveiw(this.selection.selected).subscribe(data => {
      this.selection.clear();
      this.getAllReviewWithProduct();
    }, error => {
      console.log(error);
    });
  }
  setUnPublishads() {
    this.productService.unPublishMethodProductReveiw(this.selection.selected).subscribe(data => {
      this.selection.clear();
      this.getAllReviewWithProduct();
    }, error => {
      console.log(error);
    });
  }
  viewProductReview(id) {
    this.productReviewService.productReview(id);
  }
  delete(id) {
    if (window.confirm('Are you Delete')) {
      this.productService.deleteProductReview(id).subscribe(val => {
        this.getAllReviewWithProduct();
      }, error => {
        console.log(error);
      });
    } else {
      console.log('no');
    }
  }
 }
