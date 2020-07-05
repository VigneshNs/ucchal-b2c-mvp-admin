import { Component, OnInit, ViewChild } from '@angular/core';
import { TermsAndUse } from '../terms-and-use/termsAndUse.model';
import { CmsService } from '../cms.service';
import { from } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';

@Component({
  selector: 'app-view-terms-and-use',
  templateUrl: './view-terms-and-use.component.html',
  styleUrls: ['./view-terms-and-use.component.css']
})
export class ViewTermsAndUseComponent implements OnInit {
  displayedColumns: string[] = ['heading', 'details', 'Action'];
  termsModel: any;
  message: string;
  action: any;
  showNoData:boolean;
  constructor(private fb: FormBuilder, private cmsService: CmsService,public dialog: MatDialog, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTermsAndUse();
  }
  getTermsAndUse() {                                              // Retrieve All Terms and use
    this.cmsService.getAllTermsAndUse().subscribe(data => {
      this.termsModel = data;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  goToAdd() {
    this.router.navigate(['cms/termsanduse']);
  }
  deleteTermsAndUse(data) {
    this.message = 'Deleted Successfully';                                    // Delete Single Terms and use
    this.cmsService.deleteTermsAndUse(data._id).subscribe(value => {
      this.termsModel = value;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, error => {
      console.log(error);
    });
  }
  openDialog(data):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this.deleteTermsAndUse(data);
      }
    });
  }
  editTermsAndUse(data) {
    this.router.navigate(['cms/editTermsAndUse', data._id]);
  }
}
