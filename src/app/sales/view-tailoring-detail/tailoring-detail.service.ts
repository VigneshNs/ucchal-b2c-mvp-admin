import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewTailoringDetailComponent } from './view-tailoring-detail.component';

@Injectable({
  providedIn: 'root'
})
export class TailoringDetailService {
  dialogRef: MatDialogRef<ViewTailoringDetailComponent>;
  constructor(private dialog: MatDialog) { }

  open(detail?): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewTailoringDetailComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '720px',
        data: detail,
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
