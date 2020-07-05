import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { AppSetting } from 'src/app/config/appSetting';

@Component({
  selector: 'app-view-lehenga-measurement',
  templateUrl: './view-lehenga-measurement.component.html',
  styleUrls: ['./view-lehenga-measurement.component.css']
})
export class ViewLehengaMeasurementComponent implements OnInit {
  holder: any;
  measurementImageUrl: any;

  constructor(private router: Router, private productService: ProductService) {
    this.measurementImageUrl = AppSetting.measurementImageUrl;
    this.getMeasurement();
   }

  ngOnInit() {
  }
  addNew() {
    this.router.navigate(['product/createlehengameasurement']);
  }
  getMeasurement() {
    this.productService.getLehengaMeasurement().subscribe(data => {
      console.log(data);
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  getStyleEdit(styleId) {
    this.router.navigate(['product/addlehengameasurementstyle/', styleId]);
  }
  getEdit(id) {
    this.router.navigate(['product/editlehengameasurement/', id]);
  }
}
