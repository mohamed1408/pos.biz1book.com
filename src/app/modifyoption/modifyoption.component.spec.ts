import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyoptionComponent } from './modifyoption.component';

describe('ModifyoptionComponent', () => {
  let component: ModifyoptionComponent;
  let fixture: ComponentFixture<ModifyoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
