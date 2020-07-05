import { Component, OnInit, ViewChild } from '@angular/core';
import { TermsAndUse } from './termsAndUse.model';
import { CmsService } from '../cms.service';
import { from } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-terms-and-use',
  templateUrl: './terms-and-use.component.html',
  styleUrls: ['./terms-and-use.component.css']
})
export class TermsAndUseComponent implements OnInit {
  TermsForm: FormGroup;
  termsModel: TermsAndUse;
  message: string;
  action: any;

  constructor(private fb: FormBuilder, private cmsService: CmsService, private router: Router,
              private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.TermsForm = this.fb.group({
      heading: [''],
      details: ['']
    });
  }
  cancel() {
    this.router.navigate(['cms/viewTermsAndUse']);
  }
  createTermsAndUse(TermsForm: FormGroup) {
    this.message = 'Terms and Use Created Successfully';                     // Create Terms and Use
    this.termsModel = new TermsAndUse();
    this.termsModel.heading = TermsForm.controls.heading.value;
    this.termsModel.details = TermsForm.controls.details.value;
    this.cmsService.CreateTermsAndUse(this.termsModel).subscribe(data => {
      this.termsModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['cms/viewTermsAndUse']);
    }, error => {
      console.log(error);
    });
  }
}
