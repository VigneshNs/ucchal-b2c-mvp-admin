import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { DeliveryModel } from '../registration/deliveryDetails.model';

@Component({
  selector: 'app-edit-performance-details',
  templateUrl: './edit-performance-details.component.html',
  styleUrls: ['./edit-performance-details.component.css']
})
export class EditPerformanceDetailsComponent implements OnInit {
  userId: string;
  profileData: any;
  contractForm: FormGroup;
  showEditBasic = false;
  holder: any;
  VendorType;
  ProductType;
  SellingProduct;
  AccountType;
  CompanyStatus;
  Currency;
  TaxesType;
  modePay;
  DeliveryMode;
  ReturnsofGood;

  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
    this.createForm();
    this.getAllSetting();
  }
  getAddress() {
    this.vendorService.getSingleVendorDetails(this.userId).subscribe(data => {
      this.profileData = data.performanceDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      target: [''],
      unconditionalDiscount: [''],
      tradingDiscount: [''],
      orderSize: [''],
      cashDiscount: [''],
      cashDiscountPaid: [''],
      promotionalProgram: [''],
      catalogueParticipation: [''],
      newLaunches: [''],
      themeParticipation: [''],
      specilalization: [''],
      liquidationOffer: ['']
    });
  }
  editBasic() {
    this.showEditBasic = true;
    this.createForm();
  }
  cancelBasic() {
    this.showEditBasic = false;
  }
  update(add1, add2, city, state, pin) {
    this.holder = new DeliveryModel();
    this.holder.cashDiscount = this.contractForm.controls.cashDiscount.value;
    this.holder.cashDiscountPaid = this.contractForm.controls.cashDiscountPaid.value;
    this.holder.catalogueParticipation = this.contractForm.controls.catalogueParticipation.value;
    this.holder.liquidationOffer = this.contractForm.controls.liquidationOffer.value;
    this.holder.newLaunches = this.contractForm.controls.newLaunches.value;
    this.holder.orderSize = this.contractForm.controls.orderSize.value;
    this.holder.promotionalProgram = this.contractForm.controls.promotionalProgram.value;
    this.holder.specilalization = this.contractForm.controls.specilalization.value;
    this.holder.target = this.contractForm.controls.target.value;
    this.holder.themeParticipation = this.contractForm.controls.themeParticipation.value;
    this.holder.tradingDiscount = this.contractForm.controls.tradingDiscount.value;
    this.holder.unconditionalDiscount = this.contractForm.controls.unconditionalDiscount.value;
    this.vendorService.vendorPerformanceUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }
  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      console.log(data);
      this.VendorType = data[0].vendorType;
      this.CompanyStatus = data[0].companyStatus;
      this.Currency = data[0].currency;
      this.TaxesType = data[0].taxesType;
      this.modePay = data[0].modeOfPayment;
      this.DeliveryMode = data[0].deliveryMode;
      this.ReturnsofGood = data[0].returnsOfGoods;
    }, error => {
      console.log(error);
    });
  }
}
