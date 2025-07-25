import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {NgForOf} from '@angular/common';
import {DailyCashLogsService} from '../../services/daily-cash-logs.service';
import {ChangeReserveService} from '../../services/change-reserve.service';
import {ChangeReserveLogInterface} from '../../models/change-reserve.model';
import {DailyCashLog} from '../daily-cash-log/daily-cash-log';
import {DailyCashLogInterface} from '../../models/daily-cash-log.model';

@Component({
  selector: 'app-change-reserve',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatFormField,
    MatFormField,
    MatLabel,
    MatSelect,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    FormsModule,
    MatOption,
    MatDatepickerInput,
    MatSuffix,
    NgForOf
  ],
  templateUrl: './change-reserve.html',
  standalone: true,
  styleUrl: './change-reserve.css',
  providers: [
    provideNativeDateAdapter(), // ✅ fix here
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    },
  ],
})
export class ChangeReserve {


  amount=signal<number>(0);
  reserveType=signal<string>('');
  changeDate= signal<Date>(new Date());
  private readonly changeReserveService = inject(ChangeReserveService);
  reserveTypes = ['Room', 'Table', 'Equipment', 'Other'];

  submit() {

    const payload : ChangeReserveLogInterface = {
      amount:this.amount(),
      reserveType: this.reserveType() || undefined,
      changeDate:this.changeDate() || undefined,
      log : {
        logId: 1,
        logDate: new Date('2025-06-12'),
        openingCash: 200,
        closingCash: 300,
        notes: 'some info',
        weather: 'sunny',
        holiday: true,
        holidayType: 'weekend',
      }
    };
    console.log(JSON.stringify(payload))
    this.changeReserveService.create(payload).subscribe({
      next: (response) => console.log('Saved:', response),
      error: (err) => console.error('Error saving log:', err)
    });
  }
}
