import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-subscriber',
  templateUrl: './view-subscriber.component.html',
  styleUrls: ['./view-subscriber.component.css']
})
export class ViewSubscriberComponent implements OnInit {
  subscriberData;
  showNoData: boolean;

  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService,
              private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllSubscriber();
  }
  getAllSubscriber() {
    this.customerService.getAllSubscriber().subscribe(data => {
      this.subscriberData = data;
      if(data.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
      console.log('subscriber', data);
    }, error => {
      console.log(error);
    });
  }

}
