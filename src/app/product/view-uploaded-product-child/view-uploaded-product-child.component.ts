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
  selector: 'app-view-uploaded-product-child',
  templateUrl: './view-uploaded-product-child.component.html',
  styleUrls: ['./view-uploaded-product-child.component.css']
})
export class ViewUploadedProductChildComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  holder: any;
  singleproduct:any;
  id: string;
  public array: any;
  public totalSize = 0;
  vendorVal;
  childId: string;
  productData;
  loader = false;
  productModel: Product;
  expandedElement: PeriodicElement | null;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource: MatTableDataSource<PeriodicElement>;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,private vendorService: VendorService) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.childId = params.get('childId');
    }); 
    this.getAllVendor();
   }

   ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getAllProduct().subscribe(data => {
      this.holder = data;
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      console.log(data,'all products');
    }, err => {
      console.log(err);
    });
  }
  getAllVendor() {
    this.vendorService.getAllVendor().subscribe(data => {
      this.holder = data;
      this.vendorVal = data;
      this.holder = new MatTableDataSource<any>(data);
      this.holder.paginator = this.paginator;
      this.holder = data;
      this.array = data;
      this.totalSize = this.array.length;
    this.viewSingleProducts();
     
    }, err => {
      console.log(err);
    });
  }
  viewSingleProducts() {
    this.productService.getSingleProducts(this.id).subscribe(data => {
      if (this.childId) {
        this.singleproduct = data.child.find(ele => ele._id === this.childId);
      } else {
        this.singleproduct = data;
      }
      this.loader = true;
      console.log(data,'child');
      this.holder.forEach(element => {
        if(element._id === this.singleproduct.vendorId){
          this.singleproduct.vendorName = element.vendorName
        }
      });
     
    }, error => {
      console.log(error);
    });
  }
//   getsingleproducts(id,){
//     this.productService.getSingleProducts(this.id,this.childId).subscribe(data => {
//       this.singleproduct =data;
//       console.log(data);
//   },
//   err => {
//     console.log(err);
//   });
// }
}
