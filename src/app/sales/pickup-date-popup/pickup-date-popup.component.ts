import { Component, OnInit, Inject, Optional } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APP_DATE_FORMATS, AppDateAdapter } from './format-datepicker';
import {SalesService} from '../sales.service';

@Component({
  selector: 'app-pickup-date-popup',
  templateUrl: './pickup-date-popup.component.html',
  styleUrls: ['./pickup-date-popup.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class PickupDatePopupComponent implements OnInit {
  serviceType = ['Postal', 'Express', 'Register Post', 'Speed Post', 'Commercial', 'CSB-V'];
  secondryType = ['Dox', 'Spx'];
  codeModel;
  cityModel;
  cityList;
  selectedCountry;
  selectedCity;
  constructor( @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private saleService: SalesService,
              public dialogRef: MatDialogRef<PickupDatePopupComponent>) { 
                this.getCountryCode();
                this.getCityCode();
              }

  ngOnInit() {
  }
  getCountryCode() {
    this.saleService.getCountryCode().subscribe(data => {
      this.codeModel = data.countryCollection;
      console.log('country', data);
    }, error => {
      console.log(error);
    });
  }
  getCityCode() {
    this.saleService.getCityCode().subscribe(data => {
      this.cityModel = data.cityCollection;
      this.cityList = this.cityModel.filter(a => a.CountryCode === 'IN');
      console.log('city', data);
    });
  }
  onCountry(e) {
    this.selectedCountry = e.value;
    /* this.cityList = this.cityModel.filter(a => a.CountryName === this.selectedCountry.CountryName); */
  }
  onCity(e) {
    this.selectedCity = e.value;
  }
  cancelRequest() {
    this.dialogRef.close(false);
  }
  onSubmit(date, service, type, content, weight) {
    const obj: any = {}
    obj.pickupDate = date;
    obj.serviceType = service;
    obj.type = type;
    obj.content = content;
    obj.countryCode = this.selectedCountry.CountryCode;
    obj.cityCode = this.selectedCity.CityCode;
    obj.weight = weight;
    console.log(date);
    this.dialogRef.close(obj);
  }
}
