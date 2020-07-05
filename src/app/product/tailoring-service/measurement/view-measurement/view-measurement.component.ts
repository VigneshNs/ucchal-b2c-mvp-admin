import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { AppSetting } from 'src/app/config/appSetting';

@Component({
  selector: 'app-view-measurement',
  templateUrl: './view-measurement.component.html',
  styleUrls: ['./view-measurement.component.css']
})
export class ViewMeasurementComponent implements OnInit {
  holder;
  measurementImageUrl: any;
  isEmpty = false;
  constructor(private router: Router, private productService: ProductService) { 
    this.measurementImageUrl = AppSetting.measurementImageUrl;
    this.getAllMeasurement();
  }

  ngOnInit() {
  }
  addMeasurement() {
    this.router.navigate(['product/addMeasurement']);
  }
  getAllMeasurement() {
    this.productService.getAllMeasurement().subscribe(data => {
      this.holder = data;
      if (this.holder.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  getEdit(id) {
    this.router.navigate(['product/editMeasurement/', id]);
  }
  getStyleEdit(id) {
    this.router.navigate(['product/addMeasurementStyle/', id]);
  }
  onAdd() {
    this.router.navigate(['product/addMeasurement']);
  }
}
