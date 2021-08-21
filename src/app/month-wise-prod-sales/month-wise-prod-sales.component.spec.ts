import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthWiseProdSalesComponent } from './month-wise-prod-sales.component';

describe('MonthWiseProdSalesComponent', () => {
  let component: MonthWiseProdSalesComponent;
  let fixture: ComponentFixture<MonthWiseProdSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthWiseProdSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthWiseProdSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
