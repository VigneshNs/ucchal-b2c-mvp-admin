import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar ,MatDialog} from '@angular/material';
import { DiscountModel } from '../discount/discount.model';
import { MarketingService } from '../marketing.service';
import { DeleteConfirmBoxComponent} from '../../shared/delete-confirm-box/delete-confirm-box.component';
export interface PeriodicElement {
  name: string;
  amountType: string;
  typeValue: number;
  applyOn: string;

}

@Component({
  selector: 'app-view-discount',
  templateUrl: './view-discount.component.html',
  styleUrls: ['./view-discount.component.css']
})
export class ViewDiscountComponent implements OnInit {
  displayedColumns: string[] = ['name', 'typeValue', 'discountStatus', 'delete'];
  dataSource;
  message;
  action;		
  showNoData:boolean;

  constructor(private marketingService: MarketingService, private snackBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    this.getDiscount();
  }
  getDiscount() {
    this.marketingService.getDiscount().subscribe(data => {
      this.dataSource = data;
        
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
  addDiscount() {
    this.router.navigate(['marketing/addDiscount']);
  }
  onConfirmDelete(element) {
    if (window.confirm('Are you delete ' + element.name)) {
      this.onDelete(element._id);
    } else {

    }
  }
  openDialog(id):void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       
        this. onDelete(id._id);
      }
    });
  }
  onDelete(id) {
    this.message = ' Deleted Sucessfully';
    this.marketingService.deleteSingleDiscount(id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.dataSource = data;
    }, error => {
      console.log(error);
    });
  }
 /*  onDelete(id) {
    this.marketingService.deleteSingleDiscount(id).subscribe(data => {
      this.dataSource = data;
    }, error => {
      console.log(error);
    });
  } */
}
