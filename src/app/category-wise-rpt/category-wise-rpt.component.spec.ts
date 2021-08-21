import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseRptComponent } from './category-wise-rpt.component';

describe('CategoryWiseRptComponent', () => {
  let component: CategoryWiseRptComponent;
  let fixture: ComponentFixture<CategoryWiseRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
