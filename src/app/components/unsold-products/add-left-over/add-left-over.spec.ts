import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeftOver } from './add-left-over';

describe('AddLeftOver', () => {
  let component: AddLeftOver;
  let fixture: ComponentFixture<AddLeftOver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLeftOver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeftOver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
