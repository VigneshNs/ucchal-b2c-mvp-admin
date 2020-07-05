import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-qty-popup',
  templateUrl: './qty-popup.component.html',
  styleUrls: ['./qty-popup.component.css']
})
export class QtyPopupComponent implements OnInit {
  @ViewChild('qty', {read: ElementRef, static: false}) currentQty: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              public dialogRef: MatDialogRef<QtyPopupComponent>) { }

  ngOnInit() {
  }
  OnCancel() {
    this.dialogRef.close(false);
  }
  onSave() {
    const obj: any = {};
    obj.selectedVendor = this.data.selectedVendor;
    obj.page = this.data.page;
    obj.sku = this.data.product.styleCode;
    obj.childSku = this.data.product.sku;
    obj.vendorId = this.data.product.vendorId;
    obj.qty = this.currentQty.nativeElement.value;
    this.productService.updateSingleQtyInventory(obj).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    })
  }
}
