import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiningareaComponent } from './create-diningarea.component';

describe('CreateDiningareaComponent', () => {
  let component: CreateDiningareaComponent;
  let fixture: ComponentFixture<CreateDiningareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiningareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiningareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
