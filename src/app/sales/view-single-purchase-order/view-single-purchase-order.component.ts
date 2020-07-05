import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-view-single-purchase-order',
  templateUrl: './view-single-purchase-order.component.html',
  styleUrls: ['./view-single-purchase-order.component.css']
})
export class ViewSinglePurchaseOrderComponent implements OnInit {
  isInvoice = false;
  status = ['Created', 'Sent', 'Received', 'Approved'];
  isInvoiceAgain = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private salesService: SalesService,
              public dialogRef: MatDialogRef<ViewSinglePurchaseOrderComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close(false);
  }
  onInvoice(invoice) {
    if (invoice.validity.valid === true) {
      this.isInvoiceAgain = false;
      this.isInvoice = false;
      const holder = {
        orderId: this.data.orderId,
        invoiceNumber: invoice.value
      };
      this.salesService.addVendorInvoiceToPO(holder, this.data._id).subscribe(data => {
        this.dialogRef.close(data);
      }, error => {
        console.log(error);
      });
    } else {
      this.isInvoice = true;
    }
  }
  onEditInvoice() {
    this.isInvoiceAgain = true;
  }
  onCancel() {
    this.isInvoiceAgain = false;
  }
  onApprove() {
    const holder = {
      orderId: this.data.orderId
    };
    this.salesService.approvePurchaseOrder(holder, this.data._id).subscribe(data => {
      this.dialogRef.close(data);
    }, error => {
      console.log(error);
    });
  }
}
