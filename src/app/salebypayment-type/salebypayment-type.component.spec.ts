import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebypaymentTypeComponent } from './salebypayment-type.component';

describe('SalebypaymentTypeComponent', () => {
  let component: SalebypaymentTypeComponent;
  let fixture: ComponentFixture<SalebypaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalebypaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalebypaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
