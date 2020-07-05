import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { WareHouseAddress } from '../registration/wareHouseAddressDetail.model';


@Component({
  selector: 'app-edit-supply-location-address',
  templateUrl: './edit-supply-location-address.component.html',
  styleUrls: ['./edit-supply-location-address.component.css']
})
export class EditSupplyLocationAddressComponent implements OnInit {
  userId: string;
  profileData: any;
  contractForm: FormGroup;
  showEditBasic = false;
  holder: any;
  constructor(private vendorService: VendorService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
    this.createForm();
  }
  getAddress() {
    this.vendorService.getSingleVendorDetails(this.userId).subscribe(data => {
      this.profileData = data.supplyLocationAddressDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      supplyAddressLine1: [''],
      supplyAddressLine2: [''],
      supplyCity: [''],
      supplyState: [''],
      supplyPincode: [''],
    });
  }
  editBasic() {
    this.showEditBasic = true;
  }
  cancelBasic() {
    this.showEditBasic = false;
  }
  update(add1, add2, city, state, pin) {
    this.holder = new WareHouseAddress();
    this.holder.supplyAddressLine1 = add1.value;
    this.holder.supplyAddressLine2 = add2.value;
    this.holder.supplyCity = city.value;
    this.holder.supplyState = state.value;
    this.holder.supplyPincode = pin.value;
    this.vendorService.vendorSupplyAddressUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }

}
