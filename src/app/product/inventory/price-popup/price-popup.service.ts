import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { PricePopupComponent } from './price-popup.component';
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class PricePopupService {
  dialogRef: MatDialogRef<PricePopupComponent>;
  constructor(private dialog: MatDialog) { }

  priceChange(product?): Observable<boolean> {
    this.dialogRef = this.dialog.open(PricePopupComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: 'auto',
        data: product,
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}