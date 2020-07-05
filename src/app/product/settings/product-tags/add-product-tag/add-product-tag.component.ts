import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductOption } from './../../product-option/add-product-option/product-option.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { ProductTag } from './productTag.model';

@Component({
  selector: 'app-add-product-tag',
  templateUrl: './add-product-tag.component.html',
  styleUrls: ['./add-product-tag.component.css']
})
export class AddProductTagComponent implements OnInit {
  productTagsForm: FormGroup;
  holder: ProductTag;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.productTagsForm = this.fb.group({
      tagName: [''],
      position: [''],
      tagValue: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const tagValue = this.fb.group({
      tagValueName: ['']
    });
    this.productTagValueForms.push(tagValue);
  }
  get  productTagValueForms() {
    return this.productTagsForm.get('tagValue') as FormArray;
  }
  deleteProductTagValue(i) {
    this.productTagValueForms.removeAt(i);
  }
  addProductTag(productTagsForm: FormGroup) {
    this.holder = new ProductTag();
    this.holder.tagName = productTagsForm.controls.tagName.value;
    this.holder.position = productTagsForm.controls.position.value;
    this.holder.tagValue = productTagsForm.controls.tagValue.value;
    this.productService.addProductTags(this.holder).subscribe(data => {
      this.router.navigate(['product/viewProductTag']);
      
    }, error => {
      console.log(error);
    });
  }
  cancelTag() {
    this.router.navigate(['product/viewProductTag']);
  }
}
