import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCompaniesComponent } from './multi-companies.component';

describe('MultiCompaniesComponent', () => {
  let component: MultiCompaniesComponent;
  let fixture: ComponentFixture<MultiCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
