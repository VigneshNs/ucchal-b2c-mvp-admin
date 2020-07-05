import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { EditBodyHeightComponent } from './edit-body-height.component';

@Injectable({
  providedIn: 'root'
})
export class BodyHeightService {
  matDialogRef: MatDialogRef<EditBodyHeightComponent>;
  constructor(private matDialog: MatDialog) { }

  edit(size?): Observable<any> {
    this.matDialogRef = this.matDialog.open(EditBodyHeightComponent, {
      disableClose: true, backdropClass: 'light-backdrop',
      width: '720px',
      data: size,
    });
    return this.matDialogRef.afterClosed();
  }
}
