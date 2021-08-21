import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxGroupComponent } from './add-tax-group.component';

describe('AddTaxGroupComponent', () => {
  let component: AddTaxGroupComponent;
  let fixture: ComponentFixture<AddTaxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
