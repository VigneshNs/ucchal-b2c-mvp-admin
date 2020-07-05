import { Component, OnInit } from '@angular/core';
import { BannerModel } from '../banners/banners.model';
import { BannerImageData } from '../banners/bannersImageData.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CmsService } from '../cms.service';
import { MatSnackBar,MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';


export interface PeriodicElement {
  link: string;
  bannerTitle: string;
  bannerDescription: string;
  position: string;
}
@Component({
  selector: 'app-view-banners',
  templateUrl: './view-banners.component.html',
  styleUrls: ['./view-banners.component.css']
})
export class ViewBannersComponent implements OnInit {
  bannerData;
  message;
  action;
  showNoData:boolean;
  BannerForm: FormGroup;
  displayedColumns: string[] = ['select', 'bannerName', 'status', 'position', 'bannerTitle', 'Action', ];
  dataSource: MatTableDataSource<PeriodicElement>;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
    private snackBar: MatSnackBar,public dialog: MatDialog,private route: ActivatedRoute) { }
  selection = new SelectionModel<PeriodicElement>(true, []);

  ngOnInit() {
    this.createForm();
    this.getAllBanner();
  }
  createForm() {
    this.BannerForm = this.fb.group({
      select: ['']
    });
  }
  getAllBanner() {                                        // Retrieve All Banners
    this.cmsService.getAllBanner().subscribe(data => {
      this.bannerData = data;
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
       
        this.deleteBanners(row);
      }
    });
  }
  deleteBanners(row) {   
    this.message = 'Deleted Successfully';                                     // Delete Single Banner
    this.cmsService.deleteSingleBanner(row._id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.bannerData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
 /*  deleteBanners(row) {                                      // Delete Single Banner
    this.cmsService.deleteSingleBanner(row._id).subscribe(data => {
      this.bannerData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  } */
  editBanners(row) {
    this.router.navigate(['cms/editBanners/', row._id]);
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
  setPublish() {
    this.cmsService.publishMethodBanner(this.selection.selected).subscribe(data => {
      this.getAllBanner();
      this.selection.clear();
      this.BannerForm.reset();
    }, error => {
      console.log(error);
    });
  }
  setUnPublish() {
    this.cmsService.unPublishMethodBanner(this.selection.selected).subscribe(data => {
      this.getAllBanner();
      this.selection.clear();
      this.BannerForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
