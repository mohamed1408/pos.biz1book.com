import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvariantComponent } from './editvariant.component';

describe('EditvariantComponent', () => {
  let component: EditvariantComponent;
  let fixture: ComponentFixture<EditvariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
