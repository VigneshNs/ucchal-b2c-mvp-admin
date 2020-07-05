import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CmsService } from '../cms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FifthRowModel } from '../fifth-row-content/fifth-row.model';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';

export interface PeriodicElement {
  title: string;
  description: string;
  delete: string;
}

@Component({
  selector: 'app-view-fifth-row-content',
  templateUrl: './view-fifth-row-content.component.html',
  styleUrls: ['./view-fifth-row-content.component.css']
})
export class ViewFifthRowContentComponent implements OnInit {
  fifthModel: any;
  displayedColumns: string[] = ['select', 'title', 'description', 'products', 'status', 'view', 'delete'];
  valueLength: any;
  showNext: boolean;
  message: string;
  action: string;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  productLength: any;

  constructor(private cmsSerivce: CmsService,public dialog: MatDialog, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFifthDetails();
  }

  getFifthDetails() {
    this.cmsSerivce.getFifthRow().subscribe(data => {
      this.fifthModel = data[0];
      this.productLength = this.fifthModel.productDetails.length;
      if (data.length <= 3) {
        this.showNext = true;
      } else {
        this.showNext = false;
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
    this.cmsSerivce.deleteFifthRow(id).subscribe(data => {
      this.fifthModel = data[0];
      this.productLength = this.fifthModel.productId.length;
      if (data.length <= 3) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
 /*  deleteRow(id) {
    this.message = 'Row deleted';
    this.cmsSerivce.deleteFifthRow(id).subscribe(data => {
      this.fifthModel = data[0];
      this.productLength = this.fifthModel.productId.length;
      if (data.length <= 3) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  } */
   /* viewPromotions(data) {
     console.log('single promotions', data);
    this.router.navigate(['/settings/promotions', data._id]);
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

  changeStatus(event, id) {
    const firstValue = new FifthRowModel();
    firstValue.publish = event.target.checked;
    this.cmsSerivce.ChangeStatusFifthRow(firstValue, id).subscribe(data => {
      this.fifthModel = data[0];
      this.productLength = this.fifthModel.productDetails.length;
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
  /* setUnPublishads() {
    this.cmsSerivce.unPublishMethodFifth(this.selection.selected).subscribe(data => {
      this.getFifthDetails();
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  } */
  editRow(id) {
    this.router.navigate(['cms/editfifthrow/', id]);
  }
}
