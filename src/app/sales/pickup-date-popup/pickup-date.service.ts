import { Injectable } from '@angular/core';
import { PickupDatePopupComponent } from './pickup-date-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupDateService {
  dialogRef: MatDialogRef<PickupDatePopupComponent>;
  constructor(private dialog: MatDialog) { }

    open(click?): Observable<any> {
    this.dialogRef = this.dialog.open(PickupDatePopupComponent,
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
