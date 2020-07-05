import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivacyPolicy } from './privacy-policy.model';
import { MatSnackBar } from '@angular/material';
import { CmsService } from '../cms.service';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicyForm: FormGroup;
  privacyPolicyModel: PrivacyPolicy;

  constructor(private fb: FormBuilder, private cmsService: CmsService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.privacyPolicyForm = this.fb.group({
      policyHeading: [''],
      policies: this.fb.array([])
    });
    this.addPolicyForm();
  }
  addPolicyForm() {
    const policies = this.fb.group({
      policyQuestion: ['', Validators.required],
      policyAnswers: ['', Validators.required],
    });
    this.policyForms.push(policies);
  }
  get policyForms() {
    return this.privacyPolicyForm.get('policies') as FormArray;
  }
  deletePolicies(i) {
    this.policyForms.removeAt(i);
  }
  createPolicy(privacyPolicyForm: FormGroup) {                    // Create Privacy Policy
    this.privacyPolicyModel = new PrivacyPolicy();
    this.privacyPolicyModel.policyHeading = privacyPolicyForm.controls.policyHeading.value;
    this.privacyPolicyModel.policies = privacyPolicyForm.controls.policies.value;
    this.cmsService.CreatePrivacyPolicy(this.privacyPolicyModel).subscribe(data => {
      this.router.navigate(['cms/viewPrivacyPolicy']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['cms/viewPrivacyPolicy']);
  }
}
