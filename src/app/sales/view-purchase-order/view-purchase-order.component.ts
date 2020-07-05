import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { SalesService } from '../sales.service';
import { ViewPurchaseOrderService } from '../view-single-purchase-order/view-purchase-order.service';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent implements OnInit {
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  poModel: any;
  container: any;
  filterData: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  loader = false;
  public array: any;
  private dataSource;
  status = ['Created', 'Sent', 'Received', 'Approved'];
  constructor(private salesService: SalesService, private viewPurchaseOrderService: ViewPurchaseOrderService) {
    this.getAllPurchaseOrder();
   }

  ngOnInit() {
  }
  getAllPurchaseOrder() {
    this.salesService.getAllPurchaseOrder().subscribe(data => {
      const holder = data;
      this.poModel = [];
      for (const a of holder) {
        for (const b of a.generatePO) {
          b.orderId = a.orderId;
          this.poModel.push(b);
        }
      }
      this.filterData = this.poModel;
      this.container = this.poModel;
      this.loader = true;
      /* this.container = new MatTableDataSource<any>(this.poModel); */
      this.container.paginator = this.paginator;
      this.array = this.poModel;
      this.totalSize = this.array.length;
      this.iterator();
      console.log(this.poModel);
    }, error => {
      console.log(error);
    });
  }
  sortByVendor(e) {
    this.loader = false;
    const vendor = e.value;
    if (vendor === 'all') {
      this.container = this.poModel;
      this.loader = true;
    } else {
      this.container = this.poModel.filter(a => a.vendorCode === vendor.vendorCode);
      this.loader = true;
    }
  }
  sortByOrderId(e) {
    this.loader = false;
    const order = e.value;
    if (order === 'all') {
      this.container = this.poModel;
      this.loader = true;
    } else {
      this.container = this.poModel.filter(a => a.orderId === order.orderId);
      this.loader = true;
    }
  }
  sortByStatus(e) {
    this.loader = false;
    const status = e.value;
    if (status === 'all') {
      this.container = this.poModel;
      this.loader = true;
    } else {
      this.container = this.poModel.filter(b => b.poStatus === status);
      this.loader = true;
    }
  }
  onSearch(search) {
    console.log(search);
    this.loader = false;
    this.container = this.poModel.filter(c => c.vendorName.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                                         c.poNumber.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                                         c.vendorEmailId.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                                         c.vendorGStNo.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                                         c.vendorCSTNo.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                                         c.poStatus.toUpperCase().indexOf(search.toUpperCase()) > -1 );
    this.loader = true;
  }
  viewPage(po) {
    this.viewPurchaseOrderService.open(po).subscribe(data => {
      if (data) {
       /*  console.log(data); */
        this.getAllPurchaseOrder();
      }
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
    this.container = part;
  }
}
