import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-row',
  templateUrl: './multiple-row.component.html',
  styleUrls: ['./multiple-row.component.css']
})
export class MultipleRowComponent implements OnInit {
  profiledetails = [ /* {name: 'Row1' , link: '/cms/viewSecond'}, */
  {name: 'Launch Offer' , link: '/cms/viewThird'}
 /*  {name: 'Row3' , link: '/cms/viewFifth'},
  {name: 'Row4' , link: '/cms/viewSixth'},
  {name: 'Row5' , link: '/cms/viewSeventh'} */
];
selectedItemTab = this.profiledetails[0].name;
  constructor() { }

  ngOnInit() {
  }
  selectedTab(tab) {
    this.selectedItemTab = tab;
  }
}
