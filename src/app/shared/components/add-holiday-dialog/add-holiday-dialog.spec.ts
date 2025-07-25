import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayDialog } from './add-holiday-dialog';

describe('AddHolidayDialog', () => {
  let component: AddHolidayDialog;
  let fixture: ComponentFixture<AddHolidayDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHolidayDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
