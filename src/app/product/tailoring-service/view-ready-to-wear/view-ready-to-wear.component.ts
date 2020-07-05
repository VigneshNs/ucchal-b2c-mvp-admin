import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { AppSetting } from '../../../config/appSetting';

@Component({
  selector: 'app-view-ready-to-wear',
  templateUrl: './view-ready-to-wear.component.html',
  styleUrls: ['./view-ready-to-wear.component.css']
})
export class ViewReadyToWearComponent implements OnInit {
  holder: any;
  sizeGuideUrl: any;

  constructor(private productService: ProductService, private router: Router) {
    this.getAllReadyToWear();
    this.sizeGuideUrl = AppSetting.sizeGuideImageUrl;
   }

  ngOnInit() {
  }
  getAllReadyToWear() {
    this.productService.getAllReadyToWear().subscribe(data => {
      this.holder = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  addNewService() {
    this.router.navigate(['product/readyToWear']);
  }
  onDelete(id) {
    this.productService.deleteReadyToWear(id).subscribe(data => {
      this.getAllReadyToWear();
    }, error => {
      console.log(error);
    });
  }
  onEdit(id) {
    this.router.navigate(['product/editReadyToWear/', id]);
  }
}
