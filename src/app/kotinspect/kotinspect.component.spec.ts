import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KotinspectComponent } from './kotinspect.component';

describe('KotinspectComponent', () => {
  let component: KotinspectComponent;
  let fixture: ComponentFixture<KotinspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KotinspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KotinspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
