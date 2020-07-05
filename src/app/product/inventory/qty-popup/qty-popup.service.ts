import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { QtyPopupComponent } from './qty-popup.component';

@Injectable({
  providedIn: 'root'
})
export class QtyPopupService {
  dialogRef: MatDialogRef<QtyPopupComponent>;
  constructor(private dialog: MatDialog) { }

  qtyChange(product?): Observable<boolean> {
    this.dialogRef = this.dialog.open(QtyPopupComponent,
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