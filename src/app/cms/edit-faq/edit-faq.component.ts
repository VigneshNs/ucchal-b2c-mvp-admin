import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { FAQModel } from '../faq/faq.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  id: string;
  FAQEditForm: FormGroup;
  faqModel: any;
  faqAddModel: FAQModel;

  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }
  ngOnInit() {
    this.createForm();
    this.getSelectedFAQ();
  }
  getSelectedFAQ() {                            // Retrieve Selected FAQ
    this.cmsService.getSingleFAQ(this.id).subscribe(data => {
      this.faqModel = data;
      console.log(data);
      this.addNewForm();
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.FAQEditForm = this.fb.group({
      faqHeading: [''],
      faqs: this.fb.array([]),
    });
  }
  addForm() {
    const faqs = this.fb.group({
      faqQuestion: ['', Validators.required],
      faqAnswers: ['', Validators.required],
    });
    this.faqForms.push(faqs);
  }
  get faqForms() {
    return this.FAQEditForm.get('faqs') as FormArray;
  }
  deleteFAQ(i) {
    this.faqForms.removeAt(i);
  }
  cancelFAQ() {
    this.router.navigate(['cms/viewFaq']);
  }
  addNewForm() {
    for (let i = 0; i <= this.faqModel.faqDetails.length - 1; i++) {
      const faqs = this.fb.group({
        faqQuestion: [this.faqModel.faqDetails[i].faqQuestion],
        faqAnswers: [this.faqModel.faqDetails[i].faqAnswers]
      });
      this.faqForms.push(faqs);
    }
  }
  updateFAQ(FAQEditForm: FormGroup, row) {                                // Update FAQ
    this.faqAddModel = new FAQModel();
    this.faqAddModel.faqHeading = FAQEditForm.controls.faqHeading.value;
    this.faqAddModel.faqDetails = FAQEditForm.controls.faqs.value;
    this.cmsService.updateSingleFAQ(this.faqAddModel, row._id).subscribe(data => {
      this.router.navigate(['cms/viewFaq']);
    }, error => {
      console.log(error);
    });
  }
}
