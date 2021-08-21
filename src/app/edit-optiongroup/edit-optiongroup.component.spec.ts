import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOptiongroupComponent } from './edit-optiongroup.component';

describe('EditOptiongroupComponent', () => {
  let component: EditOptiongroupComponent;
  let fixture: ComponentFixture<EditOptiongroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOptiongroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOptiongroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
