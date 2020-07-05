import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router, Data, ParamMap } from '@angular/router';
import { PricePopupService } from '../price-popup/price-popup.service';
import { QtyPopupService } from '../qty-popup/qty-popup.service';
import { SelectionModel } from '@angular/cdk/collections';
import { UploadInventoryService } from '../upload-inventory/upload-inventory.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {
  productModel: any;
  totalPage = 0;
  page = 0;
  vendorModel: any;
  selectedVendor: any;
  vendorStore: any;
  pager: any = {};
  showDropDown = false;
  selection = new SelectionModel<any>(true, []);
  selectType = 'currentPage';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService,
    private pricePopupService: PricePopupService, private qtyPopupService: QtyPopupService, private uploadInventoryService: UploadInventoryService) {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.productModel = data.inventory[0].data.map(a => a._id);
      if (data.inventory[0].metadata.length !== 0) {
        this.page = data.inventory[0].metadata[0].page;
        this.totalPage = data.inventory[0].metadata[0].total;
      }
      this.getAllVendor();
      console.log(data, this.productModel);
    })
    this.activatedRoute.queryParamMap.subscribe((queryParam: ParamMap) => {
      console.log(queryParam);
      this.selectedVendor = queryParam.get('vendId');
      if (queryParam.get('pageNo')) {
        this.page = parseInt(queryParam.get('pageNo'));
      }
      this.setPage(this.page);
    })
  }

  ngOnInit() {
  }
  onClickDropdown() {
    this.showDropDown = !this.showDropDown;
  }
  getAllVendor() {
    this.productService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
      console.log(data);
      if (this.selectedVendor) {
        this.checkVendor();
      }
    }, err => {
      console.log(err);
    });
  }
  checkVendor() {
    this.vendorStore = this.vendorModel.find(a => a._id === this.selectedVendor);
  }
  filterByVendor(e) {
    console.log(e.value);
    const obj: any = {};
    this.selectedVendor = this.vendorModel.find(a => a.vendorName === e.value)._id;
    obj.vendId = this.selectedVendor;
    obj.pageNo = 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute, queryParams: obj
    });
    const pageObj: any = {};
    const vendorObj: any = {};
    const mainObj: any = {};
    pageObj.page = 1;
    pageObj.title = 'pageNo'
    vendorObj.title = 'vendor';
    vendorObj.vendorId = this.selectedVendor;
    mainObj.condition = [];
    mainObj.condition.push(pageObj);
    mainObj.condition.push(vendorObj);
    this.productService.getInventoryByVendor(mainObj).subscribe(data => {
      this.productModel = data[0].data.map(a => a._id);
      if (data[0].metadata.length !== 0) {
        this.page = data[0].metadata[0].page;
        this.totalPage = data[0].metadata[0].total;
      }
      if (this.selectedVendor) {
        this.checkVendor();
      }
    }, error => {
      console.log(error);
    })

  }
  onEditPrice(product, field, title) {
    const obj: any = {};
    obj.selectedVendor = this.selectedVendor;
    obj.page = this.page;
    obj.product = product;
    obj.field = field;
    obj.title = title;
    this.pricePopupService.priceChange(obj).subscribe((data: any) => {
      if (data) {
        this.productModel = data[0].data.map(a => a._id);
        if (data[0].metadata.length !== 0) {
          this.page = data[0].metadata[0].page;
          this.totalPage = data[0].metadata[0].total;
        }
        if (this.selectedVendor) {
          this.checkVendor();
        }
      }
    })
  }
  onEditQuantity(product) {
    const obj: any = {};
    obj.selectedVendor = this.selectedVendor;
    obj.page = this.page;
    obj.product = product;
    this.qtyPopupService.qtyChange(obj).subscribe((data: any) => {
      if (data) {
        this.productModel = data[0].data.map(a => a._id);
        if (data[0].metadata.length !== 0) {
          this.page = data[0].metadata[0].page;
          this.totalPage = data[0].metadata[0].total;
        }
        if (this.selectedVendor) {
          this.checkVendor();
        }
      }
    })
  }
  setPage(page: number) {
    this.pager = this.getPager(this.totalPage, page); 
  /*   this.getPage(page); */
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 30) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 2;
      }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
  getPage(item) {
    if (this.isAllSelected) {
      if (this.selectType === 'currentPage') {
        this.selection.clear();
      }
    }
    const pageObj: any = {};
    const vendorObj: any = {};
    const mainObj: any = {};
    const obj: any = {};
    if (this.selectedVendor) {
      obj.vendId = this.selectedVendor;
      vendorObj.title = 'vendor';
      vendorObj.vendorId = this.selectedVendor;
    }
    obj.pageNo = item;
    this.router.navigate([], {
      relativeTo: this.activatedRoute, queryParams: obj
    });
    pageObj.page = item;
    pageObj.title = 'pageNo'
    mainObj.condition = [];
    mainObj.condition.push(pageObj);
    mainObj.condition.push(vendorObj);
    this.productService.retrieveInventory(mainObj).subscribe(data => {
      this.productModel = data[0].data.map(a => a._id);
      if (data[0].metadata.length !== 0) {
        this.page = data[0].metadata[0].page;
        this.totalPage = data[0].metadata[0].total;
      }
      if (this.selectedVendor) {
        this.checkVendor();
      }
      if (this.isAllSelected()) {
        if (this.selectType === 'allPage') {
          this.selection.clear();
          this.productModel.forEach(a => {
            this.selection.select(a.INTsku)
          })
          this.checkboxLabel();
        }
      }
    }, error => {
      console.log(error);
    })
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
      this.productModel.forEach(row => this.selection.select(row.INTsku));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row.INTsku) ? 'deselect' : 'select'} row ${row.INTsku + 1}`;
  }
  onDownload() {
    console.log(this.selection, this.isAllSelected());
    if (this.isAllSelected()) {
      if (this.selectType === 'currentPage') {
        this.getProductBySelectedSku();
      } else {
        this.getProductByVendorId();
      } 
    } else {
      this.getProductBySelectedSku();
    }
 /*    temp == true ? 
    this.selectType === 'currentPage' ? this.getProductBySelectedSku() : this.getProductByVendorId : this.getProductBySelectedSku; */
  }
  getProductBySelectedSku() {
    const obj: any = {};
    obj.selectedSKU = this.selection.selected;
    this.productService.getProductBySelectedSKU(obj).subscribe(data => {
      const temp = data.map(a => a._id);
      console.log(data);
      this.applyProductToField(temp);
    }, error => {
      console.log(error);
    })
  }
  getProductByVendorId() {
    const obj: any = {};
    obj.vendorId = this.selectedVendor;
    this.productService.selectedProductBySelectedVendor(obj).subscribe(data => {
      const temp = data.map(a => a._id);
      this.applyProductToField(temp);
    }, error => {
      console.log(error);
    })
  }
  applyProductToField(products) {
    let key;
    let keY;
    let chKey;
    let chKeY;
    const temp = [];
    const fil = 'image1';
    for (const product of products) {
      let tempField = {};
      for (key in product) {
          if (product.hasOwnProperty(key)) {
            tempField[key] = product[key];
          }
      }
      temp.push(tempField);
      tempField = {};
    }
    this.productService.exportAsExcelFile(temp, 'file');
  }
  onPageSelect(e) {
    this.showDropDown = false;
   /*  if (this.selectType !== e) {
      this.selection.clear();
    } */
    this.selectType = e;
    console.log(e);
  }
  onUpload() {
    this.uploadInventoryService.qtyChange(this.vendorModel).subscribe(data => {
      if (data) {
        this.getPage(this.page);
      }
    })
  }
}
