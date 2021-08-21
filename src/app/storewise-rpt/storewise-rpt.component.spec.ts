import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorewiseRptComponent } from './storewise-rpt.component';

describe('StorewiseRptComponent', () => {
  let component: StorewiseRptComponent;
  let fixture: ComponentFixture<StorewiseRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorewiseRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorewiseRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
