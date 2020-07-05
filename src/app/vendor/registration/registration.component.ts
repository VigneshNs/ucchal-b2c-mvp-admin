import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from './vendor.model';
import { VendorService } from '../vendor.service';
import { VendorImage } from './vendorImageDetails.model';
import { OfficeAddressDetails } from './officeAddressDetails.model';
import { WareHouseAddress } from './wareHouseAddressDetail.model';
import { PaymentModel } from './paymentDetails.model';
import { PerformanceModel } from './performanceDetails.model';
import { SignatureModel } from './signatureDetails.model';
import { DeliveryModel } from './deliveryDetails.model';
import { mobileNumber } from './number.validation';
import { AppSetting } from '../../config/appSetting';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  holder: any;
  temp: any;
  cancelledChequefileToUpload: any;
  ImageData: VendorImage = new VendorImage();
  urls1: any[];
  reader: FileReader;
  digitalSignaturefileToUpload: any;
  urls2: any[];
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
  fileLength: any;
  temp1: any;
  holder1: any;
  holder2: any;
  holder3: PerformanceModel;
  holder4: SignatureModel;
  holder5: DeliveryModel;
  MerchandiseDivision: any;
  PaymentDay: any;
  TransportCost: any;
  CatalogImgAssingBy: any;
  ChargesOfPhotoshop: any;
  BusinessModel: any;
  DefaultDeliveryLocation: any;
  ApplicationID = AppSetting.appId;

  constructor(private vendorService: VendorService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.getAllSetting();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      vendorName: ['', Validators.required],
      vendorEmailId: ['', Validators.email],
      vendorMobileNumber: ['', Validators.minLength[10]],
      /* password: ['', Validators.required], */
      vendorType: [''],
      vendorContactPerson: [''],
      vendorContactPersonMobileNumber: [''],
      vendorContactPersonDesignation: [''],
      vendorContactPersonEmailId: [''],
      merchandiseDivision: [''],
      companyStatus: [''],
      contractNumber: [''],
      contractStartDate: [''],
      contractReviewDate: [''],
      contractEndDate: [''],
      officeAddressLine1: [''],
      officeAddressLine2: [''],
      officeCity: [''],
      officeState: [''],
      officePincode: [''],
      supplyAddressLine1: [''],
      supplyAddressLine2: [''],
      supplyCity: [''],
      supplyState: [''],
      supplyPincode: [''],
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
      slsOT: [''],
      slsIFC: [''],
      slsIFL: [''],
      deliveryMode: [''],
      transportCostPaidBy: [''],
      returnOfGoods: [''],
      minOrderSizeQty: [''],
      minOrderSizeAmt: [''],
      cateImgAssignBy: [''],
      chargesOfPhotoShopBy: [''],
      photosCharge: [''],
      businessModel: [''],
      defaultDeliveyLocation: [''],
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
      liquidationOffer: [''],
      vendorAuth: [''],
      vendDate: [''],
      companyAuth: [''],
      companyDate: [''],
      regBy: [''],
      regDate: [''],
    });
  }
  onSubmit(registrationForm: FormGroup) {
    /* console.log(registrationForm); */
    this.temp1 = new VendorModel();
    this.temp1.vendorName = registrationForm.controls.vendorName.value;
    this.temp1.vendorEmailId = registrationForm.controls.vendorEmailId.value;
    this.temp1.vendorMobileNumber = registrationForm.controls.vendorMobileNumber.value;
    /* this.temp1.password = registrationForm.controls.password.value; */
    this.temp1.vendorContactPerson = registrationForm.controls.vendorContactPerson.value;
    this.temp1.vendorType = registrationForm.controls.vendorType.value;
    this.temp1.vendorContactPersonDesignation = registrationForm.controls.vendorContactPersonDesignation.value;
    this.temp1.vendorContactPersonMobileNumber = registrationForm.controls.vendorContactPersonMobileNumber.value;
    this.temp1.vendorContactPersonEmailId = registrationForm.controls.vendorContactPersonEmailId.value;
    this.temp1.merchandiseDivision = registrationForm.controls.merchandiseDivision.value;
    this.temp1.companyStatus = registrationForm.controls.companyStatus.value;
    this.temp1.contractNumber = registrationForm.controls.contractNumber.value;
    this.temp1.contractStartDate = registrationForm.controls.contractStartDate.value;
    this.temp1.contractEndDate = registrationForm.controls.contractEndDate.value;
    this.temp1.appId = this.ApplicationID;
    this.holder = new OfficeAddressDetails();
    this.holder.officeAddressLine1 = registrationForm.controls.officeAddressLine1.value;
    this.holder.officeAddressLine2 = registrationForm.controls.officeAddressLine2.value;
    this.holder.officeCity = registrationForm.controls.officeCity.value;
    this.holder.officeState = registrationForm.controls.officeState.value;
    this.holder.officePincode = registrationForm.controls.officePincode.value;
    this.holder1 = new WareHouseAddress();
    this.holder1.supplyAddressLine1 = registrationForm.controls.supplyAddressLine1.value;
    this.holder1.supplyAddressLine2 = registrationForm.controls.supplyAddressLine2.value;
    this.holder1.supplyCity = registrationForm.controls.supplyCity.value;
    this.holder1.supplyState = registrationForm.controls.supplyState.value;
    this.holder1.supplyPincode = registrationForm.controls.supplyPincode.value;
    this.holder2 = new PaymentModel();
    this.holder2.currency = registrationForm.controls.currency.value;
    this.holder2.paymentDay = registrationForm.controls.paymentDay.value;
    this.holder2.creditLimit = registrationForm.controls.creditLimit.value;
    this.holder2.taxesType = registrationForm.controls.taxesType.value;
    this.holder2.otherPaymentTerm = registrationForm.controls.otherPaymentTerm.value;
    this.holder2.formsRequired = registrationForm.controls.formsRequired.value;
    this.holder2.modeOfPayment = registrationForm.controls.modeOfPayment.value;
    this.holder2.panNo = registrationForm.controls.panNo.value;
    this.holder2.tinNo = registrationForm.controls.tinNo.value;
    this.holder2.cstNo = registrationForm.controls.cstNo.value;
    this.holder2.gstNo = registrationForm.controls.gstNo.value;
    this.holder2.bankName = registrationForm.controls.bankName.value;
    this.holder2.bankBranch = registrationForm.controls.bankBranch.value;
    this.holder2.bankAddress = registrationForm.controls.bankAddress.value;
    this.holder2.bankAccountNumber = registrationForm.controls.bankAccountNumber.value;
    this.holder2.micrCode = registrationForm.controls.micrCode.value;
    this.holder2.neftCode = registrationForm.controls.neftCode.value;
    this.holder2.rtgsCode = registrationForm.controls.rtgsCode.value;
    this.holder2.tanNo = registrationForm.controls.tanNo.value;
    this.holder3 = new PerformanceModel();
    this.holder3.cashDiscount = registrationForm.controls.cashDiscount.value;
    this.holder3.cashDiscountPaid = registrationForm.controls.cashDiscountPaid.value;
    this.holder3.catalogueParticipation = registrationForm.controls.catalogueParticipation.value;
    this.holder3.liquidationOffer = registrationForm.controls.liquidationOffer.value;
    this.holder3.newLaunches = registrationForm.controls.newLaunches.value;
    this.holder3.orderSize = registrationForm.controls.orderSize.value;
    this.holder3.promotionalProgram = registrationForm.controls.promotionalProgram.value;
    this.holder3.specilalization = registrationForm.controls.specilalization.value;
    this.holder3.target = registrationForm.controls.target.value;
    this.holder3.themeParticipation = registrationForm.controls.themeParticipation.value;
    this.holder3.tradingDiscount = registrationForm.controls.tradingDiscount.value;
    this.holder3.unconditionalDiscount = registrationForm.controls.unconditionalDiscount.value;
    this.holder4 = new SignatureModel();
    this.holder4.regBy = registrationForm.controls.regBy.value;
    this.holder4.regDate = registrationForm.controls.regDate.value;
    this.holder4.companyAuth = registrationForm.controls.companyAuth.value;
    this.holder4.companyDate = registrationForm.controls.companyDate.value;
    this.holder4.vendorAuth = registrationForm.controls.vendorAuth.value;
    this.holder4.vendDate = registrationForm.controls.vendDate.value;
    this.holder5 = new DeliveryModel();
    this.holder5.businessModel = registrationForm.controls.businessModel.value;
    this.holder5.cateImgAssignBy = registrationForm.controls.cateImgAssignBy.value;
    this.holder5.chargesOfPhotoShopBy = registrationForm.controls.chargesOfPhotoShopBy.value;
    this.holder5.defaultDeliveyLocation = registrationForm.controls.defaultDeliveyLocation.value;
    this.holder5.deliveryMode = registrationForm.controls.deliveryMode.value;
    this.holder5.minOrderSizeAmt = registrationForm.controls.minOrderSizeAmt.value;
    this.holder5.minOrderSizeQty = registrationForm.controls.minOrderSizeQty.value;
    this.holder5.photosCharge = registrationForm.controls.photosCharge.value;
    this.holder5.returnOfGoods = registrationForm.controls.returnOfGoods.value;
    this.holder5.slsIFC = registrationForm.controls.slsIFC.value;
    this.holder5.slsIFL = registrationForm.controls.slsIFL.value;
    this.holder5.slsOT = registrationForm.controls.slsOT.value;
    this.holder5.transportCostPaidBy = registrationForm.controls.transportCostPaidBy.value;
    this.temp1.officeAddressDetails = this.holder;
    this.temp1.supplyLocationAddressDetails = this.holder1;
    this.temp1.paymentDetails = this.holder2;
    this.temp1.deliveryDetails = this.holder5;
    this.temp1.performanceDetails = this.holder3;
    this.temp1.signatureDetails = this.holder4;
    this.vendorService.registration(this.temp1).subscribe(data => {
      if (data.result) {
        this.temp = data;
      } else {
        if (this.cancelledChequefileToUpload === undefined) {
          if (this.digitalSignaturefileToUpload === undefined) {
            this.router.navigate(['vendor/viewAllVendor']);
          } else {
            this.updateDigitalSignature(data._id);
          }
        } else {
          this.updateCancelCheque(data._id);
        }
      }
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['vendor/viewAllVendor']);
  }
  cancelledChequeFileInput(images: any) {
    this.cancelledChequefileToUpload = images;
    this.ImageData.cancelledImage = this.cancelledChequefileToUpload[0];
    this.urls1 = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls1.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  updateCancelCheque(id) {                              // Upload Cancel Cheque
    const formData: any = new FormData();
    this.fileLength = this.cancelledChequefileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.cancelledChequefileToUpload[i]);
    }
    this.vendorService.uploadCancelCheque(formData, id).subscribe(data => {
      this.addCancelChequeName(data.Key, id);
    }, error => {
      console.log(error);
    });
  }


  addCancelChequeName(name, id) {
    const tab1 = new VendorModel();
    tab1.cancelledCheque = name;
    this.vendorService.storeCancelChequeName(tab1, id).subscribe(data => {
      if (this.digitalSignaturefileToUpload === undefined) {
        this.router.navigate(['vendor/viewAllVendor']);
      } else {
        this.updateDigitalSignature(data._id);
      }
    }, error => {
      console.log(error);
    });
  }

  digitalSignatureFileInput(images: any) {
    this.digitalSignaturefileToUpload = images;
    this.ImageData.digitalSignature = this.digitalSignaturefileToUpload[0];
    this.urls2 = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls2.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  updateDigitalSignature(id) {                              // Upload Digital Signature
    const formData: any = new FormData();
    this.fileLength = this.digitalSignaturefileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('single', this.digitalSignaturefileToUpload[i]);
    }
    this.vendorService.uploadDigitalSignature(formData, id).subscribe(data => {
      this.addDigitalSignature(data.Key, id);
    }, error => {
      console.log(error);
    });
  }
  addDigitalSignature(name, id) {
    const tab2 = new VendorModel();
    tab2.digitalSignature = name;
    this.vendorService.storeDigitalSignatureName(tab2, id).subscribe(data => {
      this.router.navigate(['vendor/viewAllVendor']);
    }, error => {
      console.log(error);
    });
  }
  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      this.VendorType = data[0].vendorType;
      this.CompanyStatus = data[0].companyStatus;
      this.Currency = data[0].currency;
      this.TaxesType = data[0].taxesType;
      this.modePay = data[0].modeOfPayment;
      this.DeliveryMode = data[0].deliveryMode;
      this.ReturnsofGood = data[0].returnsOfGoods;
      this.MerchandiseDivision = data[0].merchandiseDivision;
      this.PaymentDay = data[0].paymentDay;
      this.TransportCost = data[0].transportCostPaidBy;
      this.CatalogImgAssingBy = data[0].cateImgAssignBy;
      this.ChargesOfPhotoshop = data[0].chargesOfPhotoShopBy;
      this.BusinessModel = data[0].businessModel;
      this.DefaultDeliveryLocation = data[0].defaultDeliveyLocation;
    }, error => {
      console.log(error);
    });
  }
}
