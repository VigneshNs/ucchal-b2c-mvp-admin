import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PriceRate } from '../../../shared/model/priceRate.model';
import { PriceRateService } from '../price-rate-popup/price-rate.service';

@Component({
  selector: 'app-price-rate',
  templateUrl: './price-rate.component.html',
  styleUrls: ['./price-rate.component.css']
})
export class PriceRateComponent implements OnInit {
  holder: any;
  hold: {
    priceRate: number,
  };
  selectedCode;
  selectedId: any;
  constructor(private router: Router, private productService: ProductService,
              public dialog: MatDialog, private priceRateService: PriceRateService) { 
    this.getPriceRate();
  }

  ngOnInit() {
  }
  getPriceRate() {
    this.productService.getCountryWisePrice().subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addRate(rate) {
    this.hold = {
      priceRate: rate
    };
    this.productService.addCountryWisePrice(this.hold).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onNewCurrency() {
    this.priceRateService.open().subscribe(data => {
      if (data) {
        this.holder = data;
      }
    });
  }
  getCountry(currency) {
    this.selectedId = [];
    this.holder.forEach(a => {
      if (a.currencyCode === currency.target.value) {
        this.selectedCode = a.countryCode;
        this.selectedId.push(a._id);
      }
    });
    console.log(currency.target.value);
  }
  onSubmit(price) {
    const holder: any = {};
    holder.amount = price;
    holder.productID = this.selectedId;
    this.productService.updateCountryWisePrice(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
