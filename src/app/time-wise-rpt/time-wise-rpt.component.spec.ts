import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWiseRptComponent } from './time-wise-rpt.component';

describe('TimeWiseRptComponent', () => {
  let component: TimeWiseRptComponent;
  let fixture: ComponentFixture<TimeWiseRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeWiseRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeWiseRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
