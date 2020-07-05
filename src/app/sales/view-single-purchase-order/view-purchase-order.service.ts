import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewSinglePurchaseOrderComponent } from './view-single-purchase-order.component';

@Injectable({
  providedIn: 'root'
})
export class ViewPurchaseOrderService {
  dialogRef: MatDialogRef<ViewSinglePurchaseOrderComponent>;
  constructor(private dialog: MatDialog) { }

  open(po): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewSinglePurchaseOrderComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: 'auto',
        data: po
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
