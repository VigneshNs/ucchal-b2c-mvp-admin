import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivacyPolicy } from '../privacy-policy/privacy-policy.model';
import { MatSnackBar } from '@angular/material';
import { CmsService } from '../cms.service';

@Component({
  selector: 'app-view-privacy-policy',
  templateUrl: './view-privacy-policy.component.html',
  styleUrls: ['./view-privacy-policy.component.css']
})
export class ViewPrivacyPolicyComponent implements OnInit {
  privacyEditForm: FormGroup;
  privacyForm: FormGroup;
  privacyModel: any;
  edit = false;
  privacyAddModel: PrivacyPolicy;

  constructor(private fb: FormBuilder, private cmsService: CmsService, private router: Router) { }
  ngOnInit() {
    this.createForm();
    this.getAllPrivacyPolicy();
  }
  createForm() {
    this.privacyEditForm = this.fb.group({
      id: [''],
      policyHeading: [''],
      policies: this.fb.array([]),
    });
  }
  addForm() {
    const policies = this.fb.group({
      policyQuestion: ['', Validators.required],
      policyAnswers: ['', Validators.required],
    });
    this.policyForms.push(policies);
  }
  get policyForms() {
    return this.privacyEditForm.get('policies') as FormArray;
  }
  deletePolicies(i) {
    this.policyForms.removeAt(i);
  }
  addNewForm() {
    for (let i = 0; i <= this.privacyModel.policies.length - 1; i++) {
      const policies = this.fb.group({
        id: [this.privacyModel.policies[i]._id],
        policyQuestion: [this.privacyModel.policies[i].policyQuestion],
        policyAnswers: [this.privacyModel.policies[i].policyAnswers]
      });
      this.policyForms.push(policies);
    }
  }
  editPolicy() {
    this.edit = true;
  }
  cancelPolicy() {
    this.edit = false;
  }
  getAllPrivacyPolicy() {                                           // Retrieve Privacy Policy
    this.cmsService.getAllPrivacyPolicy().subscribe(data => {
      this.privacyModel = data[0];
      this.addNewForm();
    }, error => {
      console.log(error);
    });
  }
  updatePolicy(privacyEditForm: FormGroup, data) {                // Update Privacy Policy Details
    this.privacyAddModel = new PrivacyPolicy();
    this.privacyAddModel.policyHeading = privacyEditForm.controls.policyHeading.value;
    this.privacyAddModel.policies = privacyEditForm.controls.policies.value;
    this.cmsService.updatePrivacyPolicy(this.privacyAddModel, data._id).subscribe(value => {
      this.privacyModel = value[0];
      this.cancelPolicy();
    }, error => {
      console.log(error);
    });
  }
}
