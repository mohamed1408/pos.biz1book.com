import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryorderRptComponent } from './deliveryorder-rpt.component';

describe('DeliveryorderRptComponent', () => {
  let component: DeliveryorderRptComponent;
  let fixture: ComponentFixture<DeliveryorderRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryorderRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryorderRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
