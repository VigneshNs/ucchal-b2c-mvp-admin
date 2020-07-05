import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { FAQModel } from '../faq/faq.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.css']
})
export class ViewFaqComponent implements OnInit {
  faqModel: any;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getAllFAQ();
  }
  getAllFAQ() {                               // Retrieve All FAQ
    this.cmsService.getAllFAQ().subscribe(data => {
      this.faqModel = data;
    }, error => {
      console.log(error);
    });
  }
  deleteFAQ(row) {                                // Delete Single FAQ
    this.cmsService.deleteSingleFAQ(row._id).subscribe(data => {
      this.faqModel = data;
    }, error => {
      console.log(error);
    });
  }
  editFAQ(row) {
    this.router.navigate(['cms/editFaq/', row._id]);
  }
}
