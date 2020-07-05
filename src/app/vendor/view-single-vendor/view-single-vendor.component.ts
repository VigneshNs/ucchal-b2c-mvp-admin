import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-view-single-vendor',
  templateUrl: './view-single-vendor.component.html',
  styleUrls: ['./view-single-vendor.component.css']
})
export class ViewSingleVendorComponent implements OnInit {
  id: string;
  userId: string;
  profileData: VendorModel;
  contractForm: FormGroup;
  showEditBasic = false;
  showEditPayment = false;
  showEditOther = false;
  VendorType;

  CompanyStatus;

  holder: VendorModel;
  MerchandiseDivision: any;

  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
    this.createForm();
    this.getAllSetting();
  }
  getAddress() {
    this.vendorService.getSingleVendorDetails(this.userId).subscribe(data => {
      this.profileData = data;
      this.showEditBasic = false;
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      vendorName: ['', Validators.required],
      vendorEmailId: ['', Validators.email],
      vendorMobileNumber: ['', Validators.required],
      vendorType: [''],
      vendorContactPerson: [''],
      vendorContactPersonMobileNumber: [''],
      vendorContactPersonEmailId: [''],
      vendorContactPersonDesignation: [''],
      merchandiseDivision: [''],
      companyStatus: [''],
      contractNumber: [''],
      contractStartDate: [''],
      contractEndDate: [''],
    });
  }
  editBasic() {
    this.showEditBasic = true;
  }
  cancelBasic() {
    this.showEditBasic = false;
  }
  update(name, mob, emal, venty, vencop, venpemob, venpeemail, vencpd, merDiv, comStat, conNum, contstardate, contenddate) {
    this.holder = new VendorModel();
    this.holder.vendorName = name.value;
    this.holder.vendorMobileNumber = mob.value;
    this.holder.vendorEmailId = emal.value;
    this.holder.vendorContactPerson = vencop.value;
    this.holder.vendorContactPersonMobileNumber = venpemob.value;
    this.holder.vendorContactPersonEmailId = venpeemail.value;
    this.holder.vendorContactPersonDesignation = vencpd.value;
    this.holder.vendorType = venty.value;
    this.holder.merchandiseDivision = merDiv.value;
    this.holder.contractEndDate = contenddate.value;
    this.holder.contractStartDate = contstardate.value;
    this.holder.contractNumber = conNum.value;
    this.holder.companyStatus = comStat.value;
    this.vendorService.updateVendorContractDetials(this.holder, this.userId).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }
  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      this.VendorType = data[0].vendorType;
      this.CompanyStatus = data[0].companyStatus;
      /*  this.Currency = data[0].currency;
       this.TaxesType = data[0].taxesType;
       this.modePay = data[0].modeOfPayment;
       this.DeliveryMode = data[0].deliveryMode;
       this.ReturnsofGood = data[0].returnsOfGoods; */
      this.MerchandiseDivision = data[0].merchandiseDivision; /*
      this.PaymentDay = data[0].paymentDay;
      this.TransportCost = data[0].transportCostPaidBy;
      this.CatalogImgAssingBy = data[0].cateImgAssignBy;
      this.ChargesOfPhotoshop = data[0].chargesOfPhotoShopBy;
      this.BusinessModel = data[0].businessModel;
      this.DefaultDeliveryLocation = data[0].defaultDeliveyLocation; */
    }, error => {
      console.log(error);
    });
  }
}
