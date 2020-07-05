import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, TransitionCheckState, MatDialogRef } from '@angular/material';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-edit-size-wise-increment',
  templateUrl: './edit-size-wise-increment.component.html',
  styleUrls: ['./edit-size-wise-increment.component.css']
})
export class EditSizeWiseIncrementComponent implements OnInit {
  holder: any;
  selectedSize: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService, private dialog: MatDialogRef<EditSizeWiseIncrementComponent>) { }

  ngOnInit() {
    console.log(this.data);
    this.getSizeByCategory();
  }
  getSizeByCategory() {
    if (this.data.subCategoryId) {
      this.productService.getSingleSubCategory(this.data.superCategoryId, this.data.mainCategoryId, this.data.subCategoryId).subscribe(data => {
        const hold = data;
        hold.attribute.forEach(a => {
          if (a.fieldName === 'size') {
            this.holder = a;
          }
        });
        console.log(this.holder);
      }, error => {
        console.log(error);
      });
    } else {
      this.productService.getSingleSuperCategory(this.data.superCategoryId).subscribe(data => {
        const hold = data;
        hold.attribute.forEach(a => {
          if (a.fieldName === 'size') {
            this.holder = a;
          }
        });
        console.log(this.holder);
      }, error => {
        console.log(error);
      });
    }
  }
  selectedSizeCategory(e) {
    this.selectedSize = e.value;
  }
  onSubmit(perc) {
    const holder = {
      size: this.selectedSize === undefined ? this.data.size : this.selectedSize,
      incPercentage: perc
    };
    this.productService.updateSizeWiseIncrement(holder, this.data._id).subscribe(data => {
      this.dialog.close(data);
    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.dialog.close(false);
  }
}
