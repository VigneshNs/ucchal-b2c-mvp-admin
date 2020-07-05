import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesService } from '../sales.service';
import { Order } from '../orders/order.model';
import { Route, ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PurchaseOrder } from './purchase-order.model';
import { PurchaseOrderItem } from './purchase-orderItem.model';
import { VendorWisePO } from './viewVendorWise.model';
import { DocumentModel } from './document.model';
import { resolve } from 'url';
import { Observable, of, Observer } from 'rxjs';

@Component({
  selector: 'app-purchase-order-view',
  templateUrl: './purchase-order-view.component.html',
  styleUrls: ['./purchase-order-view.component.css']
})
export class PurchaseOrderViewComponent implements OnInit {
  @ViewChild('instruct', { static: false }) instructData: ElementRef;
  id;
  vendor: {
    vendorId: string
  };
  defaultDate = 5;
  vendorData;
  orderData;
  totalQty = 0;
  totalCGSTAmount = 0;
  totalSGSTAmount = 0;
  totalIGSTAmount = 0;
  totalNetAmount = 0;
  totalTax = 0;
  isCheck = false;
  totalAmount = 0;
  poSettingData;
  terms: any;
  productHolder: any = [];
  vendorHolder;
  currentDate = new Date();
  isShow = false;
  poDate;
  isDownload = false;
  isSend = false;
  poExpiryDate;
  selecedVendor;
  POType: any;
  content: {
    document: string;
    emailId: string;
    orderId: string;
    poNumber: string;
  };
  poModel: any;
  selectedPO: any;
  givenInstruction: any;
  /*  pdfFile: {
     base64: any = [];
   }; */
  constructor(private salesService: SalesService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getAllPOsetting();

  }

  ngOnInit() {
  }
  viewOrderDetails() {
    this.salesService.getOrderDetails(this.id).subscribe(data => {
      console.log('order', data);
      this.orderData = data;
      const holder = data;
      const array: any = [];
      holder.orderedProducts.forEach(element => {
        array.push(element[0].vendorId);
      });
      const vendor = Array.from(new Set(array));
      console.log(vendor);
      this.getVendor(vendor);
    }, err => {
      console.log(err);
    });
  }
  checkStatus() {
    if (this.orderData.orderStatus === 'New') {
      this.savePurchaseOrder();
    } else {
      this.getSavedPO();
    }
  }
  getSavedPO() {
    this.salesService.getPOByOrder(this.orderData.orderId).subscribe(data => {
      this.poModel = data;
    }, error => {
      console.log(error);
    });
  }
  savePurchaseOrder() {
    const mainData: any = [];
    let day;
    let num = 0;
    const po = new PurchaseOrder();
    let vendoR: any = {};
    let item: any = {};
    po.contactNo = this.poSettingData.contactNo;
    po.gstNo = this.poSettingData.gstIn;
    po.orderId = this.orderData.orderId;
    po.billTo = this.poSettingData.billingAddress;
    const array: any = [];
    let b: any = [];
    for (const vendor of this.vendorData) {
      let a: any = [];
      this.totalQty = 0;
      this.totalCGSTAmount = 0;
      this.totalIGSTAmount = 0;
      this.totalSGSTAmount = 0;
      this.totalNetAmount = 0;
      this.totalTax = 0;
      vendoR.vendorAddress = vendor.officeAddressDetails[0].officeAddressLine1;
      vendoR.vendorName = vendor.vendorName;
      vendoR.vendorEmailId = vendor.vendorEmailId;
      vendoR.vendorCode = vendor.vendorCode;
      vendoR.vendorCurrencyType = vendor.paymentDetails[0].currency;
      vendoR.vendorGStNo = vendor.paymentDetails[0].gstNo;
      vendoR.vendorCSTNo = vendor.paymentDetails[0].cstNo;
      vendoR.poType = this.poSettingData.poType[0];
      vendoR.poDate = new Date(Date.now());
      let i = 0;
      for (const cart of this.orderData.cart) {
        let j = 0;
        for (const product of this.orderData.orderedProducts) {
          if (i === j) {
            if (vendor._id === product[0].vendorId) {
              const holder: any = [];
              for (const child of product[0].child) {
                if (cart.INTsku === child.INTsku && cart.confirmationItemStatus === 'confirm') {
                  if (typeof (child.ttsVendor) === 'string') {
                    day = Number(child.ttsVendor) + this.defaultDate;
                  } else {
                    day = child.ttsVendor + this.defaultDate;
                  }
                  item.estimatedShipmentDate = new Date(this.calculateDate(day));
                  if (num < day) {
                    num = day;
                    vendoR.poExpiryDate = item.estimatedShipmentDate;
                  }
                  item.productId = cart.productId;
                  item.productImage = child.productImage[0].productImageName;
                  item.discount = child.discount;
                  item.cgstRate = this.poSettingData.cgstRate;
                  item.sgstRate = this.poSettingData.sgstRate;
                  item.igstRate = this.poSettingData.igstRate;
                  item.cgstAmount = child.vp * item.cgstRate / 100;
                  item.igstAmount = child.vp * item.igstRate / 100;
                  item.sgstAmount = child.vp * item.sgstRate / 100;
                  item.quantity = cart.qty;
                  item.catalogueName = child.catalogueName;
                  item.netAmount = child.vp * cart.qty;
                  item.unitPrice = child.vp;
                  item.sku = child.sku;
                  item.INTsku = child.INTsku;
                  item.size = child.sizeVariant;
                  item.bodyHeight = (cart.bodyHeight === undefined || cart.bodyHeight === 'None') ? 'None' : cart.bodyHeight;
                  this.totalQty += cart.qty;
                  this.totalCGSTAmount += item.cgstAmount;
                  this.totalIGSTAmount += item.igstAmount;
                  this.totalSGSTAmount += item.sgstAmount;
                  this.totalNetAmount += item.netAmount;
                  this.totalTax += this.totalCGSTAmount + this.totalIGSTAmount + this.totalSGSTAmount;
                  a.push(item);
                  item = {};
                }
                j = j + 1;
              }
            }
          } else {
            j = j + 1;
          }
        }
        i = i + 1;
      }
      vendoR.totalQuantity = this.totalQty;
      vendoR.totalCGSTamt = this.totalCGSTAmount;
      vendoR.totalSGSTamt = this.totalSGSTAmount;
      vendoR.totalIGSTamt = this.totalIGSTAmount;
      vendoR.tax = this.totalTax;
      vendoR.netAmount = this.totalNetAmount;
      vendoR.totalAmount = vendoR.tax + this.totalNetAmount;
      vendoR.vendorItems = a;
      vendoR.emailStatus = false;
      b.push(vendoR);
      a = [];
      vendoR = {};

    }
    po.generatePO = b;
    console.log(po);
    this.salesService.savePurchaseOrder(po).subscribe(data => {
      console.log('after', data);
      this.poModel = data;
      this.savePOStatus();
    }, error => {
      console.log(error);
    });
    console.log('save data', mainData);
  }
  savePOStatus() {
    const temp = this.poModel.generatePO.map(a => a.vendorItems);
    const array = [];
    for (const data of temp) {
      for (const val of data) {
        array.push(val);
      }
    }
    console.log(array);
    const status: any = {};
    status.array = array;
    status.orderStatus = 'PO raised';
    this.salesService.updatePurchaseOrderStatus(status, this.id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  getVendor(vendor) {
    this.vendor = {
      vendorId: vendor
    };
    this.salesService.getVendorByVendorID(this.vendor).subscribe(data => {
      console.log(data);
      this.vendorData = data;
      this.checkStatus();
    }, error => {
      console.log(error);
    });
  }
  checkSelected() {
    this.isCheck = this.isCheck === false ? true : false;
  }
  getAllPOsetting() {
    this.salesService.getPOsetting().subscribe(data => {
      this.poSettingData = data[0];
      const temp = data;
      if (temp.length !== 0) {
        if (this.poSettingData.termsAndCondition !== undefined) {
          this.terms = this.poSettingData.termsAndCondition.split('.');
        }
      }
      console.log(this.terms);
      this.viewOrderDetails();
    }, error => {
      console.log(error);
    });
  }
  selectVendor(vendor) {
    this.poDate = '';
    this.isShow = true;
    this.vendorHolder = vendor.value;
    console.log(vendor.value);
    this.poModel.generatePO.forEach(a => {
      if (a.vendorCode === this.vendorHolder.vendorCode) {
        this.selectedPO = a;
      }
    });
    /* this.productHolder = [];
    this.totalQty = 0;
    this.totalCGSTAmount = 0;
    this.totalIGSTAmount = 0;
    this.totalSGSTAmount = 0;
    this.totalNetAmount = 0;
    this.totalTax = 0;
    let day;
    this.totalAmount = 0;
    let num = 0;
    this.selecedVendor = vendor.value;
    for (const cart of this.orderData.cart) {
      for (const product of this.orderData.orderedProducts) {
        if (vendor.value._id === product[0].vendorId) {
          for (const child of product[0].child) {
            if (cart.INTsku === child.INTsku) {
              console.log(typeof (child.ttsVendor));
              if (typeof (child.ttsVendor) === 'string') {
                day = Number(child.ttsVendor) + this.defaultDate;
              } else {
                day = child.ttsVendor + this.defaultDate;
              }
              const epxdate = this.calculateDate(day);
              child.estDate = epxdate;
              if (num < day) {
                num = day;
                this.poExpiryDate = child.estDate;
              }
              // checking
              child.vp = 4050;
              //
              child.discount = product[0].discount;
              child.cgstRate = this.poSettingData.cgstRate;
              child.cgstAmount = child.vp * child.cgstRate / 100;
              child.igstRate = this.poSettingData.igstRate;
              child.igstAmount = child.vp * child.igstRate / 100;
              child.sgstRate = this.poSettingData.sgstRate;
              child.sgstAmount = child.vp * child.sgstRate / 100;
              child.qty = cart.qty;
              child.netAmount = child.vp * child.qty;
              this.productHolder.push(child);
              this.totalQty += cart.qty;
              this.totalCGSTAmount += child.cgstAmount;
              this.totalSGSTAmount += child.sgstAmount;
              this.totalIGSTAmount += child.igstAmount;
              this.totalNetAmount += child.netAmount;
            }
          }
        }
      }
    }
    this.totalTax = this.totalCGSTAmount + this.totalIGSTAmount + this.totalSGSTAmount;
    this.totalAmount = this.totalNetAmount + this.totalTax;
    console.log('productholder', this.productHolder); */
  }
  calculateDate(num) {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    this.poDate = month + '/' + date + '/' + year;
    const expDate = new Date(currentDate.setDate(currentDate.getDate() + num));
    date = expDate.getDate();
    month = expDate.getMonth() + 1;
    year = expDate.getFullYear();
    return month + '/' + date + '/' + year;
  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    /* canvas.width = '70px';
    canvas.height = img.height; */
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  tableValue() {
    const newTestArray = [];
    const headerArray = [{ text: 'S.NO', style: 'tableHeaderRow' },
    /*  {text: 'Image', style: 'tableHeaderRow'}, */
    { text: 'Catalogue Name', style: 'tableHeaderRow' },
    { text: 'Vendor Item No', style: 'tableHeaderRow' },
    { text: 'Unit Price', style: 'tableHeaderRow' },
    { text: 'Size', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Unit of Measure', style: 'tableHeaderRow' },
    { text: 'Discount Percentage', style: 'tableHeaderRow' },
    { text: 'CGST Rate', style: 'tableHeaderRow' },
    { text: 'CGST Amount', style: 'tableHeaderRow' },
    { text: 'SGST Rate', style: 'tableHeaderRow' },
    { text: 'SGST Amount', style: 'tableHeaderRow' },
    { text: 'IGST Rate', style: 'tableHeaderRow' },
    { text: 'IGST Amount', style: 'tableHeaderRow' },
    { text: 'Net Amount', style: 'tableHeaderRow' },
    { text: 'Estimated Shipment Date', style: 'tableHeaderRow' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.selectedPO.vendorItems.length; i++) {
      newTestArray.push([{ text: i + 1, style: 'rowStyle' },
      /*   { text: this.getBase64Image(this.selectedPO.vendorItems[i].productImage), style: 'rowStyle'}, */
      { text: this.selectedPO.vendorItems[i].catalogueName, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].sku, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].unitPrice, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].size, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].quantity, style: 'rowStyle', },
      { text: 'Each', style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].discount, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].cgstRate, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].cgstAmount, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].sgstRate, style: 'rowStyle', },
      { text: this.selectedPO.vendorItems[i].sgstAmount, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].igstRate, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].igstAmount, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].netAmount, style: 'rowStyle' },
      { text: this.selectedPO.vendorItems[i].estimatedShipmentDate, style: 'rowStyle', }]);
    }
    return newTestArray;
  }
  totalTable() {
    const newTestArray = [];
    const headerArray = [{ text: 'Total Amount', style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: this.selectedPO.totalQuantity, style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: this.selectedPO.totalCGSTamt, style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: this.selectedPO.totalSGSTamt, style: 'rowStyle' },
    { text: '', style: 'rowStyle' },
    { text: this.selectedPO.totalIGSTamt, style: 'rowStyle' },
    { text: this.selectedPO.netAmount, style: 'rowStyle' },
    { text: '', style: 'rowStyle' }];
    newTestArray.push(headerArray);
    return newTestArray;
  }
  filterByOption(type) {
    this.POType = type.value;
  }
  selectDownload() {
    this.isDownload = true;
    this.isSend = false;
    this.onSubmit();
  }
  selectSend() {
    console.log(this.instructData.nativeElement.value);
    this.givenInstruction = this.instructData.nativeElement.value;
    this.isDownload = false;
    this.isSend = true;
    this.onSubmit();
  }
  onSubmit() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    /* pdfMake.fonts = {
      'Roboto' : {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
     },
      'OrangeStd' : {
         normal: '../../../assets/fonts/OrangeStd.otf',
      }
   }; */
    const dd = {
      /*   pageSize: 'A5', */
      pageMargins: [40, 50, 40, 40],
      pageOrientation: 'landscape',
      header: {

        columns: [
          {
            stack: [
              { image: 'data:image/png;base64,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', margin: [35, 2, 0, 0], height: 15, width: 90 },
              { text: 'Enterprises', fontSize: 7, margin: [100, 2, 0, 0], color: '#006400', alignment: 'left' },
              { text: 'Sree B Suri Mansion, #12, 2nd & 3rd Floor, Ganigara B Lane,', margin: [40, 1, 0, 0], fontSize: 8, alignment: 'left' },
              { text: 'Nagarathpet Cross, Bangalore-560002.', margin: [40, 1, 0, 0], fontSize: 8, alignment: 'left' }
            ]
          },
          {
            image: 'data:image/png;base64,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',
            alignment: 'center', margin: [0, 2, 350, 10], height: 42, width: 90
          }
        ],
      },
      textTop: [
        {
          columns: [
          ]
        }
      ],
      /* headerAddress: [
      ], */
      content: [
        {
          style: 'tableBox',
          table: {
            headerRows: 1,
            widths: [100, 262, 100, 262],
            body: [
              [
                { text: 'Vendor Name', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorName, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'Order Number', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.poModel.orderId, style: 'rowStyle', border: [true, true, true, true] }],
              [
                { text: 'Vendor Code', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorCode, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'PO Type', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.POType, style: 'rowStyle', border: [true, true, true, true] },
              ],
              [
                { text: 'Vendor Address', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorAddress, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'PO Date', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.poDate, style: 'rowStyle', border: [true, true, true, true] }
              ],
              [
                { text: 'Email-ID', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorEmailId, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'PO Expiry Date', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.poExpiryDate, style: 'rowStyle', border: [true, true, true, true] }
              ],
              [
                { text: '', style: 'rowStyle', border: [true, false, false, false] },
                { text: '', style: 'rowStyle', border: [false, false, false, false] },
                { text: 'Bill To', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.poModel.billTo, style: 'rowStyle', border: [true, true, true, true] }
              ],
            ]
          },
        },
        {
          style: 'tableBox',
          table: {
            headerRows: 1,
            widths: [60, 175, 60, 175, 60, 176],
            body: [
              [
                { text: 'CST No', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorCSTNo, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'Country', style: 'rowStyle', border: [true, true, true, true] },
                { text: '', style: 'rowStyle', border: [true, true, true, true] },
                { text: 'GSTIN', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.poModel.gstIn, style: 'rowStyle', border: [true, true, true, true] }
              ],
              [
                { text: 'GSTIN', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorGStNo, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'Currency Type', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.selectedPO.vendorCurrencyType, style: 'rowStyle', border: [true, true, true, true] },
                { text: 'Contact Us', style: 'rowStyle', border: [true, true, true, true] },
                { text: this.poModel.contactNo, style: 'rowStyle', border: [true, true, true, true] }
              ]
            ]
          },
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [20, 60, 25, 25, 19, 30, 48, 62, 32, 42, 31, 42, 29, 40, 38, 72],
            body: this.tableValue(),
          },
          layout: {
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length || i === 1) ? 'black' : 'white';
            },
            fillColor: function (rowIndex, node, columnIndex) {
              if (rowIndex === 0) {
                return rowIndex = '#CCCCCC';
              } else {
                return (rowIndex % 2 === 0) ? '#EBECF0' : null;
              }
            },
          }
        },
        {
          style: 'tableBox',
          table: {
            headerRows: 1,
            widths: [157, 19, 30, 48, 62, 32, 42, 31, 42, 29, 40, 38, 72],
            body: this.totalTable()
          },
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [370, 372],
            heights: [10, 100],
            body: [
              [{ text: 'Special Instruction', style: 'rowStyle', border: [true, true, true, true] },
              { text: 'Grand Total', style: 'rowStyle', border: [true, true, true, true] },
              ],
              [{ text: this.givenInstruction, style: 'rowStyle', border: [true, true, true, true] },
              {
                table: {
                  widths: [100, 15, 15, 15, 15, 15, 130],
                  heights: [30, 30, 30, 30],
                  body: [
                    [{ text: 'Net Amount', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: this.selectedPO.netAmount, style: 'rowStyle', border: [false, false, false, true] }],
                    [{ text: 'Freight', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] }],
                    [{ text: 'Tax', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: '', style: 'rowStyle', border: [false, false, false, true] },
                    { text: this.selectedPO.tax, style: 'rowStyle', border: [false, false, false, true] }],
                    [{ text: 'Total Amount', style: 'rowStyle', border: [false, false, false, false] },
                    { text: '', style: 'rowStyle', border: [false, false, false, false] },
                    { text: '', style: 'rowStyle', border: [false, false, false, false] },
                    { text: '', style: 'rowStyle', border: [false, false, false, false] },
                    { text: '', style: 'rowStyle', border: [false, false, false, false] },
                    { text: '', style: 'rowStyle', border: [false, false, false, false] },
                    { text: this.selectedPO.totalAmount, style: 'rowStyle', border: [false, false, false, false] }]
                  ]
                },
              },
              ]
            ]
          },
        },
        {

        },
        {
          type: 'none',
          fontSize: 10,
          margin: [0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          text: ['Approved by']
        },
        {
          type: 'none',
          fontSize: 10,
          text: ['Approved Date']
        },
        {
          type: 'none',
          style: 'textHeaderTerms',
          width: '*',
          ul: ['Terms and Condition']
        },
        {
          type: 'none',
          style: 'termsStyle',
          width: '*',
          ol: this.terms
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          alignment: 'center',
        },
        textTop: {
          margin: [0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        /*  headerAddress: {
           fontSize: 12,
           bold: true,
           alignment: 'right',
           margin: [0, 50, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
         }, */
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          border: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        tableExample: {
          margin: [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        textHeaderTerms: {
          fontSize: 8,
          bold: true,
          margin: [0, 20, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        tableHeaderRow: {
          bold: true,
          fontSize: 8,
          alignment: 'center',
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          bold: true,
          margin: [10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          bold: true,
          fontSize: 8,
          alignment: 'right',
          margin: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        textHeader: {
          bold: true,
          fontSize: 10,
          margin: [0, 15, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        textGst: {
          fontSize: 8,
          margin: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        phone: {
          margin: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }
      }
    };
    let storage: any;
    console.log(dd);
    if (this.isDownload) {
      pdfMake.createPdf(dd).download();
    }
    // const file = pdfMake.createPdf(dd);
    // /* let holder; */
    // const result = Buffer.concat(file);
    // const resutl1 = result.toString('base64');
    /* file.getBase64((data) => {
      holder = data;
    }); */
    if (this.isSend) {
      const pdf = pdfMake.createPdf(dd);

      pdf.getBase64(doc => {
        const content = new DocumentModel();
        content.document = doc;
        content.emailId = this.selectedPO.vendorEmailId;
        content.orderId = this.poModel.orderId;
        content.poNumber = this.selectedPO.poNumber;
        content.instruction = this.givenInstruction;
        /* this.content = {
            document: doc,
            emailId: this.selectedPO.vendorEmailId,
            orderId: this.poModel.orderId,
            poNumber: this.selectedPO.poNumber,
    
          }; */
        this.sendPdf(content);
      });
    }
    /* let promise = new Promise ((resolve, reject) => {
      pdf.getBase64(function(string) {
        this.content = {
          document: string
        };
        resolve(this.content);
      });
    });
    promise.then(resolve => {
      this.sendPdf(resolve);
    }); */
    /* pdfMake.createPdf(dd).getBase64(function(string) {
      this.content = {
        document: string
      };
      holder = string;
    }); */
    /*   var holder;
      pdfMake.createPdf(dd).getBuffer(function(dataURL) {
      holder = dataURL;
      console.log(holder);
  }); */
    /*   const pdf = pdfMake.createPdf(dd);
      const holder = btoa(pdf);
      const resutl1 = atob(holder); */
    /* console.log(pdf.buffer.toString("base64")); */
    /* this.content = {
      document: dd;
    } */
    /*  const file = new Blob([pdf], {type: 'application/pdf'});
     var fileURL = URL.createObjectURL(file);
     console.log(fileURL);
     const newpdf = btoa(pdf);
     console.log(newpdf);
     */
    /*  const fileReader = new FileReader();
     let base64;
     */
    /*  console.log(this.pdfFile); */
    // this.content = {
    //   document: holder
    // };
    // /* storage = newpdf; */
    // if (this.isSend) {
    //  this.sendPdf(this.content);
    //  }
  }
  sendPdf(pdf) {
    this.salesService.sendEmailWithPdf(pdf).subscribe(data => {
      console.log(data);
      this.poModel = data;
    }, error => {
      console.log(error);
    });
  }
}

