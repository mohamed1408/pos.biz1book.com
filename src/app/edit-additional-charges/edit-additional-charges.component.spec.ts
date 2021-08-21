import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalChargesComponent } from './edit-additional-charges.component';

describe('EditAdditionalChargesComponent', () => {
  let component: EditAdditionalChargesComponent;
  let fixture: ComponentFixture<EditAdditionalChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdditionalChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
