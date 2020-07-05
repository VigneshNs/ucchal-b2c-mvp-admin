import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from '../add-product/product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VendorService } from '../../vendor/vendor.service';
export interface PeriodicElement {
  productName: string;
  styleCode: string;
}
@Component({
  selector: 'app-view-uploaded-product-parent',
  templateUrl: './view-uploaded-product-parent.component.html',
  styleUrls: ['./view-uploaded-product-parent.component.css']
})
export class ViewUploadedProductParentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  holder: any;
  singleproduct:any;
  id: string;
  childId: string;
  productData;
  public array: any;
  public totalSize = 0;
  vendorVal;
  productModel: Product;
  expandedElement: PeriodicElement | null;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  loader = false;
  constructor(private productService: ProductService,private vendorService: VendorService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      // this.childId = params.get('childId');
    }); 
    this.getAllVendor();
   }

  ngOnInit() {
    // this.getProducts();
  }
  /* getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      console.log(data,'all products');
    }, err => {
      console.log(err);
    });
  } */
  getAllVendor() {
    this.vendorService.getAllVendor().subscribe(data => {
      this.holder = data;
      this.vendorVal = data;
      this.holder = new MatTableDataSource<any>(data);
      this.holder.paginator = this.paginator;
      this.holder = data;
      this.array = data;
      this.totalSize = this.array.length;
    this.getsingleproducts(this.id);
     
    }, err => {
      console.log(err);
    });
  }
  // private iterator() {
  //   const end = (this.currentPage + 1) * this.pageSize;
  //   const start = this.currentPage * this.pageSize;
  //   const part = this.array.slice(start, end);
  //   this.holder = part;
  // }
  getsingleproducts(id){
    this.productService.getSingleProducts(id).subscribe(data => {
      this.singleproduct = data;
      this.holder.forEach(element => {
        if(element._id === this.singleproduct.vendorId){
          this.singleproduct.vendorName = element.vendorName
        }
      });
      this.loader = true;
      console.log(data,'parent');
  },
  err => {
    console.log(err);
  });
}

}