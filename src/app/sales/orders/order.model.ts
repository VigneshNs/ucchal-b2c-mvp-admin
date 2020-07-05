import {Product} from '../../product/add-product/product.model';

export class Order {
   customerId: string;
   orderId: string;
   items: [{productId: number, pack: number,
      ratioQty: number}];
   total: number;
   customerDetails: [{
    emailId: string,
    mobileNumber: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    location: string,
    gender: string,
}];
   addressDetails: [{
      name: string;
      mobileNumber: number;
      streetAddress: string;
      building: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
   }];
   paymentStatus: string;
   orderStatus: string;
   orderDate: Date;
   orderUpdatedDate: Date;
   orderedProducts: [ Product,
   ];
   shipmentStatus: string;
   paymentMode: string;
   cart: any;
   purchaseOrderStatus: string;
   shipingFees: number;
   
   awbNo: string;
}
