import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReserve } from './change-reserve';

describe('ChangeReserve', () => {
  let component: ChangeReserve;
  let fixture: ComponentFixture<ChangeReserve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeReserve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeReserve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
