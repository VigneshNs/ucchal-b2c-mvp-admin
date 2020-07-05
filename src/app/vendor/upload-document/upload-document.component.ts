import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { OfficeAddressDetails } from '../registration/officeAddressDetails.model';
import { WareHouseAddress } from '../registration/wareHouseAddressDetail.model';
import { PaymentModel } from '../registration/paymentDetails.model';
import { DeliveryModel } from '../registration/deliveryDetails.model';
import { PerformanceModel } from '../registration/performanceDetails.model';
import { SignatureModel } from '../registration/signatureDetails.model';
import { VendorService } from '../vendor.service';
import * as XLSX from 'xlsx';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  file: File;
  bufferValue;
  holderSheet: any;
  officeAddressSheet: OfficeAddressDetails;
  supplyAddressSheet: WareHouseAddress;
  paymentSheet: PaymentModel;
  deliverSheet: DeliveryModel;
  performanceSheet: PerformanceModel;
  signatureSheet: any;
  displayValue: any;
  showError = false;

  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmit(val) {
    this.file = val.target.files[0];
    console.log('Basic Details', this.file);
  }
  onUpload() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.bufferValue = reader.result;
      const data = new Uint8Array(this.bufferValue);
      const arry = new Array();
      for (let i = 0; i <= data.length - 1; i++) {
        arry[i] = String.fromCharCode(data[i]);
      }
      const space = arry.join('');
      const document = XLSX.read(space, {type: 'binary'});
      const doc = document.SheetNames[0];
      const sheet = document.Sheets[doc];
      this.holderSheet = new VendorModel();
      this.officeAddressSheet = new OfficeAddressDetails();
      this.supplyAddressSheet = new WareHouseAddress();
      this.performanceSheet = new PerformanceModel();
      this.deliverSheet = new DeliveryModel();
      this.paymentSheet = new PaymentModel();
      this.signatureSheet = new SignatureModel();
      const temp1 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C3:C9', raw: false, dateNF: 'dd/mmm/yy'});
      this.holderSheet.contractDate = new Date(temp1[0][0]);
      this.holderSheet.contractReviewDate = new Date(temp1[1][0]);
      this.holderSheet.merchandiseDivision = (temp1[2])[0];
      this.officeAddressSheet.officeAddressLine1 = (temp1[3])[0];
      this.supplyAddressSheet.supplyAddressLine1 = (temp1[4])[0];
      this.holderSheet.vendorMobileNumber = (temp1[5])[0];
      this.holderSheet.vendorContactPersonMobileNumber = (temp1[6])[0];
      const temp2 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'G3:G9', raw: false, dateNF: 'dd/mmm/yy'});
      this.holderSheet.contractStartDate = new Date((temp2[0])[0]);
      this.holderSheet.vendorName = (temp2[1])[0];
      this.holderSheet.companyStatus = (temp2[2])[0];
      this.officeAddressSheet.officeCity = (temp2[3])[0];
      this.supplyAddressSheet.supplyCity = (temp2[4])[0];
      this.holderSheet.vendorContactPerson = (temp2[5])[0];
      this.holderSheet.vendorContactPersonEmailId = (temp2[6])[0];
      const temp3 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'K3:K9', raw: false, dateNF: 'dd/mmm/yy'});
      this.holderSheet.contractEndDate = new Date((temp3[0])[0]);
      this.holderSheet.vendorType = (temp3[1])[0];
      this.holderSheet.contractNumber = (temp3[2])[0];
      this.officeAddressSheet.officeState = (temp3[3])[0];
      this.supplyAddressSheet.supplyState = (temp3[4])[0];
      this.holderSheet.vendorContactPersonDesignation = (temp3[5])[0];
      this.holderSheet.vendorEmailId = (temp3[6])[0];
      const temp4 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C12:C17', raw: false, dateNF: 'dd/mmm/yy'});
      this.paymentSheet.currency = (temp4[0])[0];
      this.paymentSheet.taxesType = (temp4[1])[0];
      this.paymentSheet.modeOfPayment = (temp4[2])[0];
      this.paymentSheet.cstNo = (temp4[3])[0];
      this.paymentSheet.bankAccountNumber = (temp4[4])[0];
      this.paymentSheet.rtgsCode = (temp4[5])[0];
      const temp5 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'G12:G17', raw: false, dateNF: 'dd/mmm/yy'});
      this.paymentSheet.paymentDay = (temp5[0])[0];
      this.paymentSheet.otherPaymentTerm = (temp5[1][0]);
      this.paymentSheet.panNo = (temp5[2])[0];
      this.paymentSheet.bankName = (temp5[3])[0];
      this.paymentSheet.micrCode = (temp5[4])[0];
      this.paymentSheet.tanNo = (temp5[5])[0];
      const temp6 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'K12:K16', raw: false, dateNF: 'dd/mmm/yy'});
      this.paymentSheet.creditLimit = (temp6[0])[0];
      this.paymentSheet.formsRequired = (temp6[1])[0];
      this.paymentSheet.gstNo = (temp6[2])[0];
      this.paymentSheet.bankBranch = (temp6[3])[0];
      this.paymentSheet.neftCode = (temp6[4])[0];
      const temp7 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C20:C24', raw: false, dateNF: 'dd/mmm/yy'});
      this.deliverSheet.slsOT = (temp7[0])[0];
      this.deliverSheet.deliveryMode = (temp7[1])[0];
      this.deliverSheet.minOrderSizeQty = (temp7[2])[0];
      this.deliverSheet.chargesOfPhotoShopBy = (temp7[3])[0];
      this.deliverSheet.defaultDeliveyLocation = (temp7[4])[0];
      const temp8 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'G20:G23', raw: false});
      this.deliverSheet.slsIFC = (temp8[0])[0];
      this.deliverSheet.transportCostPaidBy = (temp8[1])[0];
      this.deliverSheet.minOrderSizeAmt = (temp8[2])[0];
      this.deliverSheet.photosCharge = (temp8[3])[0];
      const temp9 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'K20:K23', raw: false});
      this.deliverSheet.slsIFL = (temp9[0])[0];
      this.deliverSheet.returnOfGoods = (temp9[1])[0];
      this.deliverSheet.cateImgAssignBy = (temp9[2])[0];
      this.deliverSheet.businessModel = (temp9[3])[0];
      const temp10 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C27:C30', raw: false});
      this.performanceSheet.target = (temp10[0])[0];
      this.performanceSheet.orderSize = (temp10[1])[0];
      this.performanceSheet.promotionalProgram = (temp10[2])[0];
      this.performanceSheet.themeParticipation = (temp10[3])[0];
      const temp11 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'G27:G30', raw: false});
      this.performanceSheet.unconditionalDiscount = (temp11[0])[0];
      this.performanceSheet.cashDiscount = (temp11[1])[0];
      this.performanceSheet.catalogueParticipation = (temp11[2])[0];
      this.performanceSheet.specilalization = (temp11[3])[0];
      const temp12 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'K27:K30', raw: false});
      this.performanceSheet.tradingDiscount = (temp12[0])[0];
      this.performanceSheet.cashDiscountPaid = (temp12[1])[0];
      this.performanceSheet.newLaunches = (temp12[2])[0];
      this.performanceSheet.liquidationOffer = (temp12[3])[0];
      const temp13 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C33:C34', raw: false});
      this.signatureSheet.vendorAuth = (temp13[0])[0];
      this.signatureSheet.companyAuth = (temp13[1])[0];
      const temp14 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'K33:K34', raw: false, dateNF: 'dd/mmm/yy'});
      this.signatureSheet.vendDate = new Date((temp14[0])[0]);
      this.signatureSheet.companyDate = new Date((temp14[1])[0]);
      const temp15 = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'C37:C38', raw: false, dateNF: 'dd/mmm/yy'});
      this.signatureSheet.regBy = (temp15[1])[0];
      this.signatureSheet.regDate = new Date();
      this.holderSheet.officeAddressDetails = this.officeAddressSheet;
      this.holderSheet.supplyLocationAddressDetails = this.supplyAddressSheet;
      this.holderSheet.paymentDetails = this.paymentSheet;
      this.holderSheet.performanceDetails = this.performanceSheet;
      this.holderSheet.deliveryDetails = this.deliverSheet;
      this.holderSheet.signatureDetails = this.signatureSheet;
      if (this.holderSheet.vendorEmailId === undefined || this.holderSheet.vendorEmailId === null) {
       this.showError = true;
    } else {
      this.showError = false;
      this.vendorService.registrationByUpload(this.holderSheet).subscribe(row => {
        if (row.result) {
          this.displayValue = row;
        } else {
          this.router.navigate(['vendor/viewAllVendor']);
        }
      }, error => {
        console.log(error);
      });
    }
    };
    reader.readAsArrayBuffer(this.file);
  }
  onCancel() {
    this.router.navigate(['vendor/viewAllVendor']);
  }
}
