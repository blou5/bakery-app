import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCashLog } from './daily-cash-log';

describe('DailyCashLog', () => {
  let component: DailyCashLog;
  let fixture: ComponentFixture<DailyCashLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCashLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCashLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
