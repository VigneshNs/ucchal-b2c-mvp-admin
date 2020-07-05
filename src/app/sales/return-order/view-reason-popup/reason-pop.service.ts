import { Injectable } from '@angular/core';
import { ViewReasonPopupComponent } from './view-reason-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonPopService {
  dialogRef: MatDialogRef<ViewReasonPopupComponent>;
  constructor(private dialog: MatDialog) { }

    open(click?): Observable<any> {
    this.dialogRef = this.dialog.open(ViewReasonPopupComponent,
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
