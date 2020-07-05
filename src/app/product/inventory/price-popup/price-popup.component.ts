import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-price-popup',
  templateUrl: './price-popup.component.html',
  styleUrls: ['./price-popup.component.css']
})
export class PricePopupComponent implements OnInit {
@ViewChild('price', {read: ElementRef, static: false}) currentPrice: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              public dialogRef: MatDialogRef<PricePopupComponent>) { }

  ngOnInit() {
  }
  OnCancel() {
    this.dialogRef.close(false);
  }
  OnSave() {
    const obj: any = {};
    obj.selectedVendor = this.data.selectedVendor;
    obj.page = this.data.page;
    obj.sku = this.data.product.styleCode;
    obj.vendorId = this.data.product.vendorId;
    obj.childSku = this.data.product.sku;
    obj[this.data.field] = this.currentPrice.nativeElement.value;
    obj.field = this.data.field;
    this.productService.updateSinglePriceInventory(obj).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    })
  }
  
}
