import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//   $(function(){
//     var test = localStorage.input === 'true'? true: false;
//     $('input').prop('checked', test || false);
// });

// $('input').on('change', function() {
//     localStorage.input = $(this).is(':checked');
//     console.log($(this).is(':checked'));
// });
});
