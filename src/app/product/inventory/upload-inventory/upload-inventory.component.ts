import { Component, OnInit, Inject, ViewChild, ElementRef , Optional} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../product.service';
import * as XLSX from 'xlsx';
import { Product } from '../../add-product/product.model';

@Component({
  selector: 'app-upload-inventory',
  templateUrl: './upload-inventory.component.html',
  styleUrls: ['./upload-inventory.component.css']
})
export class UploadInventoryComponent implements OnInit {
  file: File;
  bufferValue;
  marketingValue: any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              public dialogRef: MatDialogRef<UploadInventoryComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close(false);
  }
  onSubmit(event) {
    this.file = event.target.files[0];
  }
  onUpload() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.bufferValue = reader.result;
      const data = new Uint8Array(this.bufferValue);
      const arr = new Array();
      for (let i = 0; i <= data.length - 1; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const space = arr.join('');
      const document = XLSX.read(space, { type: 'binary' });
      const doc = document.SheetNames[0];
      const sheet = document.Sheets[doc];
      this.marketingValue = new Product();
      this.marketingValue = XLSX.utils.sheet_to_json(sheet, { raw: true });
      console.log(this.marketingValue);
      const vendorDetails = this.data.find(a => a.vendorName.toString().toUpperCase() === this.marketingValue[0].manufactureInfo.toString().toUpperCase());
      console.log(vendorDetails);
      this.productService.bulkupdateinventory(this.marketingValue, vendorDetails._id).subscribe(data => {
       /*  this.dialogRef.close(true); */
       this.checkQty(data);
      }, error => {
        console.log(error);
      })
    };
    reader.readAsArrayBuffer(this.file);
  }
  checkQty(products) {
    const temp = products.map(a => a._id);
    const obj: any = {};
    obj.productId = temp;
    this.productService.bulkUpdateStatusByQty(obj).subscribe(data => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error);
    })
  }
}
