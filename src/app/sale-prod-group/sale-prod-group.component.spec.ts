import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProdGroupComponent } from './sale-prod-group.component';

describe('SaleProdGroupComponent', () => {
  let component: SaleProdGroupComponent;
  let fixture: ComponentFixture<SaleProdGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleProdGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleProdGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
