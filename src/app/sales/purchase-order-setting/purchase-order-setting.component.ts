import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort, MatSnackBar} from '@angular/material';
import { SalesService } from '../sales.service';
import { POSetting } from './po-setting.model';

@Component({
  selector: 'app-purchase-order-setting',
  templateUrl: './purchase-order-setting.component.html',
  styleUrls: ['./purchase-order-setting.component.css']
})
export class PurchaseOrderSettingComponent implements OnInit {
  holder;
  isCGST = true;
  isSGST = false;
  isIGST = false;
  isTerms = false;
  isContact = false;
  isGST = false;
  isPOType = false;
  isBill = false;
  isShowError = false;
  constructor(private salesService: SalesService, private router: Router, private snackBar: MatSnackBar,
              private activateRoute: ActivatedRoute) {
                this.getAllPOsetting();
               }

  ngOnInit() {
  }
  getAllPOsetting() {
    this.salesService.getPOsetting().subscribe(data => {
      /* console.log('po setting', data); */
      this.holder = data[0];
    }, error => {
      console.log(error);
    });
  }
  addCGST(cgst) {
    const holder = new POSetting();
    holder.cgstRate = cgst;
    this.salesService.addCGSTrate(holder).subscribe(data => {
      /* console.log('CGST Rate', data); */
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addSGST(sgst) {
    const holder = new POSetting();
    holder.sgstRate = sgst;
    this.salesService.addSGSTrate(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addIGST(igst) {
    const holder = new POSetting();
    holder.igstRate = igst;
    this.salesService.addIGSTrate(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addTerms(terms) {
    const holder = new POSetting();
    holder.termsAndCondition = terms;
    this.salesService.addTermsAndCondition(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addContact(contact) {
    const holder = new POSetting();
    holder.contactNo = contact;
    this.salesService.addContactNumber(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addGST(gst) {
    const holder = new POSetting();
    holder.gstIn = gst;
    this.salesService.addGSTNumber(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addPOType(type) {
    const holder = new POSetting();
    holder.poType = type;
    this.salesService.addPOsetting(holder).subscribe(data => {
      this.holder = data;
      if (data.result) {
        this.isShowError = true;
        this.getAllPOsetting();
      } else {
        this.isShowError = false;
      }
    }, error => {
      console.log(error);
    });
  }
  typeDelete(type) {
    const holder = new POSetting();
    holder.poType = type;
    this.salesService.deletePOsetting(type).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addBill(bill) {
    const holder = new POSetting();
    holder.billingAddress = bill;
    this.salesService.addBillingAddress(holder).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onCGST() {
    this.isCGST = true;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = false;
  }
  onSGST() {
    this.isCGST = false;
    this.isSGST = true;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = false;
  }
  onIGST() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = true;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = false;
  }
  onTerms() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = true;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = false;
  }
  onContact() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = true;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = false;
  }
  onGST() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = true;
    this.isPOType = false;
    this.isBill = false;
  }
  onType() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = true;
    this.isBill = false;
  }
  onBilling() {
    this.isCGST = false;
    this.isSGST = false;
    this.isIGST = false;
    this.isTerms = false;
    this.isContact = false;
    this.isGST = false;
    this.isPOType = false;
    this.isBill = true;
  }
}
