import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningAreaComponent } from './dining-area.component';

describe('DiningAreaComponent', () => {
  let component: DiningAreaComponent;
  let fixture: ComponentFixture<DiningAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiningAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
