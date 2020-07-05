import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { SeventhRowModel } from './seventh-row.model';
import { CmsService } from '../cms.service';
import { Product } from '../../product/add-product/product.model';
import { AppSetting } from '../../config/appSetting';
import { ProductDetails } from '../second-row-content/productDetails.model';

@Component({
  selector: 'app-seventh-row-content',
  templateUrl: './seventh-row-content.component.html',
  styleUrls: ['./seventh-row-content.component.css']
})
export class SeventhRowContentComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  productForm: FormGroup;
  selection = new SelectionModel<Product>(true, []);
  displayedColumns: string[] = ['select', 'primeImage', 'productName', 'styleCode', 'skuCode', ];
  rowModel: SeventhRowModel;
  message: string;
  action: string;
  subProductModel: Product;
  productNameFilter = new FormControl('');
  productSkuCodeFilter = new FormControl('');
  productData;
  allProducts;
  clickedProducts;
  fileLength;
  fileToUpload;
  urls = new Array<string>();
  showError = false;
  clickID;
  tagValue: any;
  productImageUrl: string;
  constructor(private cmsSerivce: CmsService, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar) {
                this.productImageUrl = AppSetting.productImageUrl;
              }

  ngOnInit() {
    this.createForm();
    this.getAllProducts();
    this.getAllProductTag();
  }
  createForm() {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      selectedProducts: []
    });
  }

  getAllProductTag() {
    this.cmsSerivce.allProductTag().subscribe(data => {
      this.tagValue = data;
    }, err => {
      console.log(err);
    });
  }
  filterByOption(e) {
    this.cmsSerivce.getProductByTag(e.value).subscribe(data => {
      this.productData = new MatTableDataSource<Product>(data);
      /* console.log(this.productData); */
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.productData.filterPredicate = this.createProductFilter();
    }, err => {
      console.log(err);
    });
  }

  getAllProducts() {
    this.cmsSerivce.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.productData.filterPredicate = this.createProductFilter();
      console.log('productdata', this.productData);
    }, err => {
      console.log(err);
    });
  }
  masterToggle() {
    const page: { startIndex: number, endIndex: number } = this.findStartEndIndices();

    const sortedData = this.productData._orderData(this.productData.data);
    if (this.isAllSelected()) {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.deselect(row);
      });
      /* console.log(this.selection.selected); */
    } else {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.select(row);
      });
      /*  this.map1 = this.selection.selected.map(x => x.mobileNumber);
       console.log(this.map1); */
    }
    this.newTest();
  }
  rowToggle(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    this.newTest();
  }
  newTest() {
    this.allProducts = '';
    this.clickedProducts = this.selection.selected;
    this.clickID = this.selection.selected.map(e => e._id);
    this.productForm.controls.selectedProducts.setValue(this.clickedProducts);
  }
  createProductFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.productName.toLowerCase().indexOf(searchTerms.productName) !== -1 &&
        data.skuCode.toLowerCase().indexOf(searchTerms.skuCode) !== -1;
    };
    return filterFunction;
  }
  private findStartEndIndices(): { startIndex: number, endIndex: number } {
    const pageIndex = this.productData.paginator.pageIndex;
    /* console.log(this.productData.paginator); */
    const pageSize = this.productData.paginator.pageSize;
    const total = this.productData.paginator.length;
    const startIndex = pageIndex * pageSize;
    const endIndex = (startIndex + pageSize) > total ? total : startIndex + pageSize;
    return { startIndex: startIndex, endIndex: endIndex };
  }
  isAllSelected() {
    const page: { startIndex: number, endIndex: number }
      = this.findStartEndIndices();
    const sortedData = this.productData._orderData(this.productData.data);
    const numSelected = sortedData.slice(page.startIndex, page.endIndex)
      .filter(row => this.selection.isSelected(row)).length;

    return numSelected === (page.endIndex - page.startIndex);
  }
  isAtLeaseOneSelected() {
    if (this.productData.length === 0) {
      /* console.log(this.productData.length); */
    } else {
      const page: { startIndex: number, endIndex: number } =
        this.findStartEndIndices();
      const sortedData = this.productData._orderData(this.productData.data);
      const numSelected = sortedData.slice(page.startIndex, page.endIndex)
        .filter(row => this.selection.isSelected(row)).length;
      return numSelected > 0;
    }
  }
  onCheck() {
    if (this.selection.selected.length >= 4) {
      this.showError = false;
      this.onSubmit();
    } else {
      this.showError = true;
    }
}

  onSubmit() {
    this.message = 'Seventh Row Created';
    this.rowModel = new SeventhRowModel();
    const array: any = [];
    for ( let i = 0; i <= this.clickedProducts.length - 1; i++) {
      const temp = new ProductDetails();
      const array1: any = [];
      temp.material = this.clickedProducts[i].material;
      temp.price = this.clickedProducts[i].price;
      temp.productId = this.clickedProducts[i]._id;
      temp.productName = this.clickedProducts[i].productName;
      for (let j = 0; j <= this.clickedProducts[i].productImage.length - 1; j++) {
        temp.productImageName = this.clickedProducts[i].productImage[0].productImageName;
      }
      for (let j = 0; j <= this.clickedProducts[i].child.length - 1; j++) {
        array1.push(this.clickedProducts[i].child[j].sizeVariant);
      }
      temp.sizeVariant = array1;
      array.push(temp);
    }
    this.rowModel.productDetails = array;
    this.rowModel.description = this.productForm.controls.description.value;
    this.rowModel.title = this.productForm.controls.title.value;
    this.cmsSerivce.addSeventhRow(this.rowModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['cms/viewSeventh']);
    }, err => {
      console.log(err);
    });
  }

}

