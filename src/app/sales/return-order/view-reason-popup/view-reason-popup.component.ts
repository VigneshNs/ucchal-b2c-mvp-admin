import { Component, OnInit, Inject, Optional } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SalesService} from '../../sales.service';

@Component({
  selector: 'app-view-reason-popup',
  templateUrl: './view-reason-popup.component.html',
  styleUrls: ['./view-reason-popup.component.css']
})
export class ViewReasonPopupComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private saleService: SalesService,
              public dialogRef: MatDialogRef<ViewReasonPopupComponent>) { }

  ngOnInit() {
  }
  onClick() {
    this.dialogRef.close(true);
  }
}
