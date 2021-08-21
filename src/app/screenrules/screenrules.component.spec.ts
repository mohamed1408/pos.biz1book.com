import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenrulesComponent } from './screenrules.component';

describe('ScreenrulesComponent', () => {
  let component: ScreenrulesComponent;
  let fixture: ComponentFixture<ScreenrulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenrulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
