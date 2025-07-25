import {Component, inject, signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {AddHolidayDialog} from '../../shared/components/add-holiday-dialog/add-holiday-dialog';
import {NgForOf} from '@angular/common';
import {NumericOnlyDirective} from '../../shared/directives/numeric-only-directive';
import {DailyCashLogsService} from '../../services/daily-cash-logs.service';
import {DailyCashLogInterface} from '../../models/daily-cash-log.model';
import {DailyCashLogCreateInterface} from '../../models/create/daily-cash-log-create';

@Component({
  selector: 'app-daily-cash-log',
  imports: [
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatCard,
    FormsModule,
    MatInput,
    MatDatepickerInput,
    MatIcon,
    MatButton,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatLabel,
    NgForOf,
    MatFormFieldModule,
    NumericOnlyDirective

  ],
  templateUrl: './daily-cash-log.html',
  standalone: true,
  styleUrl: './daily-cash-log.css',
  providers: [
    provideNativeDateAdapter(), // ✅ fix here
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    },
  ],
})
export class DailyCashLog {
  logDate = signal<Date>(new Date());
  openingCash = signal<number>(0);
  closingCash = signal<number>(0);
  notes = signal<string>('');
  weather = signal<string>('sunny');
  holiday = signal<boolean>(false);
  holidayTypes = signal<string[]>([]);

  isHoliday = signal(false);
  holidayType = signal<string | null>(null);
  newHoliday = '';
  holidayOptions = ['National', 'Religious', 'Other'];
  private dialog = inject(MatDialog);

  private readonly dailyCashService = inject(DailyCashLogsService);

  openAddHolidayDialog() {
    const dialogRef = this.dialog.open(AddHolidayDialog,
      {
        data: {
          title: 'Create Holiday Name',
          nameLabel: 'Holiday Name'
        }
      });
    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result?.trim()) {
        if (result != null) {
          this.holidayOptions.push(result);
        }
        this.holidayType.set(result);
      }
    });
  }

  onSelectHoliday(value: string) {
    if (value === '__add_new__') {
      this.openAddHolidayDialog();
    } else {
      this.holidayType.set(value);
    }
  }


  submit(): void {
    console.log("hgdqaiuwdghuiqaghd")
    const payload: DailyCashLogCreateInterface = {

      openingCash: this.openingCash(),
      closingCash: this.closingCash(),
      notes: this.notes() || undefined,
      weather: this.weather() || undefined,
      holiday: this.holiday(),
      holidayType: this.holidayType(),
      logDate: this.logDate()
    }
    console.log(JSON.stringify(payload));

    this.dailyCashService.create(payload).subscribe({
      next: (response) => console.log('Saved:', response),
      error: (err) => console.error('Error saving log:', err)
    });
  }
}
