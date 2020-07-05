import { Component, OnInit } from '@angular/core';
import { ProductOption } from './../add-product-option/product-option.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product.service';
import { ProductOptionValue } from './../add-product-option/product-option-value.model';

@Component({
  selector: 'app-edit-product-option',
  templateUrl: './edit-product-option.component.html',
  styleUrls: ['./edit-product-option.component.css']
})
export class EditProductOptionComponent implements OnInit {
  optionDetailsForm: FormGroup;
  productOptionModel: ProductOption;
  id: string;
  productOptionValueModel: ProductOptionValue;
  constructor(private fb: FormBuilder, private productService: ProductService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
   }

  ngOnInit() {
    this.getSelectedOption();
    this.createForm();
  }

  getSelectedOption() {
    this.productService.singleProductOption(this.id).subscribe(data => {
      this.productOptionModel = data;
      this.addNewForm();
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.optionDetailsForm  = this.fb.group({
    optionName: [''],
    optionValue: this.fb.array([])
    });
    /* this.addForm(); */
  }

  addForm() {
    const productoptionValue = this.fb.group({
      optionValueName: [''],
      sortOrder: ['']
    });
    this.productOptionValueForms.push(productoptionValue);
  }
  addNewForm() {
    for (let i = 0; i <= this.productOptionModel.optionValue.length - 1; i++) {
      const productoptionValue = this.fb.group({
        optionValueName: [this.productOptionModel.optionValue[i].optionValueName],
        sortOrder: [this.productOptionModel.optionValue[i].sortOrder],
      });
      this.productOptionValueForms.push(productoptionValue);
    }
  }
  updateProductOption(optionName, optionDetailsForm: FormGroup) {
      this.productOptionModel = new ProductOption();
      this.productOptionModel.optionName = optionName;
      this.productOptionModel.optionValue = optionDetailsForm.controls.optionValue.value;
      this.productService.editProductOption(this.id, this.productOptionModel).subscribe(data => {
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
