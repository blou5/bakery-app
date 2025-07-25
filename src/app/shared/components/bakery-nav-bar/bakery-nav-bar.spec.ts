import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeryNavBar } from './bakery-nav-bar';

describe('BakeryNavBar', () => {
  let component: BakeryNavBar;
  let fixture: ComponentFixture<BakeryNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BakeryNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BakeryNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
