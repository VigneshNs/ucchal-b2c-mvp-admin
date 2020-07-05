import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadedProductParentComponent } from './view-uploaded-product-parent.component';

describe('ViewUploadedProductParentComponent', () => {
  let component: ViewUploadedProductParentComponent;
  let fixture: ComponentFixture<ViewUploadedProductParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUploadedProductParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadedProductParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
