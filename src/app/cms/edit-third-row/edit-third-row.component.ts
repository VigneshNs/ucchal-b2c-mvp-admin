import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { CmsService } from '../cms.service';
import { ThirdRowModel } from '../third-row-content/third-row.model';
import { Product } from '../../product/add-product/product.model';
import { AppSetting } from '../../config/appSetting';
import { ProductDetails } from '../second-row-content/productDetails.model';

@Component({
  selector: 'app-edit-third-row',
  templateUrl: './edit-third-row.component.html',
  styleUrls: ['./edit-third-row.component.css']
})
export class EditThirdRowComponent implements OnInit {
  productForm: FormGroup;
  holder: any;
  id: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<Product>(true, []);
  displayedColumns: string[] = ['select', 'primeImage', 'productName', 'styleCode', 'skuCode', ];
  rowModel: ThirdRowModel;
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
  showError = false;
  urls = new Array<string>();
  clickID;
  tagValue: any;
  productImageUrl: string;
  productStore: any;

  constructor(private cmsSerivce: CmsService, private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) { 
                this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
                  this.id = params.get('id');
                });
                this.productImageUrl = AppSetting.productImageUrl;
              }
              ngOnInit() {
                this.createForm();
                this.getThirdDetails();
                this.getAllProducts();
                this.getAllProductTag();
              }
              createForm() {
                this.productForm = this.fb.group({
                  title: [''],
                  description: ['']
                });
              }
              getThirdDetails() {
                this.cmsSerivce.getSingleThirdProducts(this.id).subscribe(data => {
                  console.log(data);
                 /*  const temp = data.productDetails;
                  temp.forEach(element => {
                    this.selection.toggle(element);
                    element.selected = !element.selected;
                  }); */
                  this.holder = data;
                  console.log(this.selection);
                  this.newTest();
                  console.log(this.selection.selected);
                  /* this.secondModel = data[0];
                  this.productLength = this.secondModel.productDetails.length;
                  this.dataSource = new MatTableDataSource<PeriodicElement>(data); */
                }, err => {
                  console.log(err);
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
                  this.productStore = data;
                  this.productData = new MatTableDataSource<Product>(data);
                  this.productData.sort = this.sort;
                  this.productData.paginator = this.paginator;
                  this.productData.filterPredicate = this.createProductFilter();
                  this.checkCheckedProduct();
                  console.log('productdata', this.productData);
                }, err => {
                  console.log(err);
                });
              }
              checkCheckedProduct() {
                const temps = this.holder.productDetails.map(e => e.productId);
                const obj = {};
                for (const temp of temps) {
                  if (!obj[temp]) {
                    const element = temp;
                    obj[element] = true;
                  }
                }
                for (const product of this.productStore) {
                  if (obj[product._id]) {
                    this.selection.toggle(product);
                    product.selected = !product.selected;
                  } else {
                    continue;
                  }
                }
                console.log('final', this.selection);
                this.productData = new MatTableDataSource<Product>(this.productStore);
                this.productData.sort = this.sort;
                this.productData.paginator = this.paginator;
                this.productData.filterPredicate = this.createProductFilter();
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
                console.log(this.selection.selected);
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
                console.log(this.selection);
                this.message = 'Third Row Created';
                this.rowModel = new ThirdRowModel();
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

                this.cmsSerivce.addThirdRow(this.rowModel).subscribe(data => {
                  this.snackBar.open(this.message, this.action, {
                    duration: 2000,
                  });
                  this.router.navigate(['cms/viewThird']);
                }, err => {
                  console.log(err);
                });
              }
              updateCancel() {
                this.router.navigate(['cms/viewThird']);
              }
            }
