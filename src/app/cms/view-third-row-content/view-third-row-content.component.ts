import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CmsService } from '../cms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ThirdRowModel } from '../third-row-content/third-row.model';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
export interface PeriodicElement {
  title: string;
  description: string;
  delete: string;
}

@Component({
  selector: 'app-view-third-row-content',
  templateUrl: './view-third-row-content.component.html',
  styleUrls: ['./view-third-row-content.component.css']
})
export class ViewThirdRowContentComponent implements OnInit {
  thirdModel: any;
  displayedColumns: string[] = ['select', 'title', 'description', 'products', 'status', 'view', 'delete'];
  message: string;
  action: string;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  productLength: any;

  constructor(private cmsSerivce: CmsService,public dialog: MatDialog, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getThirdDetails();
  }

  getThirdDetails() {
    this.cmsSerivce.getThirdRow().subscribe(data => {
      if (data.length !== 0 ) {
        this.thirdModel = data[0];
        this.productLength = this.thirdModel.productDetails.length;
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
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
    this.cmsSerivce.deleteThirdRow(id).subscribe(data => {
      this.thirdModel = data[0];
      this.productLength = this.thirdModel.productId.length;
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
    this.cmsSerivce.deleteThirdRow(id).subscribe(data => {
      this.thirdModel = data[0];
      this.productLength = this.thirdModel.productId.length;
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
    changeStatus(event, id) {
      const firstValue = new ThirdRowModel();
      firstValue.publish = event.target.checked;
      this.cmsSerivce.ChangeStatusThirdRow(firstValue, id).subscribe(data => {
        this.thirdModel = data[0];
        this.productLength = this.thirdModel.productDetails.length;
        this.selection.clear();
      }, error => {
        console.log(error);
      });
    }
    editRow(id) {
      this.router.navigate(['cms/editthirdrow/', id]);
    }
}
