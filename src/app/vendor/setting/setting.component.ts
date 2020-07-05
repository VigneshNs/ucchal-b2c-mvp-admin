import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorService } from '../vendor.service';
import { Setting } from '../registration/setting.model';
import { AppSetting } from '../../config/appSetting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  showVendorType = false;
  showCompanyStatus = false;
  showCurrency = false;
  showTaxesType = false;
  showModeOfPayment = false;
  showDeliveryMode = false;
  showReturnsOfGoods = false;
  showMerchandiseDivision = false;
  showPaymentDay = false;
  showTransportCostPaidBy = false;
  showCateImgAssignBy = false;
  showChargesOfPhotoShopBy = false;
  showBusinessModel = false;
  showDefaultDeliveyLocation = false;
  holder: any;
  settingModel: Setting;
  ApplicationID = AppSetting.appId;

  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllSetting();
    this.createForm();
  }
  showVendorTypeForm() {
    this.showVendorType = true;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showCompanyStatusForm() {
    this.showVendorType = false;
    this.showCompanyStatus = true;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showCurrencyForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = true;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showTaxesTypeForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = true;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }

  showModeOfPaymentForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = true;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }

  showDeliveryModeForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = true;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showReturnsOfGoodsForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = true;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showMerchandiseDivisionForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = true;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showPaymentForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = true;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showTransportCostForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = true;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }

  showCatalogueImageArrangeForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = true;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showChargesOfPhotoShopByForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = true;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = false;
  }
  showBusinessModelForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = true;
    this.showDefaultDeliveyLocation = false;
  }
  showDefaultDeliveryLocationForm() {
    this.showVendorType = false;
    this.showCompanyStatus = false;
    this.showCurrency = false;
    this.showTaxesType = false;
    this.showModeOfPayment = false;
    this.showDeliveryMode = false;
    this.showReturnsOfGoods = false;
    this.showMerchandiseDivision = false;
    this.showPaymentDay = false;
    this.showTransportCostPaidBy = false;
    this.showCateImgAssignBy = false;
    this.showChargesOfPhotoShopBy = false;
    this.showBusinessModel = false;
    this.showDefaultDeliveyLocation = true;
  }

  createForm() {
    this.settingForm = this.fb.group({
      vendorType: [''],
      companyStatus: [''],
      currency: [''],
      taxesType: [''],
      modeOfPayment: [''],
      deliveryMode: [''],
      returnsOfGoods: [''],
      merchandiseDivision: [''],
      paymentDay: [''],
      transportCostPaidBy: [''],
      cateImgAssignBy: [''],
      chargesOfPhotoShopBy: [''],
      businessModel: [''],
      defaultDeliveyLocation: ['']
    });
  }
  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }

  // Vendor Type
  addVendorType() {
    this.settingModel = new Setting();
    this.settingModel.vendorType = this.settingForm.controls.vendorType.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadVendorType(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteVendorType(val) {
    this.vendorService.deleteVendorType(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }

  // Company Status

  addCompanyStatus() {
    this.settingModel = new Setting();
    this.settingModel.companyStatus = this.settingForm.controls.companyStatus.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadCompanyStatus(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteCompanyStatus(val) {
    this.vendorService.deleteCompanyStatus(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }

  // Currency

  addCurrency() {
    this.settingModel = new Setting();
    this.settingModel.currency = this.settingForm.controls.currency.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadCurrency(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteCurrency(val) {
    this.vendorService.deleteCurrency(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Taxes Type

  addTaxesType() {
    this.settingModel = new Setting();
    this.settingModel.taxesType = this.settingForm.controls.taxesType.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadTaxesType(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteTaxesType(val) {
    this.vendorService.deleteTaxesType(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }

  // Mode of Payment

  addModeOfPayment() {
    this.settingModel = new Setting();
    this.settingModel.modeOfPayment = this.settingForm.controls.modeOfPayment.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadModeOfPayment(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteModeOfPayment(val) {
    this.vendorService.deleteModeOfPayment(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }

  // Delivery Mode

  addDeliveryMode() {
    this.settingModel = new Setting();
    this.settingModel.deliveryMode = this.settingForm.controls.deliveryMode.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadDeliveryMode(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteDeliveryMode(val) {
    this.vendorService.deleteDeliveryMode(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Returns Of Goods

  addReturnOfGoods() {
    this.settingModel = new Setting();
    this.settingModel.returnsOfGoods = this.settingForm.controls.returnsOfGoods.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadReturnsOfGoods(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteReturnOfGoods(val) {
    this.vendorService.deleteReturnsOfGoods(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Merchandise Division

  addMerchandiseDivision() {
    this.settingModel = new Setting();
    this.settingModel.merchandiseDivision = this.settingForm.controls.merchandiseDivision.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadMerchandiseDivision(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteMerchandiseDivision(val) {
    this.vendorService.deleteMerchandiseDivision(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Payment Days

  addPaymentDay() {
    this.settingModel = new Setting();
    this.settingModel.paymentDay = this.settingForm.controls.paymentDay.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadPaymentDay(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deletePaymentDay(val) {
    this.vendorService.deletePaymentDay(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // TransPort Cost(s) Paid By

  addTransportCostBy() {
    this.settingModel = new Setting();
    this.settingModel.transportCostPaidBy = this.settingForm.controls.transportCostPaidBy.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadTransportCostBy(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteTransportCostBy(val) {
    this.vendorService.deleteTransportCostBy(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Catalogue Image Arranged By

  addCatalogueImageArrange() {
    this.settingModel = new Setting();
    this.settingModel.cateImgAssignBy = this.settingForm.controls.cateImgAssignBy.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadCatalogueImageArrangeBy(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteCatalogueImageArrange(val) {
    this.vendorService.deleteCatalogueImageArrangeBy(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Catalogue Image Arranged By

  addChargesOfPhotoShopBy() {
    this.settingModel = new Setting();
    this.settingModel.chargesOfPhotoShopBy = this.settingForm.controls.chargesOfPhotoShopBy.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadChargesOfPhotoshopBy(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteChargesOfPhotoShopBy(val) {
    this.vendorService.deleteChargesOfPhotoshopBy(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Business Model

  addBusinessModel() {
    this.settingModel = new Setting();
    this.settingModel.businessModel = this.settingForm.controls.businessModel.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadBusinessModel(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteBusinessModel(val) {
    this.vendorService.deleteBusinessModel(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  // Default Delivery Location

  addDefaultDeliveryLocation() {
    this.settingModel = new Setting();
    this.settingModel.defaultDeliveyLocation = this.settingForm.controls.defaultDeliveyLocation.value;
    this.settingModel.appId = this.ApplicationID;
    this.vendorService.uploadDefaultDeliveryLocation(this.settingModel).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
  deleteDefaultDeliveryLocation(val) {
    this.vendorService.deleteDefaultDeliveryLocation(val).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
    this.settingForm.reset();
  }
}
