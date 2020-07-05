import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-create-new-arrival',
  templateUrl: './create-new-arrival.component.html',
  styleUrls: ['./create-new-arrival.component.css']
})
export class CreateNewArrivalComponent implements OnInit {
  condition;
  productModel: any;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('MatPaginator', {static: true}) paginator: MatPaginator;
  @ViewChild('startDate', {read: ElementRef , static: false}) startDate: ElementRef;
  @ViewChild('endDate', {read: ElementRef , static: false}) endDate: ElementRef;
  @ViewChild('minPrice', {read: ElementRef , static: false}) minPrice: ElementRef;
  @ViewChild('maxPrice', {read: ElementRef , static: false}) maxPrice: ElementRef;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  customDate = false;
  isBothPrice = false;
  isMainCategory = false;
  isSubCategory = false;
  isCategory = false;
  automatedDateCondition = [{conditionName: 'Date Wise', conditionValue: 'dateWise'},
                        {conditionName: 'Price Wise', conditionValue: 'priceWise'},
                        {conditionName: 'Category Wise', conditionValue: 'categoryWise'}];
  selectedAutoCondition: any;
  categoryModel: any;
  selectedSuperCategory: any;
  selectedMainCategory: any;
  selectedSubCategory: any;
  categoryHolder: any = [];
  constructor(private productService: ProductService, private router: Router) {
    this.getAllProduct();
    this.getCategory();
  }

  ngOnInit() {
  }
  getCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.categoryModel = data;
    }, error => {
      console.log(error);
    });
  }
  onCondition(condition) {
    condition.value === '1' ? this.condition = 'manual' : this.condition = 'automated';
  }
  getAllProduct() {
    this.productService.getProductForNewArrival().subscribe(data => {
      this.productModel = data;
      this.productModel = new MatTableDataSource<any>(data);
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productModel = part;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productModel.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.productModel.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.styleCode + 1}`;
  }
  onSubmit() {
    // console.log(this.selection.selected);
    const obj: any = {};
    obj.manual = true;
    obj.automated = false;
    obj.productId = this.selection.selected.map(a => a._id);
    this.productService.createNewArrival(obj).subscribe(data => {
      this.router.navigate(['product/viewNewArrival']);
    }, error => {
      console.log(error);
    });
    console.log(obj);
  }
  onSelectCondition(e) {
    // console.log(e.target.value);
    this.selectedAutoCondition = e.target.value;
  }
  onDateCondition(e) {
    e.value === '1' ? this.customDate = false : this.customDate = true;
  }
  onSubmitDateCondition() {
    // console.log(this.startDate.nativeElement.value, this.endDate.nativeElement.value);
    const mainObj: any = {};
    const subObj: any = {};
    const array: any = [];
    if (this.customDate) {
      subObj.startingDate = this.startDate.nativeElement.value;
      subObj.endingDate = this.endDate.nativeElement.value;
      subObj.customDate = true;
      subObj.autoDate = false;
      array.push(subObj);
    } else {
      subObj.autoDate = true;
      subObj.customDate = false;
      array.push(subObj);
    }
    mainObj.manual = false;
    mainObj.automated = true;
    mainObj.dateWise = true;
    mainObj.priceWise = false;
    mainObj.categoryWise = false;
    mainObj.dateCondition = array;
    this.productService.createNewArrival(mainObj).subscribe(data => {
      this.router.navigate(['product/viewNewArrival']);
    }, error => {
      console.log(error);
    });
  }
  onPriceCondition(e) {
    e.value === '1' ? this.isBothPrice = false : this.isBothPrice = true;
  }
  onSubmitPriceCondition() {
    const mainObj: any = {};
    const subObj: any = {};
    const array: any = [];
    if (this.isBothPrice) {
      subObj.minPrice = this.minPrice.nativeElement.value;
      subObj.maxPrice = this.maxPrice.nativeElement.value;
      subObj.fixedRange = false;
      subObj.customRange = true;
      array.push(subObj);
    } else {
      subObj.maxPrice = this.maxPrice.nativeElement.value;
      subObj.fixedRange = true;
      subObj.customRange = false;
      array.push(subObj);
    }
    mainObj.manual = false;
    mainObj.automated = true;
    mainObj.dateWise = false;
    mainObj.priceWise = true;
    mainObj.categoryWise = false;
    mainObj.priceCondition = array;
    this.productService.createNewArrival(mainObj).subscribe(data => {
      this.router.navigate(['product/viewNewArrival']);
    }, error => {
      console.log(error);
    });
  }
  onSelectSuperCategory(category) {
   
    this.selectedSuperCategory = this.categoryModel.find(a => a._id === category.target.value);
    this.selectedSuperCategory.mainCategory.length === 0 ?
      (this.isMainCategory = false , this.isCategory = true) :
      (this.isMainCategory = true , this.isCategory = false);
    this.isSubCategory = false;
  }
  onSelectMainCategory(mainCategory) {
    this.selectedMainCategory = this.selectedSuperCategory.mainCategory.find(a => a._id === mainCategory.target.value);
    this.selectedMainCategory.subCategory.length === 0 ?
     (this.isSubCategory = false, this.isCategory = true) :
      (this.isSubCategory = true , this.isCategory = false);
  }
  onSelectSubCategory(subCategory) {
    this.isCategory = true;
    this.selectedSubCategory = this.selectedMainCategory.subCategory.find(a => a._id === subCategory.target.value);
  }
  onAddCategory() {
    const obj: any = {};
    obj.superCategoryName = this.selectedSuperCategory.categoryName;
    obj.superCategoryId = this.selectedSuperCategory._id;
    obj.mainCategoryName = this.isMainCategory === false ? undefined : this.selectedMainCategory.mainCategoryName;
    obj.mainCategoryId = this.isMainCategory === false ? undefined : this.selectedMainCategory._id;
    obj.subCategoryName = this.isSubCategory === false ? undefined : this.selectedSubCategory.subCategoryName;
    obj.subCategoryId = this.isSubCategory === false ? undefined : this.selectedSubCategory._id;
    this.categoryHolder.push(obj);
  }
  clear(category) {
    const index = this.categoryHolder.indexOf(category);
    this.categoryHolder.splice(index, 1);
  }
  onSubmitCategory() {
    const mainObj: any = {};
    mainObj.manual = false;
    mainObj.automated = true;
    mainObj.dateWise = false;
    mainObj.priceWise = false;
    mainObj.categoryWise = true;
    mainObj.categoryCondition = this.categoryHolder;
    this.productService.createNewArrival(mainObj).subscribe(data => {
      this.router.navigate(['product/viewNewArrival']);
    }, error => {
      console.log(error);
    });
  }
}
