import { Component, OnInit, ViewChild } from '@angular/core';
import { Inquiry } from '../../shared/model/inquiry.model';
import {CustomerService} from '../customer.service';
import { from } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-inquiries',
  templateUrl: './view-inquiries.component.html',
  styleUrls: ['./view-inquiries.component.css']
})
export class ViewInquiriesComponent implements OnInit {
inquiryModel: Inquiry[];
showNoData: boolean;
displayedColumns: string[] = ['customerName', 'description', 'emailId', 'country'];
  constructor(private cmsService: CustomerService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllInquiry();
  }
  getAllInquiry() {                                   // Get All Contact us
    this.cmsService.getInquiry().subscribe(data => {
      this.inquiryModel = data;
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
