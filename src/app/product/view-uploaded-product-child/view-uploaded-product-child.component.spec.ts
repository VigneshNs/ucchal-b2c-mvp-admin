import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadedProductChildComponent } from './view-uploaded-product-child.component';

describe('ViewUploadedProductChildComponent', () => {
  let component: ViewUploadedProductChildComponent;
  let fixture: ComponentFixture<ViewUploadedProductChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUploadedProductChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadedProductChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
