import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  profiledetails = [
  {name: 'Contract Details', link: '/vendor/overallAddress/viewVendorProfile'},
  {name: 'Supply Location Address' , link: '/vendor/overallAddress/editSupplyAddress'},
  {name: 'Office Address' , link: '/vendor/overallAddress/editOfficeAddress'} ,
  {name: 'Payment Details' , link: '/vendor/overallAddress/editPaymentDetails'},
  {name: 'Delivery Details' , link: '/vendor/overallAddress/editDeliveryDetails'},
  {name: 'Performance Details' , link: '/vendor/overallAddress/editPerformanceDetails'},
  {name: 'Signature Details' , link: '/vendor/overallAddress/editSignatureDetails'},
  {name: 'UploadImages' , link: '/vendor/overallAddress/editUploadImage'}
];
  id: string;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
