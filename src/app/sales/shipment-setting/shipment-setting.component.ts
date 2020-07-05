import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort, MatSnackBar } from '@angular/material';
import { SalesService } from '../sales.service';
import { ShipmentSetting } from './shipmentSetting.model';

@Component({
  selector: 'app-shipment-setting',
  templateUrl: './shipment-setting.component.html',
  styleUrls: ['./shipment-setting.component.css']
})
export class ShipmentSettingComponent implements OnInit {
  holder: any;
  message = 'Added Successfully';
  action: string;

  constructor(private salesService: SalesService, private router: Router, private snackBar: MatSnackBar) {
    this.getShipmentSetting();
  }

  ngOnInit() {
  }
  getShipmentSetting() {
    this.salesService.getAllShipmentSetting().subscribe(data => {
      this.holder = data[0];
    }, error => {
      console.log(error);
    });
  }
  addCount(count) {
    const holder = new ShipmentSetting();
    holder.daysCount = count;
    this.salesService.addShipmentSetting(holder).subscribe(data => {
      this.holder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
}
