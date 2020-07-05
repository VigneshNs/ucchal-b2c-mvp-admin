import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperCategoryComponent } from './add-super-category.component';

describe('AddSuperCategoryComponent', () => {
  let component: AddSuperCategoryComponent;
  let fixture: ComponentFixture<AddSuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
