import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToMeasureComponent } from './how-to-measure.component';

describe('HowToMeasureComponent', () => {
  let component: HowToMeasureComponent;
  let fixture: ComponentFixture<HowToMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
