import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { TermsAndUse } from '../terms-and-use/termsAndUse.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-edit-terms-and-use',
  templateUrl: './edit-terms-and-use.component.html',
  styleUrls: ['./edit-terms-and-use.component.css']
})
export class EditTermsAndUseComponent implements OnInit {
  TermsForm: FormGroup;
  termsModel: TermsAndUse;
  message: string;
  action: any;
  id: string;

  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) {
                this.route.paramMap.subscribe((params: ParamMap) => {
                  this.id = params.get('id');
                });
              }

  ngOnInit() {
    this.createForm();
    this.getTermsAndUse();
  }
  createForm() {
    this.TermsForm = this.fb.group({
      heading: [''],
      details: ['']
    });
  }
  getTermsAndUse() {
    this.cmsService.getSingleTermsAndUse(this.id).subscribe(data => {
      this.termsModel = data;
    }, error => {
      console.log(error);
    });
  }
  updateTermsAndUse(TermsForm: FormGroup) {
    this.termsModel = new TermsAndUse();
    this.termsModel.heading = TermsForm.controls.heading.value;
    this.termsModel.details = TermsForm.controls.details.value;
    this.cmsService.UpdateTermsAndUse(this.termsModel, this.id).subscribe(data => {
      this.router.navigate(['cms/viewTermsAndUse']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['cms/viewTermsAndUse']);
  }
}
