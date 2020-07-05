import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { Router, Route } from '@angular/router';
import { AppSetting } from 'src/app/config/appSetting';
@Component({
  selector: 'app-view-kameez-measurement',
  templateUrl: './view-kameez-measurement.component.html',
  styleUrls: ['./view-kameez-measurement.component.css']
})
export class ViewKameezMeasurementComponent implements OnInit {
  holder: any;
  measurementImageUrl: any;

  constructor(private productService: ProductService, private router: Router) {
    this.measurementImageUrl = AppSetting.measurementImageUrl;
    this.getAllKameezMeaurement();
   }

  ngOnInit() {
  }
  getAllKameezMeaurement() {
    this.productService.getAllKameezMeasurement().subscribe(data => {
      this.holder = data;
      console.log(this.holder);
    }, error  => {
      console.log(error);
    });
  }
  addMeasurement() {
    this.router.navigate(['product/createkameezmeasurement']);
  }
  getStyleEdit(id) {
    this.router.navigate(['product/addkameezmeasurementstyle/', id]);
  }
  getEdit(id) {
    this.router.navigate(['product/editkameezmeasurement/', id]);
  }
}
