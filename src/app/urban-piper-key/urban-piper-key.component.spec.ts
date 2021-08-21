import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanPiperKeyComponent } from './urban-piper-key.component';

describe('UrbanPiperKeyComponent', () => {
  let component: UrbanPiperKeyComponent;
  let fixture: ComponentFixture<UrbanPiperKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrbanPiperKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanPiperKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
