import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { ADSModel } from '../ads/ads.model';
import { AdsImageData } from '../ads/adsImageData.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar,MatDialog } from '@angular/material';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';

export interface PeriodicElement {
  link: string;
  adsTitle: string;
  adsDescription: string;
  position: string;
}
@Component({
  selector: 'app-view-ads',
  templateUrl: './view-ads.component.html',
  styleUrls: ['./view-ads.component.css']
})
export class ViewAdsComponent implements OnInit {
  viewAdsForm: FormGroup;
  displayedColumns: string[] = ['select', 'adsImageName', 'status', 'position', 'link', 'adsTitle', 'Action', ];
  adsData: any;
  showNoData:boolean;
  message;
  action;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;

  constructor(private cmsService: CmsService, private fb: FormBuilder,private snackBar: MatSnackBar,public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.getAllADS();
  }
  createForm() {
    this.viewAdsForm = this.fb.group({
      select: ['']
    });
  }
  getAllADS() {                                         // Retrieve all the ADS
    this.cmsService.getAllADS().subscribe(data => {
      this.adsData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  openDialog(row):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
   width: '350px',
 });
 dialogRef.afterClosed().subscribe(result => {
   if(result) {
    
     this. deleteAds(row);
   }
 });
}
deleteAds(row) {     
 this.message = 'Deleted Successfully';                                   // Delete Single ADS
 this.cmsService.deleteSingleADS(row._id).subscribe(data => {
   this.adsData = data;
   this.snackBar.open(this.message, this.action, {
     duration: 3000,
   });
  this.dataSource = new MatTableDataSource<PeriodicElement>(data);
 }, error => {
   console.log(error);
 });
}
 /*  deleteAds(row) {                                        // Delete Single ADS
    this.cmsService.deleteSingleADS(row._id).subscribe(data => {
      this.adsData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  } */
  Edit(row) {
    this.router.navigate(['cms/editAds/', row._id]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  setPublishads() {
    const firstValue = this.selection.selected;
    this.cmsService.publishMethodADS(firstValue).subscribe(data => {
      this.viewAdsForm.reset();
      this.getAllADS();
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
  setUnPublishads() {
    this.cmsService.unPublishMethodADS(this.selection.selected).subscribe(data => {
      this.viewAdsForm.reset();
      this.getAllADS();
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }

}
