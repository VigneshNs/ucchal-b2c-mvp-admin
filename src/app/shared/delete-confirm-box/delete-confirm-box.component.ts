import { Component, OnInit } from '@angular/core';
import {  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-confirm-box',
  templateUrl: './delete-confirm-box.component.html',
  styleUrls: ['./delete-confirm-box.component.css']
})
export class DeleteConfirmBoxComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
    onNoClick(): void {
      this.dialogRef.close();}
  ngOnInit() {
  }

}