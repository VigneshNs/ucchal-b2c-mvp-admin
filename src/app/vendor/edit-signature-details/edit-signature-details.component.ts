import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { SignatureModel } from '../registration/signatureDetails.model';

@Component({
  selector: 'app-edit-signature-details',
  templateUrl: './edit-signature-details.component.html',
  styleUrls: ['./edit-signature-details.component.css']
})
export class EditSignatureDetailsComponent implements OnInit {
  userId: string;
  profileData: any;
  contractForm: FormGroup;
  showEditBasic = false;
  holder: any;
  /* VendorType = ['Maunfacturer', 'Retailer', 'Wholesaler'];
  ProductType = ['Clothing', 'Home Appliance'];
  SellingProduct = ['11 to 100', '101 to 500', 'above 500'];
  AccountType = ['Saving Account', 'Current Account'];
  CompanyStatus = ['status1', 'status2'];
  Currency = ['INR', 'DLR'];
  TaxesType = ['tax1', 'tax2'];
  modePay = ['Cash', 'Paytm'];
  DeliveryMode = ['Air', 'Bus'];
  ReturnsofGood = ['Yes', 'No']; */

  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
    this.createForm();
  }
  getAddress() {
    this.vendorService.getSingleVendorDetails(this.userId).subscribe(data => {
      this.profileData = data.signatureDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      vendorAuth: [''],
      vendDate: [''],
      companyAuth: [''],
      companyDate: [''],
      regBy: [''],
      regDate: ['']
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
    this.holder = new SignatureModel();
    this.holder.regBy = this.contractForm.controls.regBy.value;
    this.holder.regDate = this.contractForm.controls.regDate.value;
    this.holder.companyAuth = this.contractForm.controls.companyAuth.value;
    this.holder.companyDate = this.contractForm.controls.companyDate.value;
    this.holder.vendorAuth = this.contractForm.controls.vendorAuth.value;
    this.holder.vendDate = this.contractForm.controls.vendDate.value;
    this.vendorService.vendorSignatureUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }
}
