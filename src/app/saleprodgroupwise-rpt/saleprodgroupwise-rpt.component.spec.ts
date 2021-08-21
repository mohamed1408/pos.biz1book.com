import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleprodgroupwiseRptComponent } from './saleprodgroupwise-rpt.component';

describe('SaleprodgroupwiseRptComponent', () => {
  let component: SaleprodgroupwiseRptComponent;
  let fixture: ComponentFixture<SaleprodgroupwiseRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleprodgroupwiseRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleprodgroupwiseRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
