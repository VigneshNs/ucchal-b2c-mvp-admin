import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSizeGuideComponent } from './view-size-guide.component';

describe('ViewSizeGuideComponent', () => {
  let component: ViewSizeGuideComponent;
  let fixture: ComponentFixture<ViewSizeGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSizeGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSizeGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
