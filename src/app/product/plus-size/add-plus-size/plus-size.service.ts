import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AddPlusSizeComponent } from './add-plus-size.component';

@Injectable({
  providedIn: 'root'
})
export class PlusSizeService {
  matDialogRef: MatDialogRef<AddPlusSizeComponent>;
  constructor(private matDialog: MatDialog) { }

  addPlusSize(size?): Observable<any> {
    this.matDialogRef = this.matDialog.open(AddPlusSizeComponent, {
      disableClose: true, backdropClass: 'light-backdrop',
      width: '720px',
      data: size,
    });
    return this.matDialogRef.afterClosed();
  }
  editPlusSize(size?): Observable<any> {
    this.matDialogRef = this.matDialog.open(AddPlusSizeComponent, {
      disableClose: true, backdropClass: 'light-backdrop',
      width: '720px',
      data: size,
    });
    return this.matDialogRef.afterClosed();
  }
}
