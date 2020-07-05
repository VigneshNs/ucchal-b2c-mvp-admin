import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CmsService } from '../cms.service';

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})
export class DisplayContentComponent implements OnInit {
  holder: any;
  @ViewChild ('emg', {read:ElementRef, static: false}) emgContent: ElementRef;
  @ViewChild ('cont', {read:ElementRef, static: false}) offerContent: ElementRef;

  constructor(private cmsService: CmsService) {
    this.getDisplayContent();
  }

  ngOnInit() {
  }
  getDisplayContent() {
    this.cmsService.getDisplayContent().subscribe(data => {
      if (data.length !== 0) {
        this.holder = data[0];
      }
    }, error => {
      console.log(error);
    });
  }
  onSubmit(con) {
    const obj: any = {};
    if (con === 'offer') {
      obj.field = 'content';
      obj.content = this.offerContent.nativeElement.value;
    } else {
      obj.field = 'emergencyContent';
      obj.emergencyContent = this.emgContent.nativeElement.value;
    }
    this.cmsService.addDisplayContent(obj).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
