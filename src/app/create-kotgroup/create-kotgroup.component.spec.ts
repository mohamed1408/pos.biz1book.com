import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKOTGroupComponent } from './create-kotgroup.component';

describe('CreateKOTGroupComponent', () => {
  let component: CreateKOTGroupComponent;
  let fixture: ComponentFixture<CreateKOTGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKOTGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKOTGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
