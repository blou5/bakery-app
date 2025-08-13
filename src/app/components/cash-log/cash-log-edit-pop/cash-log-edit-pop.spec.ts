import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLogEditPop } from './cash-log-edit-pop';

describe('CashLogEditPop', () => {
  let component: CashLogEditPop;
  let fixture: ComponentFixture<CashLogEditPop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashLogEditPop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashLogEditPop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
