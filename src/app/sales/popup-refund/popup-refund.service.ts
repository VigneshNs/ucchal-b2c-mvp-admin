import { Injectable } from '@angular/core';
import { PopupRefundComponent } from './popup-refund.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupRefundService {
  dialogRef: MatDialogRef<PopupRefundComponent>;
  constructor(private dialog: MatDialog) { }

    open(click?): Observable<any> {
    this.dialogRef = this.dialog.open(PopupRefundComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: 'auto',
        data: click,
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
