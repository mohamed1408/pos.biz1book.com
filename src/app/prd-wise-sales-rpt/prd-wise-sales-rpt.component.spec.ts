import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdWiseSalesRptComponent } from './prd-wise-sales-rpt.component';

describe('PrdWiseSalesRptComponent', () => {
  let component: PrdWiseSalesRptComponent;
  let fixture: ComponentFixture<PrdWiseSalesRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrdWiseSalesRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdWiseSalesRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
