import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KOTGroupComponent } from './kotgroup.component';

describe('KOTGroupComponent', () => {
  let component: KOTGroupComponent;
  let fixture: ComponentFixture<KOTGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KOTGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KOTGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
