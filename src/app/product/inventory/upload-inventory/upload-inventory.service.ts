import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { UploadInventoryComponent } from './upload-inventory.component';

@Injectable({
  providedIn: 'root'
})
export class UploadInventoryService {
  dialogRef: MatDialogRef<UploadInventoryComponent>;
  constructor(private dialog: MatDialog) { }

  qtyChange(product?: any): Observable<boolean> {
    this.dialogRef = this.dialog.open(UploadInventoryComponent,
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