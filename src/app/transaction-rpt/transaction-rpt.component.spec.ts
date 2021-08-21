import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRptComponent } from './transaction-rpt.component';

describe('TransactionRptComponent', () => {
  let component: TransactionRptComponent;
  let fixture: ComponentFixture<TransactionRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
