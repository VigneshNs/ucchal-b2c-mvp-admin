import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomepageVideoComponent } from './add-homepage-video.component';

describe('AddHomepageVideoComponent', () => {
  let component: AddHomepageVideoComponent;
  let fixture: ComponentFixture<AddHomepageVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomepageVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomepageVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
