import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeReportComponent } from './order-type-report.component';

describe('OrderTypeReportComponent', () => {
  let component: OrderTypeReportComponent;
  let fixture: ComponentFixture<OrderTypeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
