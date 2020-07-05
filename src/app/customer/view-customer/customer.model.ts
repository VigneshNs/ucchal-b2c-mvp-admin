import { AddressDetails } from './addressDetails.model';
export class CustomerModel {
    emailId: string;
    mobileNumber: number;
    password: string;
    date: Date;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    location: string;
    gender: string;
    addressDetails: [AddressDetails];
    result: string;
    publish: boolean;
}
