import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { DownloadProductPopupComponent } from './download-product-popup.component';
@Injectable({
  providedIn: 'root'
})
export class DownloadProductService {
  dialogRef: MatDialogRef<DownloadProductPopupComponent>;
  constructor(private dialog: MatDialog) { }

  selectCategory(category?): Observable<boolean> {
    this.dialogRef = this.dialog.open(DownloadProductPopupComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '720px',
        data: category,
      });
    return this.dialogRef.afterClosed();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}