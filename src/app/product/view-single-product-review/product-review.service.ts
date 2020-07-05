import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewSingleProductReviewComponent } from './view-single-product-review.component';
import { Review } from '../view-product-review/product-review.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  dialogRef: MatDialogRef<ViewSingleProductReviewComponent>;
  constructor(private dialog: MatDialog) { }

  productReview(id?: Review): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewSingleProductReviewComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '720px',
        data: id,
      });
    return this.dialogRef.afterClosed();
  }
  closeProductReview() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
