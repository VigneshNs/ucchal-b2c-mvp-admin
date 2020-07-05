import { Component, AfterContentInit, ContentChildren, ViewChild, QueryList, ElementRef,
  AfterViewInit, 
  HostListener} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements  AfterContentInit, AfterViewInit {
  @ContentChildren(CarouselItemDirective, { read: ElementRef }) items
  : QueryList<ElementRef<HTMLDivElement>>;
@ViewChild('slides', {static: false}) slidesContainer: ElementRef<HTMLDivElement>;

slidesIndex = 0;
mobileSlider = 0;
getDevice()  {
  if (window.screen.width > 900) { // 768px portrait
    this.mobileSlider = 6;
  } else {
    this.mobileSlider = 2;
  }
}
get currentItem(): ElementRef<HTMLDivElement> {
  return this.items.find((item, index) => index === this.slidesIndex);
}

ngAfterContentInit() {
  /* console.log('items', this.items); */
}

ngAfterViewInit() {
  /* console.log('slides', this.slidesContainer); */
}

onClickLeft() {
  this.getDevice();
  this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
  if (this.slidesIndex * this.mobileSlider > 0) {
    this.slidesIndex--;
  }
}

onClickRight() {
  this.getDevice();
  this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
  if (this.slidesIndex * this.mobileSlider < this.items.length - 1) {
    this.slidesIndex++;
  }
}

defaultTouch = { x: 0, y: 0, time: 0 };

@HostListener('touchstart', ['$event'])
//@HostListener('touchmove', ['$event'])
@HostListener('touchend', ['$event'])
@HostListener('touchcancel', ['$event'])
handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
        this.defaultTouch.x = touch.pageX;
        this.defaultTouch.y = touch.pageY;
        this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
        let deltaX = touch.pageX - this.defaultTouch.x;
        let deltaY = touch.pageY - this.defaultTouch.y;
        let deltaTime = event.timeStamp - this.defaultTouch.time;

        // simulte a swipe -> less than 500 ms and more than 60 px
        if (deltaTime < 500) {
            // touch movement lasted less than 500 ms
            if (Math.abs(deltaX) > 60) {
                // delta x is at least 60 pixels
                if (deltaX > 0) {
                    this.doSwipeRight(event);
                } else {
                    this.doSwipeLeft(event);
                }
            }

            if (Math.abs(deltaY) > 60) {
                // delta y is at least 60 pixels
                if (deltaY > 0) {
                    this.doSwipeDown(event);
                } else {
                    this.doSwipeUp(event);
                }
            }
        }
    }
}

doSwipeLeft(event) {
    console.log('swipe left', event);
    this.onClickRight();
}

doSwipeRight(event) {
    console.log('swipe right', event);
    // this.nav.toggleNavbar();
   
    this.onClickLeft();
}

doSwipeUp(event) {
    console.log('swipe up', event);
}

doSwipeDown(event) {
    console.log('swipe down', event);
}

}
