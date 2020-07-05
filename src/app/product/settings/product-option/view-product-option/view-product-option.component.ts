import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductOption } from './../../product-option/add-product-option/product-option.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { MatSnackBar,MatDialog } from '@angular/material';
import { ProductOptionValue } from './../add-product-option/product-option-value.model';
import {DeleteConfirmBoxComponent} from '../../../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-product-option',
  templateUrl: './view-product-option.component.html',
  styleUrls: ['./view-product-option.component.css']
})
export class ViewProductOptionComponent implements OnInit {
  productOptionModel: ProductOption;
  showNoData:boolean;
  message;
  action;
  constructor(private productService: ProductService,private snackBar: MatSnackBar,public dialog: MatDialog, private router: Router) { }
  ngOnInit() {
    this.getAllProductOption();
  }
  getAllProductOption() {
    this.productService.allProductOption().subscribe(data => {
      this.productOptionModel = data;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  deleteProductOption(id) {
    this.message = 'Deleted Successfully'; 
    this.productService.deleteSingleProductOption(id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.productOptionModel = data;
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
       
        this. deleteProductOption(id);
      }
    });
  }
  /* deleteProductOption(id) {
    this.productService.deleteSingleProductOption(id).subscribe(data => {
      this.productOptionModel = data;
    }, error => {
      console.log(error);
    });
  } */
  editProductOption(id) {
    this.router.navigate(['product/editproductoption', id]);
  }
  addProductOption()   {
    this.router.navigate(['product/addproductoption']);
  }
}
