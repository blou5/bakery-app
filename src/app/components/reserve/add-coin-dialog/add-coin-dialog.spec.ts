import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoinDialog } from './add-coin-dialog';

describe('AddCoinDialog', () => {
  let component: AddCoinDialog;
  let fixture: ComponentFixture<AddCoinDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoinDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoinDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
