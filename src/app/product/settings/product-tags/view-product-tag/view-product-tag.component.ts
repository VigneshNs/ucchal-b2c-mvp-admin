import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductOption } from './../../product-option/add-product-option/product-option.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { ProductTag } from '../add-product-tag/productTag.model';
import { MatSnackBar,MatDialog } from '@angular/material';

import {DeleteConfirmBoxComponent} from '../../../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-product-tag',
  templateUrl: './view-product-tag.component.html',
  styleUrls: ['./view-product-tag.component.css']
})
export class ViewProductTagComponent implements OnInit {
  productTagModel: FormGroup;
  showNoData:boolean;
  message;
  action;
  constructor(private productService: ProductService,private snackBar: MatSnackBar,public dialog: MatDialog, private fb: FormBuilder, private router: Router) { }

 
  ngOnInit() {
    this.getAllProductTag();
  }
  getAllProductTag() {
    this.productService.allProductTag().subscribe(data => {
      this.productTagModel = data;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteProductTag(id);
      }
    });
  }
  deleteProductTag(id) {
    this.message = 'Deleted Successfully'; 
    this.productService.DeleteProductTag(id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.productTagModel = data;
    }, error => {
      console.log(error);
    });
  }
 /*  deleteProductTag(id) {
    this.productService.DeleteProductTag(id).subscribe(data => {
      this.productTagModel = data;
    }, error => {
      console.log(error);
    });
  } */
  editProductTag(id) {
    this.router.navigate(['product/editproductTag', id]);
  }
  addProductTag()   {
    this.router.navigate(['product/addproducttags']);
  }
}
