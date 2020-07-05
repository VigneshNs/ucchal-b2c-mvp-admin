import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../add-product/product.model';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  productName: string;
  styleCode: string;
}
@Component({
  selector: 'app-product-sequence',
  templateUrl: './product-sequence.component.html',
  styleUrls: ['./product-sequence.component.css']
})
export class ProductSequenceComponent implements OnInit {
  superCategoryModel: any;
  selectedSuperCategory: any;
  selectedMainCategory: any;
  productModel: any;
  isSuper = false;
  isSub = false;
  num = 0;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  displayedColumns: string[] = ['select', 'seqOrder', 'image', 'productName',  'sku', 'price'];
  selectedSubCategory: any;

  constructor(private productService: ProductService) {
    this.getSuperCategory();
   }

  ngOnInit() {
  }
  getSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, error => {
      console.log(error);
    });
  }
  categorySelected(category) {
    this.isSuper = true;
    this.isSub = false;
    this.selectedSuperCategory = category.value;
    if (this.selectedSuperCategory.mainCategory.length === 0) {
      this.getProductBySuperCategoryForCategory(this.selectedSuperCategory._id);
    }
  }
  categorySubCategory(category) {
    console.log(category);
    this.isSuper = false;
    this.isSub = true;
    this.selectedSubCategory = category.value._id;
    this.productService.productBySubCategoryForSequence(category.value._id).subscribe(data => {
      console.log('ch', data);
      this.productModel = new MatTableDataSource<Product>(data);
      this.dataSource  = new MatTableDataSource<Product>(data);
      console.log('pr', this.productModel);
    }, error => {
      console.log(error);
    });
  }
  categoryMainCategory(mainCategory) {
    this.selectedMainCategory = mainCategory.value;
  }
  getProductBySuperCategoryForCategory(supId) {
    this.productService.productBySuperCategoryForSequence(supId).subscribe(data => {
      this.productModel = new MatTableDataSource<Product>(data);
      this.dataSource  = new MatTableDataSource<Product>(data);
      console.log('pr', this.productModel);
    }, error => {
      console.log(error);
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.styleCode + 1}`;
  }
  getSequence() {
    if (this.isSuper) {
      this.getSuperCategorySequence();
    } else {
      this.getSubCategorySequence();
    }
  }
  getSuperCategorySequence() {
    const holder = this.selection.selected;
    this.productService.addSequenceForSuperCategory(this.selectedSuperCategory._id, holder).subscribe(data => {
      console.log(data);
      /* .map(e => e._id); */
      const hold = data
      this.productModel = new MatTableDataSource<Product>(hold);
      this.dataSource  = new MatTableDataSource<Product>(hold);
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
  getSubCategorySequence() {
    const holder = this.selection.selected;
    this.productService.addSequenceForSubCategory(this.selectedSubCategory, holder).subscribe(data => {
      const hold = data
      this.productModel = new MatTableDataSource<Product>(hold);
      this.dataSource  = new MatTableDataSource<Product>(hold);
      this.selection.clear();
    }, error => {
      console.log(error);
    });
  }
}
