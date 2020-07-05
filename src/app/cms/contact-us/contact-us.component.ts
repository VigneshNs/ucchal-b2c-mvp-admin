import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactUs } from './contact-us.model';
import { CmsService } from '../cms.service';
import { from } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactModel: any;
  showNoData:boolean;
  displayedColumns: string[] = ['customerName', 'description', 'emailId', 'mobileNumber'];

  constructor(private cmsService: CmsService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder) { }
  ngOnInit() {
    this.getAllContact();
  }
  getAllContact() {                                   // Get All Contact us
    this.cmsService.getAllContactUs().subscribe(data => {
      this.contactModel = data;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    }, error => {
      console.log(error);
    });
  }
}
