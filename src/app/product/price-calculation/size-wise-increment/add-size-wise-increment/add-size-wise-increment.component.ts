import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { Router } from '@angular/router';
import { SizeWiseIncrement } from '../../../../shared/model/sizeWiseIncrement.model';

@Component({
  selector: 'app-add-size-wise-increment',
  templateUrl: './add-size-wise-increment.component.html',
  styleUrls: ['./add-size-wise-increment.component.css']
})
export class AddSizeWiseIncrementComponent implements OnInit {
  categoryModel: any;
  selectedSuperCategory: any;
  selectedMainCategory: any;
  selectedSubCategory: any;
  sizeHolder: any;
  selectedSize: any;

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
    console.log('super', this.selectedSuperCategory);
    if (this.selectedSuperCategory.mainCategory.length === 0) {
      this.getSize();
    }
  }
  categoryMainCategory(e) {
    this.selectedMainCategory = e.value;
  }
  categorySubCategory(e) {
    this.selectedSubCategory = e.value;
    console.log('sub', this.selectedSubCategory);
    this.getSize();
  }
  selectedSizeCategory(e) {
    this.selectedSize = e.value;
  }
  getSize() {
    if (this.selectedSubCategory) {
      this.selectedSubCategory.attribute.forEach(a => {
        if (a.fieldName === 'size') {
          this.sizeHolder = a;
        }
      });
    } else {
      this.selectedSuperCategory.attribute.forEach(b => {
        if (b.fieldName === 'size') {
          this.sizeHolder = b;
        }
      });
    }
    console.log(this.sizeHolder);
  }
  onSubmit(dis) {
    const holder = new SizeWiseIncrement();
    holder.superCategoryId = this.selectedSuperCategory._id;
    holder.superCategoryName = this.selectedSuperCategory.categoryName;
    holder.mainCategoryId = this.selectedMainCategory ? this.selectedMainCategory._id : undefined;
    holder.mainCategoryName = this.selectedMainCategory ? this.selectedMainCategory.mainCategoryName : undefined;
    holder.subCategoryId = this.selectedSubCategory ? this.selectedSubCategory._id : undefined;
    holder.subCategoryName = this.selectedSubCategory ? this.selectedSubCategory.subCategoryName : undefined;
    holder.size = this.selectedSize;
    holder.incPercentage = dis;
    this.productService.addSizeWiseIncrement(holder).subscribe(data => {
      this.router.navigate(['product/viewsizewiseincrement']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['product/viewsizewiseincrement']);
  }
}
