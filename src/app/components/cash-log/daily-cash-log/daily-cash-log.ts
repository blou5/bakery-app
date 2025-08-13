import {ChangeDetectorRef, Component, Inject, inject, OnInit, signal} from '@angular/core';
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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddHolidayDialog} from '../../../shared/components/add-holiday-dialog/add-holiday-dialog';
import {NgForOf} from '@angular/common';
import {NumericOnlyDirective} from '../../../shared/directives/numeric-only-directive';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {DailyCashLogCreateInterface} from '../../../models/create/daily-cash-log-create';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';

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
export class DailyCashLog implements OnInit {
  logDate = signal<Date>(new Date());
  openingCash = signal<number>(0);
  closingCash = signal<number>(0);
  cashWithdrawn = signal<number>(0);
  notes = signal<string>('');
  weather = signal<string>('sunny');
  // holiday = signal<boolean>(false);
  // holidayTypes = signal<string[]>([]);

  isHoliday = signal(false);
  holidayType = signal<string | null>(null);
  newHoliday = '';
  holidayOptions = ['National', 'Religious', 'Other'];
  private dialog = inject(MatDialog);

  private readonly dailyCashService = inject(DailyCashLogsService);
  private readonly cdRef = inject(ChangeDetectorRef)

  constructor(private dialogRef: MatDialogRef<DailyCashLog>,
              @Inject(MAT_DIALOG_DATA) public data: { log: DailyCashLogInterface }) {
  }

  ngOnInit(): void {
    if (this.data.log) {
      this.logDate.set(this.data.log.logDate)
      this.openingCash.set(this.data.log.openingCash)
      this.closingCash.set(this.data.log.closingCash)
      this.cashWithdrawn.set(this.data.log.cashWithdrawn)
      this.notes.set(this.data.log.notes)
      this.weather.set(this.data.log.weather)
      this.holidayType.set(this.data.log.holidayType)
      this.isHoliday.set(this.data.log.holiday)
    }
  }

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

  expectedCash: number | null = null;

  generateExpectedCash() {
    this.dailyCashService.getEstimatedMoney(this.data.log.logId).subscribe({
      next: value => {
        this.expectedCash = value;
        this.cdRef.detectChanges();
      },
      error: err => console.error(err)
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
    if (this.data) {
      console.log('some shit ')
      const dailyCashLog: DailyCashLogInterface = {
        logId: this.data.log.logId.valueOf(),
        weather: this.weather(),
        notes: this.notes(),
        holidayType: this.holidayType(),
        holiday: this.isHoliday(),
        cashWithdrawn: this.cashWithdrawn(),
        closingCash: this.closingCash(),
        logDate: this.logDate(),
        openingCash: this.openingCash(),
        expectedCash: this.expectedCash,
        status: this.data.log.status
      }
      this.dailyCashService.update(dailyCashLog).subscribe({
        next: (response) => {
          this.dialogRef.close(response)
        },
        error: (err) => console.error('Error saving log:', err)
      });

    } else {
      const payload: DailyCashLogCreateInterface = {

        openingCash: this.openingCash(),
        closingCash: this.closingCash(),
        notes: this.notes() || undefined,
        weather: this.weather() || undefined,
        holiday: this.isHoliday(),
        holidayType: this.holidayType(),
        logDate: this.logDate()
      }
      console.log(JSON.stringify(payload));

      this.dailyCashService.create(payload).subscribe({
        next: (response) => {
          this.dialogRef.close(response)
        },
        error: (err) => console.error('Error saving log:', err)
      });
    }
  }


}
