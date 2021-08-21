import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariantGrpComponent } from './edit-variant-grp.component';

describe('EditVariantGrpComponent', () => {
  let component: EditVariantGrpComponent;
  let fixture: ComponentFixture<EditVariantGrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariantGrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariantGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
