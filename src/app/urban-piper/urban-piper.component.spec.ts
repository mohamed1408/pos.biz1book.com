import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanPiperComponent } from './urban-piper.component';

describe('UrbanPiperComponent', () => {
  let component: UrbanPiperComponent;
  let fixture: ComponentFixture<UrbanPiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrbanPiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanPiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
