import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort, MatSnackBar} from '@angular/material';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-view-return-order',
  templateUrl: './view-return-order.component.html',
  styleUrls: ['./view-return-order.component.css']
})
export class ViewReturnOrderComponent implements OnInit {
  holder: any;

  constructor(private salesService: SalesService, private router: Router) {
    this.getAllReturnOrder();
   }

  ngOnInit() {
  }
  getAllReturnOrder() {
    this.salesService.getAllReturnOrder().subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onView(id) {
    this.router.navigate(['sales/viewsinglereturnorder/', id]);
  }
}
