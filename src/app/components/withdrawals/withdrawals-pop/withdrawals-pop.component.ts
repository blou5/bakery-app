import {Component, Inject, inject, OnInit, signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddHolidayDialog} from '../../../shared/components/add-holiday-dialog/add-holiday-dialog';
import {NumericOnlyDirective} from '../../../shared/directives/numeric-only-directive';
import {WithdrawCreateModel} from '../../../models/create/withdraw-create.model';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {WithdrawService} from '../../../services/withdraw.service';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {UtcDateAdapter} from '../../../shared/directives/utc-date-adapter';

@Component({
  selector: 'app-withdrawals-pop',
  imports: [
    MatCard,
    MatFormField,
    FormsModule,
    MatSelect,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatInput,
    MatButton,
    MatSelect,
    MatSelect,
    NgForOf,
    MatOption,
    MatLabel,
    MatSuffix,
    NumericOnlyDirective
  ],
  templateUrl: './withdrawals-pop.component.html',
  standalone: true,
  styleUrl: './withdrawals-pop.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]

})
export class WithdrawalsPop implements OnInit{
  date = new Date();
  amount = signal<number>(0);
  reason = signal<string>('');
  reasons = ['Purchase', 'Refund', 'Salary', 'Misc'];
  newReason: string = ''
  private dialog = inject(MatDialog);
  person: string = '';
  notes: string = '';
  withdrawCreateModel ?: WithdrawCreateModel;
  logIdNumber: number=0;
  private readonly withdrawService = inject(WithdrawService);
  private readonly dailyCashLogsService = inject(DailyCashLogsService);
  protected snackBar = inject(MatSnackBar);
  constructor(private dialogRef: MatDialogRef<WithdrawalsPop>,
              @Inject(MAT_DIALOG_DATA) public data: { log: DailyCashLogInterface }) {
  }

  openAddHolidayDialog() {
    const dialogRef = this.dialog.open(AddHolidayDialog,
      {
        data: {
          title: 'Create Holiday Name',
          nameLabel: 'Holiday Name'
        }
      });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result?.trim()) {
        if (result != null) {
          this.reasons.push(result);
        }

        this.reason.set(result);

      }
    });
  }

  onSelectReason(value: string) {
    if (value === '__add_new__') {
      this.openAddHolidayDialog();
    } else {
      this.reason.set(value);
    }
  }

  submit() {

    this.withdrawCreateModel = {
      amount: this.amount(),
      notes: this.notes,
      person: this.person,
      reason: this.reason(),
      log: this.logIdNumber,
      date: this.date
    }
    console.log(this.withdrawCreateModel)
    this.withdrawService.add(this.withdrawCreateModel).subscribe({
      next: value => {
        this.dialogRef.close(value)
      },
      error: err => console.error(err)
    })

  }

  protected onDateChange(date: Date) {
    // Fetch the log for the chosen day

    this.dailyCashLogsService.getSelectedDate(date).subscribe({
      next: (value:DailyCashLogInterface) => {
        this.logIdNumber = value.logId
        console.log(this.logIdNumber)
      },
      error: err => {
        console.error(err);
        this.snackBar.open('No log for selected date.', 'Close', {
          duration: 1200, panelClass: ['snackbar-error']
        });
      },

    });
  }

  ngOnInit(): void {

    this.onDateChange(this.date);
  }


}
