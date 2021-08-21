import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttypeComponent } from './paymenttype.component';

describe('PaymenttypeComponent', () => {
  let component: PaymenttypeComponent;
  let fixture: ComponentFixture<PaymenttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymenttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
