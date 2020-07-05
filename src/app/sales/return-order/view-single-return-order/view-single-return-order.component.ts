import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SalesService } from '../../sales.service';
import { ReasonPopService } from '../view-reason-popup/reason-pop.service';

@Component({
  selector: 'app-view-single-return-order',
  templateUrl: './view-single-return-order.component.html',
  styleUrls: ['./view-single-return-order.component.css']
})
export class ViewSingleReturnOrderComponent implements OnInit {
  id: string;
  holder: any;
  orderModel: any;
  returnModel: any;
  action = ['accept', 'reject'];
  shippment = ['received', 'payment success']
  currentDate: string | number | Date;
  validReturn = false;
  finalResponse = false;
  showRejectionError = false;
  selectedStatusChange: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private salesService: SalesService, private reasonPopService: ReasonPopService) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getSingleReturnOrder();
   }

  ngOnInit() {
  }
  getSingleReturnOrder() {
    this.salesService.getSingleReturnOrder(this.id).subscribe(data => {
      this.orderModel = data.order;
      this.returnModel = data.returnOrder;
      this.checkReturn();
      this.selectCart();
      console.log(data);
      console.log(this.orderModel);
    }, error => {
      console.log(error);
    });
  }
  selectCart() {
    for (const order of this.orderModel.cart) {
      for (const returnOrder of this.returnModel.cart) {
        if (returnOrder.cartId === order._id) {
          order.return = 'applied';
        }
      }
    }
    console.log(this.orderModel);
  }
  onReason(reason) {
    console.log(reason);
    this.reasonPopService.open(reason).subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
  checkReturn() {
    this.currentDate = new Date();
    const deliveredDate = this.orderModel.statusDate.map(a => a.deliveredDate);
    if (deliveredDate.length !== 0) {
    if (deliveredDate[0] !== undefined) {
      const timeDifferent = this.getDataDiff(new Date(deliveredDate[0]), new Date(this.currentDate));
      console.log(timeDifferent);
      0 !== timeDifferent.day ? this.validReturn = true : this.validReturn = false;
    }
  }
    console.log(deliveredDate);
  }
  getDataDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
}
onSelectReason(action, returnOrder) {
  console.log(action, returnOrder);
  action === 'reject' ? returnOrder.rejectionApply = true : returnOrder.rejectionApply = false;
  returnOrder.requestReaction = action;
  console.log(this.returnModel);
  if (this.returnModel.cart.find(a => a.requestReaction === undefined)) {
   /*  console.log('yes'); */
    this.finalResponse = false;
  } else {
    this.finalResponse = true;
  }
}
onApply() {
  this.showRejectionError = false;
  console.log(this.returnModel);
  this.returnModel.cart.forEach(a => {
    a.returnItemStatus = a.requestReaction;
    a.responseDate = new Date();
  });
  if (this.returnModel.cart.find(b => b.rejectReason === undefined && b.returnItemStatus === 'reject')) {
    this.showRejectionError = true;
  } else {
    this.saveReturnOrder();
  }
  console.log(this.returnModel);
}
saveReturnOrder() {
  this.salesService.saveResponseForReturnOrder(this.returnModel).subscribe(data => {
    this.router.navigate(['sales/viewReturnOrder']);
  }, error => {
    console.log(error);
  });
}
onKey(e, returnOrder) {
  console.log(e.target.value);
  returnOrder.rejectReason = e.target.value;
}
onStatusChange(e) {
  const obj: any = {};
  if (e.value === 'received') {
    obj.returnStatus = 'received';
    obj.statusDate = 'receivedDate';
  } else if (e.value === 'payment success') {
    obj.returnStatus = 'payment success';
    obj.statusDate = 'paymentDate';
  }
  this.selectedStatusChange = obj;
}
onStatus() {
  this.salesService.updateReturnStatusAfterShipping(this.selectedStatusChange, this.returnModel._id).subscribe(data => {
    this.getSingleReturnOrder();
  }, error => {
    console.log(error);
  });
}
}
