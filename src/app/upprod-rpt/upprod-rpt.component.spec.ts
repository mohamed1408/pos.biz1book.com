import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UPProdRptComponent } from './upprod-rpt.component';

describe('UPProdRptComponent', () => {
  let component: UPProdRptComponent;
  let fixture: ComponentFixture<UPProdRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UPProdRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UPProdRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
