import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-invoice-setting',
  templateUrl: './customer-invoice-setting.component.html',
  styleUrls: ['./customer-invoice-setting.component.css']
})
export class CustomerInvoiceSettingComponent implements OnInit {
  invoiceFormSetting: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.invoiceFormSetting = this.fb.group({
      cgst: ['', Validators.required]
    });
  }
}
