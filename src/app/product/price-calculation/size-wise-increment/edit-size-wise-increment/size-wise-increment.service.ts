import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { EditSizeWiseIncrementComponent } from './edit-size-wise-increment.component';

@Injectable({
  providedIn: 'root'
})
export class SizeWiseIncrementService {
  matDialogRef: MatDialogRef<EditSizeWiseIncrementComponent>;
  constructor(private matDialog: MatDialog) { }
  edit(size?): Observable<any> {
    this.matDialogRef = this.matDialog.open(EditSizeWiseIncrementComponent, {
      disableClose: true, backdropClass: 'light-backdrop',
      width: '720px',
      data: size,
    });
    return this.matDialogRef.afterClosed();
  }
}
