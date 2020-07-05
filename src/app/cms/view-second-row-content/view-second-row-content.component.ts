import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CmsService } from '../cms.service';
import { SecondRowModel } from '../second-row-content/second-row.model';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
export interface PeriodicElement {
  title: string;
  description: string;
  delete: string;
}

@Component({
  selector: 'app-view-second-row-content',
  templateUrl: './view-second-row-content.component.html',
  styleUrls: ['./view-second-row-content.component.css']
})
export class ViewSecondRowContentComponent implements OnInit {
  secondModel: any;
  displayedColumns: string[] = ['select', 'title', 'description', 'products', 'status', 'view', 'delete'];
  message: string;
  action: string;
  showNoData:boolean;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  productLength: any;

  constructor(private cmsSerivce: CmsService,public dialog: MatDialog, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSecondDetails();
  }

  getSecondDetails() {
    this.cmsSerivce.getSecondRow().subscribe(data => {
      this.secondModel = data[0];
      this.productLength = this.secondModel.productDetails.length;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, err => {
      console.log(err);
    });
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. deleteRow(id);
      }
    });
  }

  deleteRow(id) {
    this.message = 'Deleted Successfully';
    this.cmsSerivce.deleteSecondRow(id).subscribe(data => {
      this.secondModel = new MatTableDataSource<PeriodicElement>(data);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
  /* deleteRow(id) {
    this.message = 'Row deleted';
    this.cmsSerivce.deleteSecondRow(id).subscribe(data => {
      this.secondModel = new MatTableDataSource<PeriodicElement>(data);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  } */
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.description + 1}`;
  }

  /* viewPromotions(data) {
     console.log('single promotions', data);
    this.router.navigate(['/settings/promotions', data._id]);
   } */

   /* setPublishads() {
    const firstValue = this.selection.selected;
    this.cmsSerivce.publishMethodSecond(firstValue).subscribe(data => {
      this.getSecondDetails();
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  } */
  changeStatus(event, id) {
    const firstValue = new SecondRowModel();
    firstValue.publish = event.target.checked;
    this.cmsSerivce.ChangeStatusSecondRow(firstValue, id).subscribe(data => {
      this.secondModel = data[0];
      this.productLength = this.secondModel.productDetails.length;
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
  /* setUnPublishads() {
    this.cmsSerivce.unPublishMethodSecond(this.selection.selected).subscribe(data => {
      this.getSecondDetails();
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  } */
  editRow(id) {
    this.router.navigate(['cms/editsecondrow/', id]);
  }
}
