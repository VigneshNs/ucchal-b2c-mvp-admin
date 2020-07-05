import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-increment-rate',
  templateUrl: './increment-rate.component.html',
  styleUrls: ['./increment-rate.component.css']
})
export class IncrementRateComponent implements OnInit {
  holder: any;
  hold: {
    incRate: number,
  };
  constructor(private router: Router, private productService: ProductService) {
    this.getIncrementRate();
   }

  ngOnInit() {
  }
  getIncrementRate() {
    this.productService.getIncrementRate().subscribe(data => {
      this.holder = data[0];
      console.log(this.holder);
    }, error => {
      console.log(error);
    });
  }
  addRate(rate) {
    this.hold = {
      incRate: rate
    };
    this.productService.addIncrementRate(this.hold).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
