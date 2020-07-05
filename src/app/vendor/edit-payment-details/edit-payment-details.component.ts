import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { PaymentModel } from '../registration/paymentDetails.model';


@Component({
  selector: 'app-edit-payment-details',
  templateUrl: './edit-payment-details.component.html',
  styleUrls: ['./edit-payment-details.component.css']
})
export class EditPaymentDetailsComponent implements OnInit {
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
  PaymentDay: any;

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
      this.profileData = data.paymentDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      currency: [''],
      paymentDay: [''],
      creditLimit: [''],
      taxesType: [''],
      otherPaymentTerm: [''],
      formsRequired: [''],
      modeOfPayment: [''],
      panNo: [''],
      tinNo: [''],
      cstNo: [''],
      gstNo: [''],
      bankName: [''],
      bankBranch: [''],
      bankAddress: [''],
      bankAccountNumber: [''],
      micrCode: [''],
      neftCode: [''],
      rtgsCode: [''],
      tanNo: [''],
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
    this.holder = new PaymentModel();
    this.holder.currency = this.contractForm.controls.currency.value;
    this.holder.paymentDay = this.contractForm.controls.paymentDay.value;
    this.holder.creditLimit = this.contractForm.controls.creditLimit.value;
    this.holder.taxesType = this.contractForm.controls.taxesType.value;
    this.holder.otherPaymentTerm = this.contractForm.controls.otherPaymentTerm.value;
    this.holder.formsRequired = this.contractForm.controls.formsRequired.value;
    this.holder.modeOfPayment = this.contractForm.controls.modeOfPayment.value;
    this.holder.panNo = this.contractForm.controls.panNo.value;
    this.holder.tinNo = this.contractForm.controls.tinNo.value;
    this.holder.cstNo = this.contractForm.controls.cstNo.value;
    this.holder.gstNo = this.contractForm.controls.gstNo.value;
    this.holder.bankName = this.contractForm.controls.bankName.value;
    this.holder.bankBranch = this.contractForm.controls.bankBranch.value;
    this.holder.bankAddress = this.contractForm.controls.bankAddress.value;
    this.holder.bankAccountNumber = this.contractForm.controls.bankAccountNumber.value;
    this.holder.micrCode = this.contractForm.controls.micrCode.value;
    this.holder.neftCode = this.contractForm.controls.neftCode.value;
    this.holder.rtgsCode = this.contractForm.controls.rtgsCode.value;
    this.holder.tanNo = this.contractForm.controls.tanNo.value;
    this.vendorService.vendorPaymentUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }

  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      this.Currency = data[0].currency;
      this.TaxesType = data[0].taxesType;
      this.modePay = data[0].modeOfPayment;
      this.PaymentDay = data[0].paymentDay;
    }, error => {
      console.log(error);
    });
  }
}
