import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductOption } from './../../product-option/add-product-option/product-option.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { ProductOptionValue } from './product-option-value.model';

@Component({
  selector: 'app-add-product-option',
  templateUrl: './add-product-option.component.html',
  styleUrls: ['./add-product-option.component.css']
})
export class AddProductOptionComponent implements OnInit {
  optionDetailsForm: FormGroup;
  productOptionModel: ProductOption;
  productOptionValueModel: ProductOptionValue;
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.optionDetailsForm  = this.fb.group({
    optionName: ['', Validators.required],
    optionValue: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const productoptionValue = this.fb.group({
      optionValueName: ['', Validators.required],
      sortOrder: ['', Validators.required]
    });
    this.productOptionValueForms.push(productoptionValue);
  }

  addProductOption(optionDetailsForm: FormGroup) {
      this.productOptionModel = new ProductOption();
      this.productOptionModel.optionName = optionDetailsForm.controls.optionName.value;
      this.productOptionModel.optionValue = optionDetailsForm.controls.optionValue.value;
      this.productService.addProductOption(this.productOptionModel).subscribe(data => {
      this.productOptionModel = data;
      this.router.navigate(['product/viewproductoption']);
    }, error => {
      console.log(error);
    });
  }

  get  productOptionValueForms() {
    return this.optionDetailsForm.get('optionValue') as FormArray;
  }
  deleteRequirements(i) {
    this.productOptionValueForms.removeAt(i);
  }
  cancelOption()   {
    this.router.navigate(['product/viewproductoption']);
  }
}
