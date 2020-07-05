import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../../marketing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-wallet',
  templateUrl: './view-wallet.component.html',
  styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent implements OnInit {
  walletModel: any;
  isEmptyWallet = false;

  constructor(private marketingService: MarketingService, private router: Router) {
    this.getWallet();
   }

  ngOnInit() {
  }
  getWallet() {
    this.marketingService.getWalletForAdmin().subscribe(data => {
      if (data.length !== 0) {
        this.isEmptyWallet = false;
        this.walletModel = data[0];
      } else {
        this.isEmptyWallet = true;
      }
    }, error => {
      console.log(error);
    });
  }
  onAdd() {
    this.router.navigate(['marketing/addWallet']);
  }
  onEdit() {
    this.router.navigate(['marketing/editWallet']);
  }
}
