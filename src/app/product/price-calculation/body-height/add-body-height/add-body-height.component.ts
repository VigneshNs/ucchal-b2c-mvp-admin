import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../product.service';
import { BodyHeight } from '../../../../shared/model/bodyHeight.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-body-height',
  templateUrl: './add-body-height.component.html',
  styleUrls: ['./add-body-height.component.css']
})
export class AddBodyHeightComponent implements OnInit {
  @ViewChild('height', {static: false}) inputData: ElementRef;
  categoryModel: any;
  selectedSuperCategory: any;
  selectedSubCategory: any;
  selectedMainCategory: any;
  array: any = [];

  constructor(private productService: ProductService, private router: Router) {
    this.getCategory();
  }

  ngOnInit() {
  }
  getCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      console.log(data);
      this.categoryModel = data;
    }, error => {
      console.log(error);
    });
  }
  categorySelected(e) {
    this.selectedSuperCategory = e.value;

  }
  categoryMainCategory(e) {
    this.selectedMainCategory = e.value;
  }
  categorySubCategory(e) {
    this.selectedSubCategory = e.value;
  }
  addSize(height) {
    this.array.push(height);
    this.inputData.nativeElement.value = '';
  }
  clear(height) {
    const index = this.array.indexOf(height);
    this.array.splice(index, 1);
    console.log(this.array);
  }
  onSubmit() {
    const holder = new BodyHeight();
    holder.superCategoryId = this.selectedSuperCategory._id;
    holder.superCategoryName = this.selectedSuperCategory.categoryName;
    holder.mainCategoryId = this.selectedMainCategory ? this.selectedMainCategory._id : undefined;
    holder.mainCategoryName = this.selectedMainCategory ? this.selectedMainCategory.mainCategoryName : undefined;
    holder.subCategoryId = this.selectedSubCategory ? this.selectedSubCategory._id : undefined;
    holder.subCategoryName = this.selectedSubCategory ? this.selectedSubCategory.subCategoryName : undefined;
    holder.height = this.array;
    this.productService.addBodyHeight(holder).subscribe(data => {
      this.router.navigate(['product/viewbodyheight']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['product/viewbodyheight']);
  }
}
