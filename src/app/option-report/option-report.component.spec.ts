import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionReportComponent } from './option-report.component';

describe('OptionReportComponent', () => {
  let component: OptionReportComponent;
  let fixture: ComponentFixture<OptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
