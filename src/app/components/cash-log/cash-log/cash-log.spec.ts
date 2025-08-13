import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLog } from './cash-log';

describe('CashLog', () => {
  let component: CashLog;
  let fixture: ComponentFixture<CashLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
