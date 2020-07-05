import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorModel } from '../registration/vendor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  @Input() holder: VendorModel;
  @Output() searchVal = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.searchForm = this.fb.group({
      srchterm: ['']
    });
  }
  searchAll(filterData) {
    this.searchVal.emit(filterData);
  }
  searchBy(vendorData, filter) {
    vendorData.forEach(data => {
      if (!data.vendorCode) {
        data.vendorCode = '';
      }
    });
    const filterData = vendorData.filter(data => data.vendorCode.toUpperCase().indexOf(filter.toUpperCase()) > -1);
    this.searchVal.emit(filterData);
  }
}
