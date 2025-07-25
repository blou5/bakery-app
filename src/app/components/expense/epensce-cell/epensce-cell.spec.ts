import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpensceCell } from './epensce-cell';

describe('EpensceCell', () => {
  let component: EpensceCell;
  let fixture: ComponentFixture<EpensceCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpensceCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpensceCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
