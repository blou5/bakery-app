import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLogTable } from './cash-log-table';

describe('CashLogTable', () => {
  let component: CashLogTable;
  let fixture: ComponentFixture<CashLogTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashLogTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashLogTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
