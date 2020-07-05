import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from './../../config/appSetting';
import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
import { DownloadProductService } from '../download-product-popup/download-product.service';

export interface PeriodicElement {
  productName: string;
  styleCode: string;
}
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  catFilter: ElementRef<any>;
  vendorModel: any;
  productStore: any;
  countryWisePriceModel: any;
  @ViewChild('category', {static: false})set categorySet(contentSelect: ElementRef) {
    this.catFilter = contentSelect;
  }
  displayedColumns = [ 'select', 'variants',  'productName', 'status', 'price',
   'styleCode', 'Action'];
  displayedColumns1 = ['image', 'productName', 'price', 'INTsku', 'view', 'edit', 'delete'];
  expandedElement: PeriodicElement | null;
  productModel: Product;
  productImageUrl: string;
  productData;
  message: string;
  action: string;
  settingsModelData: any;
  settingsColorData: any;
  settigsSizeData: any;
  brandModel: any;
  superCategoryModel: any;
  secondValue: any;
  productForm: FormGroup;
  sortValue = [{ title: 'Recent First', val: 1, id: 'date' },
  { title: 'Old First', val: -1, id: 'date' },
  { title: 'A to Z', val: 1, id: 'name' },
  { title: 'Z to A', val: -1, id: 'name' }];
  sortModel: Product;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  childSource: MatTableDataSource<PeriodicElement>;
  searchName = ['Parent', 'Child'];
  holdSearch: any;
  holder: any;
  showParent = true;
  showParentData = true;
  parentId: any = [];
  childData;
  pages: any;
  queryParams: {
    pageNo: number,
  };
  selectedCurrency = 'INR';
  selectedPriceRate = 1;
  noOfPages: any[];
  previousData;
  filterProduct = false;
  searchProduct = false;
  paginatorPages: {
    pageNo: number,
    perPage: number,
  };
  isSelectedSearch = false;
  loader = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router,
              private route: ActivatedRoute, private downloadProductService: DownloadProductService,
              private productService: ProductService, private snackBar: MatSnackBar) {
                this.showSuperCategory();
                this.getCountryWisePrice();
                this.productImageUrl = AppSetting.productImageUrl;
                this.loader = false;
  }

  ngOnInit() {
    this.createForm();

  }
  setPage() {
    this.previousData = {
      pageNo: 1,
      perPage: 30
    };
    this.getProduct(this.previousData);
  }
  createForm() {
    this.productForm = this.fb.group({
      category: [''],
      priceRange: [''],
      search: [''],
      vendor: ['']
    });
  }
  getProduct(detail) {
    this.productService.getProducts(detail).subscribe(data => {
      console.log('toPar', data);
      this.productStore = data.products;
      this.holder = data.products;
      this.pages = data.pages;
      this.productData = new MatTableDataSource<Product>(this.holder);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder);
      this.showParentData = true;
      this.noOfPages = [];
          for(let i = 1; i <= this.pages; i++){
            this.noOfPages.push(i);  
          }
          console.log('noofpages',this.noOfPages);
       /*    this.getChildData(); */
    /* this.getProducts(); */
    this.getProductSettings();
   /*  this.getAllBrand(); */
   this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  categoryWiseFilter(filter) {
    this.loader = false;
    this.productService.categoryWiseProductFilterByAdmin(filter).subscribe(data => {
      console.log(data);
      if (data[0].data.length === 0) {
        this.productData = [];
        this.noOfPages = [ 0 ];
      } else {
        this.holder = data[0].data;
        this.pages = data[0].metadata[0].total / this.holder.length;
        this.productData = new MatTableDataSource<Product>(this.holder);
        this.productData.sort = this.sort;
        this.productData.paginator = this.paginator;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder);
        this.showParentData = true;
        this.noOfPages = [];
        for (let i = 1; i <= this.pages; i++) {
          this.noOfPages.push(i);
        }
        console.log('no of page', this.pages);
      }
     /*  this.holder = data[0].data;
      this.pages = data[0].metadata[0].total / this.holder.length;
      this.productData = new MatTableDataSource<Product>(this.holder);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder);
      this.showParentData = true;
      this.noOfPages = [];
      for (let i = 1; i <= this.pages; i++) {
        this.noOfPages.push(i);
      } */
      console.log('no of page', this.pages);
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  /* getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      console.log(data,'all products');
      this.getChildData();
    }, err => {
      console.log(err);
    });
  } */
  getChildData() {
    const temp = [];
    this.holder.forEach(element => {
      element.child.forEach(el => {
        temp.push(el);
      });
    });
    this.childSource = new MatTableDataSource<PeriodicElement>(temp);
    this.childData = new MatTableDataSource<PeriodicElement>(temp);
    console.log('selecteddata', this.childData);
  }
  viewUploadProductChild(id, childId) {
    this.router.navigate(['product/viewuploadproductchild/', id, childId]);
  }
  viewUploadProductParent(id) {
    this.router.navigate(['product/viewuploadproductparent/', id]);
  }
  editProduct(id) {
    this.router.navigate(['product/editproduct', id]);
  }
  addProduct() {
    this.router.navigate(['product/addproduct']);
  }
  variantChild(child) {
    this.productData.filteredData.forEach(ele => {
      if (ele._id === child._id) {
        ele.selectedChild = ele.selectedChild === true ? false : true ;
    } else {
      ele.selectedChild = false;
    }
      console.log( 'selectedchild', ele.selectedChild);
  });
  }
  viewChild(childId) {
    this.productService.getProductByChild(childId).subscribe(data => {
      this.viewUploadProductChild(data._id, childId);
    }, error => {
      console.log(error);
    })
    /* this.productStore.forEach(element => {
      element.child.forEach (el => {
        if (el._id === childId) {
          this.viewUploadProductChild(element._id, childId);
        }
      });
    }); */
   }

  editChild(childId) {
    this.productService.getProductByChild(childId).subscribe(data => {
      this.editChildProduct(data._id, childId);
    }, error => {
      console.log(error);
    })
  /*  this.productStore.forEach(element => {
     element.child.forEach (el => {
       if (el._id === childId) {
         this.editChildProduct(element._id, childId);
       }
     });
   }); */
  }
  deleteChild(childId) {
    this.productService.getProductByChild(childId).subscribe(data => {
      this.deletProductChild(data._id, childId);
    }, error => {
      console.log(error);
    })
    /* this.productStore.forEach(element => {
      element.child.forEach (el => {
        if (el._id === childId) {
          this.deletProductChild(element._id, childId);
        }
      });
    }); */
  }
  editChildProduct(id, childId) {
    this.router.navigate(['product/editproduct/', id], {queryParams: {'childId': childId}});
  }
  uploadProduct() {
    this.router.navigate(['product/uploadproduct']);
  }
  openDialog(productId): void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this. deleteProduct(productId);
      }
    });
  }
  deleteProduct(productId) {
    this.message = 'Deleted Successfully';
    this.productService.deleteProduct(productId).subscribe(dataProduct => {
      this.productData = new MatTableDataSource<Product>(dataProduct);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(dataProduct);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
  deletProductChild(parentId, childId) {
    this.productService.deleteProductVariant(parentId, childId) .subscribe(data => {
    this.productModel = data;
    this.holder = data.product;
    this.productData = new MatTableDataSource<Product>(data.product);
    this.productData.sort = this.sort;
    this.productData.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<PeriodicElement>(data.product);
    this.showParentData = true;
    }, error => {
      console.log(error);
    });
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.settingsColorData = data[0].color;
      this.settigsSizeData = data[0].size;
      this.settingsModelData = data[0].filterOptionPriceValue;
      console.log(this.settingsModelData);
    }, err => {
      console.log(err);
    });
  }
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, err => {
      console.log(err);
    });
  }
  filterByVendor(e) {
    this.searchProduct = false;
    this.productForm.controls.priceRange.reset();
    this.productForm.controls.category.reset();
    this.productForm.controls.search.reset();
    /* this.catFilter.nativeElement.value = ''; */
    if (e.value === 'None') {
      this.setPage();
    } else {
    const holder = {
      vendorId : e.value._id,
      pageNo: 1,
      perPage: 30
    };
    this.filterProduct = true;
    this.previousData = holder;
    this.categoryWiseFilter(holder);
  }
  }
  getAllBrand() {                                        // Retrieve All Brand
    this.productService.getAllBrand().subscribe(data => {
      this.brandModel = data;
    }, error => {
      console.log(error);
    });
  }
  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      this.setPage();
      this.getAllVendor();
    }, err => {
      console.log(err);
    });
  }
  filterByOption(e) {
    this.productData.filter = e.value;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.productData.filter = e.value);
  }
  filterByCategory(e) {

    this.searchProduct = false;
    this.productForm.controls.vendor.reset();
    this.productForm.controls.priceRange.reset();
    this.productForm.controls.search.reset();
    if (e.value === 'None') {
      this.setPage();
    } else {
    const holder = {
      superCategoryId: e.value._id,
      pageNo: 1,
      perPage: 30
    };
    this.filterProduct = true;
    this.previousData = holder;
    this.categoryWiseFilter(holder);
    /* this.productData.filter = e.value._id;
    this.dataSource = new MatTableDataSource<PeriodicElement>( this.productData.filter = e.value._id); */
  }
  }
  applySearchFilter(e) {
    this.productData.filter = e.trim().toLowerCase();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.productData.filter = e.trim().toLowerCase());
    console.log('child datasource', this.dataSource);
  }
  filterBySearch(e) {
    console.log(e.target.value);
    if (e.target.value === 'Parent' || e.target.value === 'Child') {
      this.isSelectedSearch = true;
    }
  }
  selectIconSearch(type, sea) {
    console.log(type);
    this.isSelectedSearch = false;
    this.productForm.controls.vendor.reset();
    this.productForm.controls.priceRange.reset();
    this.productForm.controls.category.reset();
    const holder = {
      pageNo: 1,
      perPage: 30,
      search: sea
    };
    if (type === 'Parent') {
      this.showParentData = true;
      this.parentSearch(holder);
      // this.productData.filter = search.trim().toLowerCase();
     /*  console.log('before parentData', this.dataSource); */
      /* this.dataSource = this.productData;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.productData.filter = search.trim().toLowerCase());
      console.log('after parentData', this.childData); */
    } else {
      /* this.showParentData = false; */
      this.childsearch(holder);
    /*   const temp = [];
      this.holder.forEach(element => {
        element.child.forEach(el => {
          temp.push(el);
        });
      });
      console.log('before childData', this.childData);
      this.dataSource = this.childData;
      this.childData = new MatTableDataSource<PeriodicElement>(temp);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.childData.filter = search.trim().toLowerCase());
      console.log('after childData', this.childData); */
    }
  }
  parentSearch(sea) {
   /*  const holder = {
      pageNo: 1,
      perPage: 30,
      search: sea
    }; */
    this.searchProduct = true;
    this.filterProduct = false;
    this.previousData = sea;
    this.loader = false;
    this.productService.searchParentProductByAdmin(sea).subscribe(data => {
      this.isSelectedSearch = false;
      if (data[0].data.length === 0) {
        this.productData = [];
        this.noOfPages = [ 0 ];
      } else {
        this.holder = data[0].data;
        this.pages = data[0].metadata[0].total / this.holder.length;
        this.productData = new MatTableDataSource<Product>(this.holder);
        this.productData.sort = this.sort;
        this.productData.paginator = this.paginator;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder);
        this.noOfPages = [];
            for(let i = 1; i <= this.pages; i++){
              this.noOfPages.push(i);  
            }
            console.log('no of page', this.pages);
      }
      
          this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  childsearch(sea) {
   /*  const holder = {
      pageNo: 1,
      perPage: 30,
      search: sea
    }; */
    this.searchProduct = true;
    this.filterProduct = false;
    this.previousData = sea;
    this.loader = false;
    this.productService.searchChildProductByAdmin(sea).subscribe(data => {
      if (data[0].data.length === 0) {
        this.productData = [];
        this.noOfPages = [ 0 ];
      } else {
        const holder = data[0].data;
        this.holder = [];
        holder.forEach(e => {
          this.holder.push(e.child);
           });
        console.log(this.holder);
        this.pages = data[0].metadata[0].total / this.holder.length;
        this.childData = new MatTableDataSource<PeriodicElement>(this.holder);
        this.childData.sort = this.sort;
        this.childData.paginator = this.paginator;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder);
        this.showParentData = false;
        this.noOfPages = [];
            for(let i = 1; i <= this.pages; i++){
              this.noOfPages.push(i);  
            }
            console.log('no of page', this.pages);
      }
      
          this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  selectSearch(e) {
    if (e.value === 'Parent') {
      this.showParent = true;
      this.productData = new MatTableDataSource<PeriodicElement>(this.holder);
    /*   this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.holder); */
    } else {
      this.showParent = false;
      const array: any = [];
      this.holder.forEach(element => {
        element.child.forEach(el => {
          array.push(el);
        });
        console.log('seleccteddata', this.holder);
      });
      this.productData = new MatTableDataSource<PeriodicElement>(array);
     /*  this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(array); */
    }
  }
  filterByPriceRange(e) {
    this.searchProduct = false;
    this.productForm.controls.vendor.reset();
    this.productForm.controls.category.reset();
    this.productForm.controls.search.reset();
    /* this.catFilter.nativeElement.value = ''; */
    if (e.value === 'None') {
      this.setPage();
    } else {
    const holder = {
      minPrice: e.value.minPrice,
      maxPrice: e.value.maxPrice,
      pageNo: 1,
      perPage: 30
    };
    this.filterProduct = true;
    this.previousData = holder;
    this.categoryWiseFilter(holder);
  }
  }
  filterBySortProduct(data) {
    if (data.value.id === 'date') {
      this.dateSort(data);
    } else if (data.value.id === 'name') {
      this.productNameSort(data);
    }
  }
  dateSort(row) {
    this.sortModel = new Product();
    this.sortModel.dateSort = row.value.val;
    this.productService.sortProuctByDate(this.sortModel).subscribe(data => {
      this.productData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
  productNameSort(row) {
    this.sortModel = new Product();
    this.sortModel.nameSort = row.value.val;
    this.productService.sortProuctByName(this.sortModel).subscribe(data => {
      this.productData = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.styleCode + 1}`;
  }
  deleteMultiProduct() {
    this.loader = false;
    this.productService.deleteMultiProduct(this.selection.selected).subscribe(data => {
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.selection.clear();
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  setPublishads() {
    this.loader = false;
    this.productService.publishMethodProduct(this.selection.selected).subscribe(data => {
     /*  this.getProducts(); */
      /* this.reDirect(); */
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.selection.clear();
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  setUnPublishads() {
    this.loader = false;
    this.productService.unPublishMethodProduct(this.selection.selected).subscribe(data => {
     /*  this.getProducts(); */
      /* this.reDirect(); */
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.selection.clear();
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  reDirect() {
    this.router.navigate([], {
      relativeTo: this.route
    });
  }
  nextPage(num) {
    this.previousData.pageNo = num;
    if (this.filterProduct) {
     
      this.categoryWiseFilter(this.previousData);
      console.log(this.previousData);
    } else if (this.searchProduct) {
      if (this.showParentData) {
        this.parentSearch(this.previousData);
      } else {
        this.childsearch(this.previousData);
      }
    } else {
      this.getPage(num);
    }
  }
  getPage(item){
    console.log('item', item);
   /*  this.queryParams = {
      pageNo: item,
    }; */
    this.previousData = {
      pageNo: item,
      perPage: 30
    };
    this.getProduct(this.previousData);
    /* const num = item;
    this.router.navigateByUrl('product/viewproduct/', {skipLocationChange: false}).then(() => {
        this.router.navigate(['product/viewproduct/', num], {queryParams: {
          'pageNo': item
        }});
    }); */
  }
  updateProduct() {
    this.router.navigate(['product/updateproduct']);
  }
  downloadProduct() {
    this.downloadProductService.selectCategory(this.superCategoryModel).subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
  addChild(id) {
    this.router.navigate(['product/addsinglechildupload/', id]);
  }
  getCountryWisePrice() {
    this.productService.getCountryWisePrice().subscribe(data => {
      /* this.countryWisePriceModel = data; */
      this.countryWisePriceModel = data.reduce((unique, o) => {
        if (!unique.some(obj => obj.currencyCode === o.currencyCode)) {
          unique.push(o);
        }
        return unique;
    }, []);
      console.log(this.countryWisePriceModel, 'priceRate');
    }, error => {
      console.log(error);
    });
  }
  selectCountryCode(e) {
    this.selectedCurrency = e.value;
    const temp = this.countryWisePriceModel.find(a => a.currencyCode === e.value);
    this.selectedPriceRate = temp.amount;
  }
}
