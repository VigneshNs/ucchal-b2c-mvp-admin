import { Component, OnInit, Inject, Optional } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SalesService} from '../sales.service';


@Component({
  selector: 'app-popup-cancel-reason',
  templateUrl: './popup-cancel-reason.component.html',
  styleUrls: ['./popup-cancel-reason.component.css']
})
export class PopupCancelReasonComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private saleService: SalesService,
              public dialogRef: MatDialogRef<PopupCancelReasonComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close(false);
  }
}
