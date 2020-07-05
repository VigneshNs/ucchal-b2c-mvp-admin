import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { VendorModel } from '../registration/vendor.model';
import { VendorService } from '../vendor.service';
import { OfficeAddressDetails } from '../registration/officeAddressDetails.model';

@Component({
  selector: 'app-edit-office-address',
  templateUrl: './edit-office-address.component.html',
  styleUrls: ['./edit-office-address.component.css']
})
export class EditOfficeAddressComponent implements OnInit {
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
      this.profileData = data.officeAddressDetails[0];
      this.showEditBasic = false;
      /* console.log(this.profileData); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.contractForm = this.fb.group({
      officeAddressLine1: [''],
      officeAddressLine2: [''],
      officeCity: [''],
      officeState: [''],
      officePincode: [''],
    });
  }
  editBasic() {
    this.showEditBasic = true;
  }
  cancelBasic() {
    this.showEditBasic = false;
  }
  update(add1, add2, city, state, pin) {
    this.holder = new OfficeAddressDetails();
    this.holder.officeAddressLine1 = add1.value;
    this.holder.officeAddressLine2 = add2.value;
    this.holder.officeCity = city.value;
    this.holder.officeState = state.value;
    this.holder.officePincode = pin.value;
    this.vendorService.vendorOfficeAddressUpdate(this.userId, this.profileData._id, this.holder).subscribe(data => {
      this.getAddress();
    }, error => {
      console.log(error);
    });
  }
}
