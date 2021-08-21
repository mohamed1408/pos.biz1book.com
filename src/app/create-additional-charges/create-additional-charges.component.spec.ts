import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdditionalChargesComponent } from './create-additional-charges.component';

describe('CreateAdditionalChargesComponent', () => {
  let component: CreateAdditionalChargesComponent;
  let fixture: ComponentFixture<CreateAdditionalChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdditionalChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdditionalChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
