import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRulesComponent } from './discount-rules.component';

describe('DiscountRulesComponent', () => {
  let component: DiscountRulesComponent;
  let fixture: ComponentFixture<DiscountRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
