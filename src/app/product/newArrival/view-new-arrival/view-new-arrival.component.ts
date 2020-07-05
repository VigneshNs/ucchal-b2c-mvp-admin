import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-new-arrival',
  templateUrl: './view-new-arrival.component.html',
  styleUrls: ['./view-new-arrival.component.css']
})
export class ViewNewArrivalComponent implements OnInit {
  holder: any;
  isHave = false;
  condition = ['manual', 'automated'];

  constructor(private productService: ProductService, private router: Router) {
    this.getNewArrival();
  }

  ngOnInit() {
  }
  getNewArrival() {
    this.productService.getNewArrival().subscribe(data => {
      this.holder = data;
      this.holder.length === 0 ? this.isHave = false : this.isHave = true;
    }, error => {
      console.log(error);
    });
  }
  onCreate() {
    this.router.navigate(['product/createNewArrival']);
  }
}
