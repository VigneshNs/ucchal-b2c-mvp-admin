import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { PriceRatePopupComponent } from './price-rate-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PriceRateService {
  dialogRef: MatDialogRef<PriceRatePopupComponent>;
  constructor(private dialog: MatDialog) { }

  open(): Observable<boolean> {
    this.dialogRef = this.dialog.open(PriceRatePopupComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: 'auto',
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
