import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ReviewPopupComponent>) {
    console.log(data);
    
  }
 
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }

}
