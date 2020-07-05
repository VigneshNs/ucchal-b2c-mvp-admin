import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../../marketing.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})
export class EditWalletComponent implements OnInit {
  walletModel: any;
  walletForm: FormGroup;
  isMinLoyalty = false;
  isMaxLoyalty = false;
  isMinActivity = false;
  isMaxActivity = false;
  isMinEvent = false;
  isMaxEvent = false;
  isMinRefer = false;
  isMaxRefer = false;

  constructor(private marketingService: MarketingService, private router: Router,
              private fb: FormBuilder) {
                this.getWallet();
              }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.walletForm = this.fb.group({
      minCoin: [''],
      maxCoin: [''],
      vaildationPeriodForCoin: [''],
      loyaltyFixedAmount: [''],
      loyaltyFixedCoin: [''],
      loyaltyUsingPercentage: [''],
      loyaltyMinimunCondition: [''],
      loyaltyminimumOrder: [''],
      loyaltyMaximumCondition: [''],
      loyaltyMaximumOrder: [''],
      activityAddingImage: [''],
      activityAddingVideo: [''],
      activityFirstTimeRegistration: [''],
      activityUsingPercentage: [''],
      activityMinimunCondition: [''],
      activityMinimumOrder: [''],
      activityMaximumCondition: [''],
      activityMaximumOrder: [''],
      referusingPercentage: [''],
      referminimunCondition: [''],
      referminimumOrder: [''],
      referaximumCondition: [''],
      referMaximumOrder: [''],
      eventUsingPercentage: [''],
      eventMinimunCondition: [''],
      eventMinimumOrder: [''],
      eventMaximumCondition: [''],
      eventMaximumOrder: [''],
    });
  }
  getWallet() {
    this.marketingService.getWalletForAdmin().subscribe(data => {
      if (data.length !== 0) {
        this.walletModel = data[0];
        this.walletModel.loyaltyWallet[0].minimunCondition === true ? this.isMinLoyalty = true : this.isMinLoyalty = false;
        this.walletModel.loyaltyWallet[0].maximumCondition === true ? this.isMaxLoyalty = true : this.isMaxLoyalty = false;
        this.walletModel.activityWallet[0].minimunCondition === true ? this.isMinActivity = true : this.isMinActivity = false;
        this.walletModel.activityWallet[0].maximumCondition === true ? this.isMaxActivity = true : this.isMaxActivity = false;
        this.walletModel.referWallet[0].minimunCondition === true ? this.isMinRefer = true : this.isMinRefer = false;
        this.walletModel.referWallet[0].maximumCondition === true ? this.isMaxLoyalty = true : this.isMaxLoyalty = false;
        this.walletModel.eventWallet[0].minimunCondition === true ? this.isMinLoyalty = true : this.isMinLoyalty = false;
        this.walletModel.eventWallet[0].maximumCondition === true ? this.isMaxLoyalty = true : this.isMaxLoyalty = false;
      }
    }, error => {
      console.log(error);
    });
  }
  onLoyalMin() {
    const temp = this.walletForm.controls.loyaltyMinimunCondition.value;
    temp === true ? this.isMinLoyalty = true : this.isMinLoyalty = false, this.walletForm.controls.loyaltyminimumOrder.reset();
  }
  onLoyalMax() {
    const temp = this.walletForm.controls.loyaltyMaximumCondition.value;
    temp === true ? this.isMaxLoyalty = true : this.isMaxLoyalty = false, this.walletForm.controls.loyaltyMaximumOrder.reset();
  }
  onActivityMin() {
    const temp = this.walletForm.controls.activityMinimunCondition.value;
    temp === true ? this.isMinActivity = true : this.isMinActivity = false, this.walletForm.controls.activityMinimumOrder.reset();
  }
  onActivityMax() {
    const temp = this.walletForm.controls.activityMaximumCondition.value;
    temp === true ? this.isMaxActivity = true : this.isMaxActivity = false, this.walletForm.controls.activityMaximumOrder.reset();
  }
  onEventMin() {
    const temp = this.walletForm.controls.eventMinimunCondition.value;
    temp === true ? this.isMinEvent = true : this.isMinEvent = false, this.walletForm.controls.eventMinimumOrder.reset();
  }
  onEventMax() {
    const temp = this.walletForm.controls.eventMaximumCondition.value;
    temp === true ? this.isMaxEvent = true : this.isMaxEvent = false, this.walletForm.controls.eventMaximumOrder.reset();
  }
  onReferMin() {
    const temp = this.walletForm.controls.referminimunCondition.value;
    temp === true ? this.isMinRefer = true : this.isMinRefer = false, this.walletForm.controls.referminimumOrder.reset();
  }
  onReferMax() {
    const temp = this.walletForm.controls.referaximumCondition.value;
    temp === true ? this.isMaxRefer = true : this.isMaxRefer = false, this.walletForm.controls.referMaximumOrder.reset();
  }
  onSubmit() {
    const collection: any = {};
    const loyalty: any = {};
    const activity: any = {};
    const event: any = {};
    const refer: any = {};
    collection.minCoin = this.walletForm.controls.minCoin.value === '' ? this.walletModel.minCoin : this.walletForm.controls.minCoin.value;
    collection.maxCoin = this.walletForm.controls.maxCoin.value === '' ? this.walletModel.maxCoin : this.walletForm.controls.maxCoin.value;
    collection.vaildationPeriodForCoin = this.walletForm.controls.vaildationPeriodForCoin.value  === '' ? this.walletModel.vaildationPeriodForCoin : this.walletForm.controls.vaildationPeriodForCoin.value;
    loyalty.fixedAmount = this.walletForm.controls.loyaltyFixedAmount.value === '' ? this.walletModel.loyaltyWallet[0].fixedAmount : this.walletForm.controls.loyaltyFixedAmount.value;
    loyalty.fixedCoin = this.walletForm.controls.loyaltyFixedCoin.value === '' ? this.walletModel.loyaltyWallet[0].fixedCoin : this.walletForm.controls.loyaltyFixedCoin.value;
    loyalty.usingPercentage = this.walletForm.controls.loyaltyUsingPercentage.value === '' ? this.walletModel.loyaltyWallet[0].usingPercentage : this.walletForm.controls.loyaltyUsingPercentage.value;
    loyalty.minimunCondition = this.walletForm.controls.loyaltyMinimunCondition.value === true ? true : false;
    loyalty.minimumOrder = this.walletForm.controls.loyaltyminimumOrder.value === '' ? this.walletModel.loyaltyWallet[0].minimumOrder : this.walletForm.controls.loyaltyminimumOrder.value;
    loyalty.maximumCondition = this.walletForm.controls.loyaltyMaximumCondition.value === true ? true : false;
    loyalty.maximumOrder = this.walletForm.controls.loyaltyMaximumOrder.value === '' ? this.walletModel.loyaltyWallet[0].maximumOrder : this.walletForm.controls.loyaltyMaximumOrder.value;
    collection.loyaltyWallet = loyalty;
    activity.addingImage = this.walletForm.controls.activityAddingImage.value === '' ? this.walletModel.activityWallet[0].addingImage : this.walletForm.controls.activityAddingImage.value;
    activity.addingVideo = this.walletForm.controls.activityAddingVideo.value === '' ? this.walletModel.activityWallet[0].addingVideo : this.walletForm.controls.activityAddingVideo.value;
    activity.firstTimeRegistration = this.walletForm.controls.activityFirstTimeRegistration.value === '' ? this.walletModel.activityWallet[0].firstTimeRegistration : this.walletForm.controls.activityFirstTimeRegistration.value;
    activity.usingPercentage = this.walletForm.controls.activityUsingPercentage.value === '' ? this.walletModel.activityWallet[0].usingPercentage : this.walletForm.controls.activityUsingPercentage.value;
    activity.minimunCondition = this.walletForm.controls.activityMinimunCondition.value === true ? true : false;
    activity.minimumOrder = this.walletForm.controls.activityMinimumOrder.value === '' ? this.walletModel.activityWallet[0].minimumOrder : this.walletForm.controls.activityMinimumOrder.value;
    activity.maximumCondition = this.walletForm.controls.activityMaximumCondition.value === true ? true : false;
    activity.maximumOrder = this.walletForm.controls.activityMaximumOrder.value === '' ? this.walletModel.activityWallet[0].maximumOrder : this.walletForm.controls.activityMaximumOrder.value;
    collection.activityWallet = activity;
    event.usingPercentage = this.walletForm.controls.eventUsingPercentage.value === '' ? this.walletModel.eventWallet[0].usingPercentage : this.walletForm.controls.eventUsingPercentage.value;
    event.minimunCondition = this.walletForm.controls.eventMinimunCondition.value === true ? true : false;
    event.minimumOrder = this.walletForm.controls.eventMinimumOrder.value === '' ? this.walletModel.eventWallet[0].minimumOrder : this.walletForm.controls.eventMinimumOrder.value;
    event.maximumCondition = this.walletForm.controls.eventMaximumCondition.value === true ? true : false;
    event.maximumOrder = this.walletForm.controls.eventMaximumOrder.value === '' ? this.walletModel.eventWallet[0].maximumOrder : this.walletForm.controls.eventMaximumOrder.value;
    collection.eventWallet = event;
    refer.usingPercentage = this.walletForm.controls.referusingPercentage.value === '' ? this.walletModel.referWallet[0].usingPercentage : this.walletForm.controls.referusingPercentage.value;
    refer.minimunCondition = this.walletForm.controls.referminimunCondition.value === true ? true : false;
    refer.minimumOrder = this.walletForm.controls.referminimumOrder.value === '' ? this.walletModel.referWallet[0].minimumOrder : this.walletForm.controls.referminimumOrder.value;
    refer.maximumCondition = this.walletForm.controls.referaximumCondition.value === true ? true : false;
    refer.maximumOrder = this.walletForm.controls.referMaximumOrder.value === '' ? this.walletModel.referWallet[0].maximumOrder : this.walletForm.controls.referMaximumOrder.value;
    collection.referWallet = refer;
    /* console.log(collection); */
    this.marketingService.addWalletByAdmin(collection).subscribe(data => {
      this.router.navigate(['marketing/viewWallet']);
    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.router.navigate(['marketing/viewWallet']);
  }
}
