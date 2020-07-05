import { Component, OnInit } from '@angular/core';
import {SalesService} from '../sales.service';
import {Order} from '../orders/order.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import {AppSetting} from '../../config/appSetting';
import {CustomerModel} from './customer.model';
import { TailoringDetailService } from '../view-tailoring-detail/tailoring-detail.service';
import { ReviewPopupComponent } from '../review-popup/review-popup.component';
import { BombinoPickupEntry } from '../../shared/model/bombinoPickupEntry.model';
import { PickupDateService } from '../pickup-date-popup/pickup-date.service';
import { PopupCancelService } from '../popup-cancel-reason/popup-cancel.service';
import { PopupRefundService } from '../popup-refund/popup-refund.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-view-single-order',
  templateUrl: './view-single-order.component.html',
  styleUrls: ['./view-single-order.component.css']
})
export class ViewSingleOrderComponent implements OnInit {
  id;
  orderModel: any;
  orderForm: FormGroup;
  productModel: any;
  message;
  action;
  serviceUrl;
  customerId;
  customerDetail: any;
  isCoupon = false;
  loader = false;
  orderWeight;
  orderQty;
  productImageUrl: string = AppSetting.productImageUrl;
  /* status = ['New', 'Processing', 'Ready To Ship', 'Out For Delivery', 'OnHold', 'Completed', 'Cancelled', 'Failed']; */
  status = ['New', 'PO raised', 'Ready To Ship', 'Pickup Scheduled', 'Pickup Cancel', 'Shipped', 'Delivered', 'Return'];
  reviewModel: any;
  poModel: any;
  vendorModel: any;
  pickupDate: boolean;
  confirm = false;
  showRefund = false;
  showBombinoError = false;
  bombinoError;
  bombinoBill;
  constructor(private router: Router, private salesService: SalesService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private fb: FormBuilder,
              private tailoringService: TailoringDetailService, public dialog: MatDialog,
              public pickupDateService: PickupDateService, private popupRefundService: PopupRefundService,
              private popupCancelService: PopupCancelService) {
    this.id = this.route.snapshot.params.id;
  }
  openDialog(child): void {
    const dialogRef = this.dialog.open(ReviewPopupComponent, {
      data: child, width: '300px', hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      /* this.animal = result; */
    });
  }


  ngOnInit() {
    this.createForm();
    this.viewOrderDetails();
  }
  createForm() {
    this.orderForm = this.fb.group({
      orderedDate: [''],
      statusType: [''],
      AWBNo: ['']
    });
  }
  viewOrderDetails() {
    this.salesService.getOrderDetails(this.id).subscribe(data => {
      this.orderModel = data;
      if (this.orderModel.coupon.length === 0) {
        this.isCoupon = false;
      } else {
        this.isCoupon = true;
      }
      this.customerId = data.customerId;
      if (this.orderModel.awbNo !== undefined) {
        this.getBombinoBill(this.orderModel.awbNo);
      }
      this.checkCancelationPeriod();
      this.checkWeightAndQty();
      this.getPOByOrder();
      this.getCustomerDetail( this.customerId);
      this.getReviewByCustomer(this.orderModel.orderId);
      this.getAllVendor();
      console.log('single order details', this.orderModel);
    }, err => {
      console.log(err);
    });
  }
  checkCancelationPeriod() {
    const current = new Date();
    const oldDate = new Date(this.orderModel.durationForCancel);
    oldDate <= current ? this.confirm = true : this.confirm = false;
    this.orderModel.confirmationItemStatus === 'allConfirm' ? this.showRefund = false : this.showRefund = true;
  }
  checkWeightAndQty() {
    this.orderWeight = 0;
    this.orderQty = 0;
    let i = 0;
    let itemWeight;
    let orderedItemWeight;
    for (const cart of this.orderModel.cart) {
      let j = 0;
      for (const product of  this.orderModel.orderedProducts) {
        if (product[0].child.find(a => a.INTsku === cart.INTsku) && i === j) {
          itemWeight = product[0].child.find(a => a.INTsku === cart.INTsku);
          orderedItemWeight = Number(itemWeight.weight) * cart.qty;
        }
        j = j + 1;
      }
      i = i + 1;
      this.orderWeight += orderedItemWeight;
      this.orderQty += cart.qty;
      orderedItemWeight = 0;
    }
    console.log('weight', this.orderWeight / 1000, this.orderQty);
    
  }
  getAllVendor() {
    this.salesService.getAllVendor().subscribe(data => {
      this.vendorModel = data;
    }, error => {
      console.log(error);
    });
  }
  getPOByOrder() {
    this.salesService.getPOByOrder(this.orderModel.orderId).subscribe(data => {
      if (data !== null) {
        this.poModel = data;
      }
      console.log('po', this.poModel);
    }, error => {
      console.log(error);
    });
  }
  getReviewByCustomer(id) {
    this.salesService.getReviewByOrder(id).subscribe(data => {
      this.reviewModel = data;
      this.checkReview();
    }, error => {
      console.log(error);
    });
  }
  checkReview() {
    for (const review of this.reviewModel) {
      for (const cart of this.orderModel.cart) {
        if (review.cartId === cart._id) {
          for (const product of this.orderModel.orderedProducts) {
            for (const child of product[0].child) {
              if (child.INTsku === cart.INTsku) {
                child.isReview = true;
                child.review = review.review;
                child.rating = review.rating;
              }
            }
          }
        }
      }
    }
    console.log(this.orderModel);
  }
  getCustomerDetail(id) {
    this.salesService.getSingleCustomer(id).subscribe(data => {
      this.customerDetail = data;
      this.loader = true;
      console.log('customer details', data);
    });
  }
  selectStatusDate(status) {
    switch (status) {
      case 'PO raised':
        return 'poRaisedDate';
      case 'Ready To Ship':
        return 'readyToShipDate';
      case 'Pickup Scheduled':
        return 'pickupScheduledDate';
      case 'Pickup Cancel':
        return 'pickupCancelDate';
      case 'Shipped':
        return 'shippedDate';
      case 'Delivered':
        return 'deliveredDate';
    }
  }
  updateStatus()  {
    this.message = 'Order Updated';
    /* const date = new Date(); */
   /*  this.orderModel = new Order(); */
    const obj: any = {};
    obj.orderStatus = this.orderForm.controls.statusType.value;
    obj.statusDate = this.selectStatusDate(obj.orderStatus);
    obj.date = new Date();
    /* this.orderModel.orderStatus = this.orderForm.controls.statusType.value; */
    this.salesService.updateStatus(this.id, obj).subscribe(data => {
      this.orderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     /*  this.router.navigate(['orders/vieworders']); */
    }, err => {
      console.log(err);
    });
  }
  updateAWB() {
    this.message = 'Order Updated';
    this.orderModel = new Order();
    this.orderModel.orderStatus = this.orderForm.controls.statusType.value;
    this.orderModel.awbNo = this.orderForm.controls.AWBNo.value;
    this.salesService.updateAWBStatus(this.id, this.orderModel).subscribe(data => {
      this.orderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     /*  this.router.navigate(['orders/vieworders']); */
    }, err => {
      console.log(err);
    });
  }

  poGenerate() {
    this.router.navigate(['sales/purchaseOrderView/', this.id]);
  }
  getMeasurment(value, child) {
    const doc = value;
    console.log(child);
    this.salesService.getStyleByCategory(child.superCategoryId).subscribe(data => {
      let key;
      let keys = [];
      for (key in doc) {
        if (doc.hasOwnProperty(key)) {
          keys.push({ name: key, value: doc[key] });
        }
      }
      keys = keys.filter(a => a.name !== '_id' && a.name !== 'addedDate' && a.name !== 'userId' && a.name !== 'productId' && a.name !== 'serviceId');
      console.log(keys);
      const temp = data;
      if (temp.bottom !== undefined) {
        const frontStyle = temp.frontNeck.find(a => a.title === value.frontNeckStyle);
        const backStyle = temp.backNeck.find (a => a.title === value.backNeckStyle);
        const sleeveStyle = temp.sleeve.find(a => a.title === value.sleeveStyle);
        const bottom = temp.bottom.find(a => a.title === value.bottomStyle);
        const image = child.productImage[0].productImageName;
        keys.forEach(b => {
          if (b.name === 'frontNeckStyle') {
            b.styleImage = frontStyle === undefined ? image : frontStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          } else if (b.name === 'backNeckStyle') {
            b.styleImage = backStyle === undefined ? image : backStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          } else if (b.name === 'sleeveStyle') {
            b.styleImage = sleeveStyle === undefined ? image : sleeveStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          } else if (b.name === 'bottomStyle') {
            b.styleImage = bottom === undefined ? image : bottom.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          }
        });
       /*  value.frontImage = frontStyle.imageName;
        value.backImage = backStyle.imageName;
        value.sleeveImage = sleeveStyle.imageName;
        value.bottomImage = bottom.imageName;
        value.measureID = temp.measurementId;
        value.productImage = image; */
      } else {
        
        const frontStyle = temp.frontNeck.find(a => a.title === value.frontNeckStyle);
        const backStyle = temp.backNeck.find (a => a.title === value.backNeckStyle);
        const sleeveStyle = temp.sleeve.find(a => a.title === value.sleeveStyle);
        const image = child.productImage[0].productImageName;
        keys.forEach(b => {
          if (b.name === 'frontNeckStyle') {
            b.styleImage = frontStyle === undefined ? image : frontStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          } else if (b.name === 'backNeckStyle') {
            b.styleImage = backStyle === undefined ? image : backStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          } else if (b.name === 'sleeveStyle') {
            b.styleImage = sleeveStyle === undefined ? image : sleeveStyle.imageName;
            b.productImage = image;
            b.measureID = temp.measurementId;
          }
        });
       /*  value.frontImage = frontStyle.imageName;
        value.backImage = backStyle.imageName;
        value.sleeveImage = sleeveStyle.imageName;
        value.measureID = temp.measurementId;
        value.productImage = image; */
      }
      const vendor = this.vendorModel.find(a => a._id === child.vendorId);
      const object = {'tailoringData': keys, 'customer': this.customerDetail, 'vendor': vendor};
      console.log(object);
      this.tailoringService.open(object);
    }, error => {
      console.log(error);
    });
   
   /*  this.salesService.getSelctedMeasurementByUser(serviceId).subscribe(data => {
      const holder = data;
      this.tailoringService.open(holder);
    }, error => {
      console.log(error);
    }); */
  }
  getPickupDate() {
    this.pickupDateService.open().subscribe(data => {
      if (data) {
        console.log(data);
        this.pickupDate = data;
        this.requestBombino(data);
      }
    });
  }
  requestBombino(data) {
    this.showBombinoError = false;
 /*    const pickDate = date.getDate();
    const pickMonth = date.getMonth();
    const pickYear = date.getFullYear();
    const FormDate = pickDate + '/' + pickMonth + '/' + pickYear; */
    let obj: any = {};
    const array: any = [];
    let i = 0;
    for (const cart of this.orderModel.cart) {
      let j = 0;
      if (cart.confirmationItemStatus === 'confirm') {
     
      for (const product of this.orderModel.orderedProducts) {
        if (product[0].child.find(a => a.INTsku === cart.INTsku) && i === j) {
     
          const collection = product[0].child.find(a => a.INTsku === cart.INTsku);
          obj.Item_Description = collection.productDescription;
          obj.Item_Value = (collection.sp / this.orderModel.currencyRate).toString();
          obj.Item_Weight = (collection.quantity).toString();
          obj.Vol_WeightL = '';
          obj.Vol_WeightW = '';
          obj.Vol_WeightH = '';
          obj.Item_Unit = '';
       
        }
        j = j + 1;
      }
      i = i + 1;
      array.push(obj);
      obj = {};
    } else {
      j = j + 1;
      i = i + 1;
    }
    }
   
   const check = {
    "UserId":"infobanasuri@gmail.com",
    "Password":"123",
    "AccountId":"ECOM0164",
    "AWBNo":"",
    "CustomerRefNo":"",
    "Origin":data.cityCode,
    "Destination":data.countryCode,
    "BookedBy":"BANASURI ENTERPRISES",
    "Shipper_Name":"BANASURI ENTERPRISES",
    "Shipper_Contact":"BANASURI ENTERPRISES",
    "Shipper_Add1":"Sree B Suri Mansion, #12 ,2nd & 3rd Floor",
    "Shipper_Add2":" Ganigara B Lane, Ganigara Galli, ",
    "Shipper_Add3":"Nagarathpet Cross, Cubbonpet, Bangalore",
    "Shipper_Pin":"560002",
    "Shipper_State":"KA",
    "Shipper_TelNo":"9108329309",
    "Shipper_Email":"infobanasuri@gmail.com",
    "Shipper_FaxNo":"", 
    "Shipper_Mobile":"9108329309",
    "Consignee_Name":this.orderModel.addressDetails[0].name,
    "Consignee_Contact":this.orderModel.addressDetails[0].name,
    "Consignee_Add1":this.orderModel.addressDetails[0].building,
    "Consignee_Add2":this.orderModel.addressDetails[0].streetAddress,
    "Consignee_Add3":this.orderModel.addressDetails[0].city,
    "Consignee_State":this.orderModel.addressDetails[0].state,
    "Consignee_Pin":this.orderModel.addressDetails[0].pincode.toString(),
    "Consignee_TelNo":this.orderModel.addressDetails[0].mobileNumber.toString(),
    "Consignee_FaxNo":"",
    "Consignee_Mobile":this.orderModel.addressDetails[0].mobileNumber.toString(),
    "Consignee_Email":this.customerDetail.emailId,
    "Seller_ID":"infobanasuri@gmail.com",
    "Service_Type":data.serviceType,
    "Sub_Service":"",
    "Pcs":this.orderQty.toString(),
    "Weight":data.weight,
    "Dox_Spx":data.type,
    "Content":data.content,
    "Shipment_Value":(this.orderModel.total / this.orderModel.currencyRate).toString(),
    "Shipment_Currency":this.orderModel.currencyCode,
    "Instruction":"",
    "COD_Amount":"",
    "PickupDate":data.pickupDate.toString(),
    "Mode": "LIVE",
    "No_of_Item":'',
    "Items": array
    
   }
    this.salesService.pickupEntry(check).subscribe(res => {
      console.log('bombino', res);
      const temp = res;
      if (temp.AWBNo !== '') {
        this.saveBombinoResponse(temp);
      } else {
        this.showBombinoError = true;
        this.bombinoError = temp.Error;
      }
    }, error => {
      console.log(error);
    });
  }
  saveBombinoResponse(response) {
    const obj: any = {};
    obj.awbNo = response.AWBNo;
    obj.clientRegno = response.ClientRegno;
    obj.error = response.Error;
    obj.fileType = response.FileType;
    obj.forwardingNo = response.ForwardingNo;
    obj.forwardingVendor = response.ForwardingVendor;
    obj.labelData = response.LabelData;
    obj.pdfData = response.PdfData;
    obj.refNo = response.RefNo;
    obj.orderId = this.orderModel.orderId;
    this.salesService.saveBombinoResponse(obj, this.orderModel._id).subscribe(data => {
      console.log(data);
      this.orderModel = data;
      this.getBombinoBill(this.orderModel.awbNo);
    }, error => {
      console.log(error);
    });
  }
  getBombinoBill(awb) {
    const obj: any = {};
    obj.awbNo = awb;
    this.salesService.getBombinoOrder(obj).subscribe(data => {
      this.bombinoBill = data;
      console.log(data, 'bombinobill');
    }, error => {
      console.log(error);
    });
  }
  cancelOrder() {
    const obj: any = {};
    obj.UserId = "infobanasuri@gmail.com";
    obj.Password = "123";
    obj.AccountId = "ECOM0164";
    obj.AWBNo = this.orderModel.awbNo;
    this.salesService.cancelBombinoOrder(obj).subscribe(data => {
      console.log(data);
      this.updateCancalOrder();
    }, error => {
      console.log(error);
    });
}
updateCancalOrder() {
  const obj: any = {};
  obj.orderStatus = 'Pickup Cancel';
  obj.orderId = this.orderModel.orderId;
  this.salesService.updateCancelBombinoStatus(obj, this.orderModel._id).subscribe(data => {
    this.orderModel = data;
  }, error => {
    console.log(error);
  });
}

pickUpCancel() {
  const obj: any = {};
  obj.orderId = this.orderModel.orderId;
  obj.orderStatus = 'Pickup Cancel';
}
downloadBombinoBill() {
  const linkSource = 'data:application/pdf;base64,' + this.bombinoBill.pdfData;
  const downloadLink = document.createElement("a");
  const fileName = 'BombinoBill.pdf';

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
openCancelReason(cart) {
  this.popupCancelService.open(cart).subscribe(data => {
    if (data) {
    }
  });
}
onRefund(order) {
  this.popupRefundService.open(order).subscribe(data => {
    if (data) {

    }
  });
}
}
