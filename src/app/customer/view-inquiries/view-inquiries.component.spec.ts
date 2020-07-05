import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInquiriesComponent } from './view-inquiries.component';

describe('ViewInquiriesComponent', () => {
  let component: ViewInquiriesComponent;
  let fixture: ComponentFixture<ViewInquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
