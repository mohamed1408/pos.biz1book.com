import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWiseSalesRptComponent } from './order-wise-sales-rpt.component';

describe('OrderWiseSalesRptComponent', () => {
  let component: OrderWiseSalesRptComponent;
  let fixture: ComponentFixture<OrderWiseSalesRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWiseSalesRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWiseSalesRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
