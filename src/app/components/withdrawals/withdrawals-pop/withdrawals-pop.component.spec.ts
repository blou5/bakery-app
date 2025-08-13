import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsPop } from './withdrawals-pop.component';

describe('Withdrawals', () => {
  let component: WithdrawalsPop;
  let fixture: ComponentFixture<WithdrawalsPop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalsPop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalsPop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
