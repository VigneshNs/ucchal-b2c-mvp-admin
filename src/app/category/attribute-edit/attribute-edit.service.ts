import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AttributeEditComponent } from './attribute-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AttributeEditService {
  dialogRef: MatDialogRef<AttributeEditComponent>;
  constructor(private dialog: MatDialog) { }

  openAttribute(attribute?: any): Observable<any> {
    this.dialogRef = this.dialog.open(AttributeEditComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        
        width: '900px',
        data: attribute,
      });
  
    return this.dialogRef.afterClosed();
  }
  closeAttribute() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
