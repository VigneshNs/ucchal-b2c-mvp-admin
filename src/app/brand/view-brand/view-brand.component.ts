import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from './../brand.service';
import { BrandModel } from './../add-brand/brand.model';
import { AppSetting } from './../../config/appSetting';
import {DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';
import { MatSnackBar,MatDialog, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.css']
})
export class ViewBrandComponent implements OnInit {
  brandModel;
  displayedColumns: string[] = [ 'brandImage', 'brandTitle', 'brandDescription', 'brandStatus', 'delete'];
  brandImageUrl: string;
  message;
  action;
  showNoData:boolean;
  constructor(private brandService: BrandService,private snackBar: MatSnackBar,public dialog: MatDialog, private router: Router) { 
    this.brandImageUrl = AppSetting.brandImageUrl;
  }

  ngOnInit() {
    this.getAllBrand();
  }
  getAllBrand() {                                        // Retrieve All Brand
    this.brandService.getAllBrand().subscribe(data => {
      this.brandModel =  new MatTableDataSource<any>(data);
        
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  deleteBrand(id) {     
    this.message = 'deleted succesfully';                                 // Delete Single Brand
    this.brandService.deleteSingleBrand(id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.brandModel = data;
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
       
        this. deleteBrand(id);
      }
    });
  }
 /*  deleteBrand(id) {                                      // Delete Single Brand
    this.brandService.deleteSingleBrand(id).subscribe(data => {
      this.brandModel = data;
    }, error => {
      console.log(error);
    });
  } */
  editBrand(id) {
    this.router.navigate(['brand/editbrand', id]);
  }
  addBrand()   {
    this.router.navigate(['brand/addbrand']);
  }
}
