import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuldProducts } from './unsuld-products';

describe('UnsuldProducts', () => {
  let component: UnsuldProducts;
  let fixture: ComponentFixture<UnsuldProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuldProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuldProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
