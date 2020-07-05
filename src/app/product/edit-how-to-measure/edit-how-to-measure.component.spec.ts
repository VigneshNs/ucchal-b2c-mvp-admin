import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHowToMeasureComponent } from './edit-how-to-measure.component';

describe('EditHowToMeasureComponent', () => {
  let component: EditHowToMeasureComponent;
  let fixture: ComponentFixture<EditHowToMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHowToMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHowToMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
