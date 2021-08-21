import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinGenerateComponent } from './pin-generate.component';

describe('PinGenerateComponent', () => {
  let component: PinGenerateComponent;
  let fixture: ComponentFixture<PinGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
