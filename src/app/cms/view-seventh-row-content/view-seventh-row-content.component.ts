import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CmsService } from '../cms.service';
import { SeventhRowModel } from '../seventh-row-content/seventh-row.model';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
export interface PeriodicElement {
  title: string;
  description: string;
  delete: string;
}

@Component({
  selector: 'app-view-seventh-row-content',
  templateUrl: './view-seventh-row-content.component.html',
  styleUrls: ['./view-seventh-row-content.component.css']
})
export class ViewSeventhRowContentComponent implements OnInit {
  seventhModel: any;
  displayedColumns: string[] = ['select', 'title', 'description', 'products', 'status', 'view', 'delete'];
  message: string;
  action: string;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  productLength: any;
  constructor(private cmsSerivce: CmsService,public dialog: MatDialog, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSevethDetails();
  }

  getSevethDetails() {
    this.cmsSerivce.getSeventhRow().subscribe(data => {
      this.seventhModel = data[0];
      console.log( this.seventhModel);
      this.productLength = this.seventhModel.productDetails.length;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
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
    this.cmsSerivce.deleteSeventhRow(id).subscribe(data => {
      this.seventhModel = new MatTableDataSource<PeriodicElement>(data);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
 /*  deleteRow(id) {
    this.message = 'Row deleted';
    this.cmsSerivce.deleteSeventhRow(id).subscribe(data => {
      this.seventhModel = new MatTableDataSource<PeriodicElement>(data);
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
   changeStatus(event, id) {
    const firstValue = new SeventhRowModel();
    firstValue.publish = event.target.checked;
    this.cmsSerivce.ChangeStatusSeventhRow(firstValue, id).subscribe(data => {
      this.seventhModel = data[0];
      this.productLength = this.seventhModel.productDetails.length;
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
  editRow(id) {
    this.router.navigate(['cms/editseventhrow/', id]);
  }
}
