import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { EditSizeGuideComponent } from './edit-size-guide.component';

@Injectable({
  providedIn: 'root'
})
export class SizeGuideService {
  matDialogRef: MatDialogRef<EditSizeGuideComponent>;
  constructor(private matDialog: MatDialog) { }

  editSizeGuide(size): Observable<any> {
    this.matDialogRef = this.matDialog.open(EditSizeGuideComponent, {
      disableClose: true, backdropClass: 'light-backdrop',
      width: '720px',
      data: size,
    });
    return this.matDialogRef.afterClosed();
  }
}
