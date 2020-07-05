import { Injectable } from '@angular/core';
import { PopupCancelReasonComponent } from './popup-cancel-reason.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupCancelService {
  dialogRef: MatDialogRef<PopupCancelReasonComponent>;
  constructor(private dialog: MatDialog) { }

    open(click?): Observable<any> {
    this.dialogRef = this.dialog.open(PopupCancelReasonComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '650px',
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
