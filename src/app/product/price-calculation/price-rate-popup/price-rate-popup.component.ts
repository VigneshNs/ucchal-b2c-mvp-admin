import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PriceRate } from '../../../shared/model/priceRate.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-price-rate-popup',
  templateUrl: './price-rate-popup.component.html',
  styleUrls: ['./price-rate-popup.component.css']
})
export class PriceRatePopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PriceRatePopupComponent>,
              private productService: ProductService) {
    console.log(data);
  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close(false);
  }
  onCreate(countryN, countryC, currencyC, currencyS) {
    const holder: any = {};
    /* const holder = new PriceRate(); */
    holder.countryName = countryN;
    holder.countryCode = countryC;
    holder.currencyCode = currencyC;
    holder.currencySymbol = currencyS;
    this.productService.addCountryWisePrice(holder).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
  }
}
