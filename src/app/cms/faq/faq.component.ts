import { Component, OnInit } from '@angular/core';
import { FAQModel } from './faq.model';
import { CmsService } from '../cms.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  FAQForm: FormGroup;
  FAQModel: FAQModel;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.FAQForm = this.fb.group({
      faqHeading: [''],
      faqs: this.fb.array([]),
    });
    this.addForm();
  }
  addForm() {
    const faqs = this.fb.group({
      faqQuestion: ['', Validators.required],
      faqAnswers: ['', Validators.required],
    });
    this.faqForms.push(faqs);
  }
  get faqForms() {
    return this.FAQForm.get('faqs') as FormArray;
  }
  deleteFAQs(i) {
    this.faqForms.removeAt(i);
  }
  createFAQ(FAQForm: FormGroup) {                                      // Create FAQ
    this.FAQModel = new FAQModel();
    this.FAQModel.faqHeading = FAQForm.controls.faqHeading.value;
    this.FAQModel.faqDetails = FAQForm.controls.faqs.value;
    this.cmsService.CreateFAQ(this.FAQModel).subscribe(data => {
      this.router.navigate(['cms/viewFaq']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['cms/viewFaq']);
  }
}
