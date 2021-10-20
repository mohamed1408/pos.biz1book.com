import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionQtyGroupComponent } from './option-qty-group.component';

describe('OptionQtyGroupComponent', () => {
  let component: OptionQtyGroupComponent;
  let fixture: ComponentFixture<OptionQtyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionQtyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionQtyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
