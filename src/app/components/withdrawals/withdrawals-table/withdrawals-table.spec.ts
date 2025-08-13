import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsTable } from './withdrawals-table';

describe('WithdrawalsTable', () => {
  let component: WithdrawalsTable;
  let fixture: ComponentFixture<WithdrawalsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
