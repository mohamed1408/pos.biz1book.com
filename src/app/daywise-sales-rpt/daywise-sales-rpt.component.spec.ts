import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseSalesRptComponent } from './daywise-sales-rpt.component';

describe('DaywiseSalesRptComponent', () => {
  let component: DaywiseSalesRptComponent;
  let fixture: ComponentFixture<DaywiseSalesRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaywiseSalesRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaywiseSalesRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
