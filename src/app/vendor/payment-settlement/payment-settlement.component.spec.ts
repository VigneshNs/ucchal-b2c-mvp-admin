import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSettlementComponent } from './payment-settlement.component';

describe('PaymentSettlementComponent', () => {
  let component: PaymentSettlementComponent;
  let fixture: ComponentFixture<PaymentSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
