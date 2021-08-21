import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranstypesComponent } from './transtypes.component';

describe('TranstypesComponent', () => {
  let component: TranstypesComponent;
  let fixture: ComponentFixture<TranstypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranstypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
