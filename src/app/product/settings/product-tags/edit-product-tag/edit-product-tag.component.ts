import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { ProductTag } from '../add-product-tag/productTag.model';

@Component({
  selector: 'app-edit-product-tag',
  templateUrl: './edit-product-tag.component.html',
  styleUrls: ['./edit-product-tag.component.css']
})
export class EditProductTagComponent implements OnInit {
  productTagForm: FormGroup;
  productTagModel: any;
  id: string;
  holder: ProductTag;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    this.createForm();
    this.getSelectedProductTag();
  }
  createForm() {
    this.productTagForm = this.fb.group({
      tagName: [''],
      position: [''],
      tagValue: this.fb.array([])
    });
  }
  addForm() {
    const tagValue = this.fb.group({
      tagValueName: ['']
    });
    this.productTagValueForms.push(tagValue);
  }
  get  productTagValueForms() {
    return this.productTagForm.get('tagValue') as FormArray;
  }
  deleteProductTagValue(i) {
    this.productTagValueForms.removeAt(i);
  }
  addNewForm() {
    for (let i = 0; i <= this.productTagModel.tagValue.length - 1; i++) {
      const tagValue = this.fb.group({
        tagValueName: [this.productTagModel.tagValue[i].tagValueName],
      });
      this.productTagValueForms.push(tagValue);
    }
  }
  getSelectedProductTag() {
    this.productService.getSelectedProductTag(this.id).subscribe(data => {
      console.log(data);
      this.productTagModel = data;
      this.addNewForm();
    }, error => {
      console.log(error);
    });
  }
  cancelTag() {
    this.router.navigate(['product/viewProductTag']);
  }
  updateProductTag(tagName, position, productTagForm: FormGroup) {
    this.holder = new ProductTag();
    this.holder.tagName = tagName;
    this.holder.position = position;
    this.holder.tagValue = productTagForm.controls.tagValue.value;
    this.productService.editProductTag(this.id, this.holder).subscribe(data => {
      this.router.navigate(['product/viewProductTag']);
    }, error => {
      console.log(error);
    });
  }
}
