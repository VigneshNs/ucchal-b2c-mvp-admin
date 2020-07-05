import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, TransitionCheckState, MatDialogRef } from '@angular/material';
import { ProductService } from '../../product.service';
import { PlusSize } from '../../../shared/model/plusSize.model';
@Component({
  selector: 'app-add-plus-size',
  templateUrl: './add-plus-size.component.html',
  styleUrls: ['./add-plus-size.component.css']
})
export class AddPlusSizeComponent implements OnInit {
  categoryModel: any;
  selectedSuperCategory: any;
  selectedMainCategory: any;
  selectedSubCategory: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private productService: ProductService,
              private dialog: MatDialogRef<AddPlusSizeComponent>) {
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
  addPlusSize(size) {
      const holder = new PlusSize();
      holder.superCategoryId = this.selectedSuperCategory._id;
      holder.superCategoryName = this.selectedSuperCategory.categoryName;
      holder.mainCategoryId = this.selectedMainCategory ? this.selectedMainCategory._id : undefined;
      holder.mainCategoryName = this.selectedMainCategory ? this.selectedMainCategory.mainCategoryName : undefined;
      holder.subCategoryId = this.selectedSubCategory ? this.selectedSubCategory._id : undefined;
      holder.subCategoryName = this.selectedSubCategory ? this.selectedSubCategory.subCategoryName : undefined;
      holder.startingSize = size;
      this.productService.addPlusSize(holder).subscribe(data => {
      this.dialog.close(true);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.dialog.close();
  }
  updatePlusSize(size, id) {
    const holder = new PlusSize();
    holder.startingSize = size;
    this.productService.updatePlusSize(holder, id).subscribe(data => {
      this.dialog.close(true);
    }, error => {
      console.log(error);
    });
  }
}
