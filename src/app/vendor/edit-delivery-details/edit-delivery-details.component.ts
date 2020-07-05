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
  selector: 'app-edit-delivery-details',
  templateUrl: './edit-delivery-details.component.html',
  styleUrls: ['./edit-delivery-details.component.css']
})
export class EditDeliveryDetailsComponent implements OnInit {
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
  TransportCost: any;
  CatalogImgAssingBy: any;
  ChargesOfPhotoshop: any;
  BusinessModel: any;
  DefaultDeliveryLocation: any;
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
      this.profileData = data.deliveryDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
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
      defaultDeliveyLocation: ['']
    });
  }
  editBasic() {
    this.showEditBasic = true;
  }
  cancelBasic() {
    this.showEditBasic = false;
  }
  update(add1, add2, city, state, pin) {
    this.holder = new DeliveryModel();
    this.holder.businessModel = this.contractForm.controls.businessModel.value;
    this.holder.cateImgAssignBy = this.contractForm.controls.cateImgAssignBy.value;
    this.holder.chargesOfPhotoShopBy = this.contractForm.controls.chargesOfPhotoShopBy.value;
    this.holder.defaultDeliveyLocation = this.contractForm.controls.defaultDeliveyLocation.value;
    this.holder.deliveryMode = this.contractForm.controls.deliveryMode.value;
    this.holder.minOrderSizeAmt = this.contractForm.controls.minOrderSizeAmt.value;
    this.holder.minOrderSizeQty = this.contractForm.controls.minOrderSizeQty.value;
    this.holder.photosCharge = this.contractForm.controls.photosCharge.value;
    this.holder.returnOfGoods = this.contractForm.controls.returnOfGoods.value;
    this.holder.slsIFC = this.contractForm.controls.slsIFC.value;
    this.holder.slsIFL = this.contractForm.controls.slsIFL.value;
    this.holder.slsOT = this.contractForm.controls.slsOT.value;
    this.holder.transportCostPaidBy = this.contractForm.controls.transportCostPaidBy.value;
    this.vendorService.vendorDeliveryUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }
  getAllSetting() {
    this.vendorService.getAllSetting().subscribe(data => {
      this.DeliveryMode = data[0].deliveryMode;
      this.ReturnsofGood = data[0].returnsOfGoods;
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
