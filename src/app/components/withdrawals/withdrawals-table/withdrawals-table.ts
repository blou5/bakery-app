import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {WithdrawalsPop} from '../withdrawals-pop/withdrawals-pop.component';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {WithdrawModel} from '../../../models/withdraw.model';
import {WithdrawService} from '../../../services/withdraw.service';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';

import {FormsModule} from '@angular/forms';
import {WithdrawalsUpdateModel} from '../../../models/update/withdrawals-update.model';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-withdrawals-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    DatePipe,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    DecimalPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatIcon,
    MatIconButton,
    MatFormField,
    FormsModule,
    MatInput,
    NgIf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix
  ],
  templateUrl: './withdrawals-table.html',
  standalone: true,
  styleUrl: './withdrawals-table.css'
})
export class WithdrawalsTable implements OnInit {

  withdrawals: WithdrawModel[] = [];
  protected dailyCashObject ?: DailyCashLogInterface;
  private readonly dailyCashLogsService = inject(DailyCashLogsService);
  private readonly withdrawService = inject(WithdrawService);
  private readonly cdRef = inject(ChangeDetectorRef);
  editRow!: WithdrawalsUpdateModel;
  editIndex: any;


  withdrawal: WithdrawModel[] = [];           // your full list (already used)
  filteredWithdrawals: WithdrawModel[] = [];   // what the table shows
  filterDate: Date | null = null;

  constructor(private dialog: MatDialog) {
  }

  private refreshViewData(): void {

    this.filterDate
      ? this.filterByDate(this.filterDate)
      : this.loadDate();
  }

  applyDateFilter(date: Date | null): void {
    // keep the picked date (or null)
    this.filterDate = date;
    this.refreshViewData();
  }

  clearDateFilter(): void {
    this.filterDate = null;
    this.refreshViewData();
  }


  private filterByDate(date: Date) {
    // compare by calendar day    const dateOnly = new Date().toISOString().split('T')[0];
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
    this.withdrawService.getFilteredWithdraws(target).subscribe({
      next:value => {
        this.withdrawals= value;
        this.cdRef.markForCheck()
      },
      error: err => console.error(err)
    })
   ;
  }

  openWithdrawalDialog() {
    const dialogRef = this.dialog.open(WithdrawalsPop, {
      width: '80%',
      data: {
        log: this.dailyCashObject
      } // Pass any initial data here if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.withdrawals = [...this.withdrawals, result];
        this.cdRef.markForCheck()
      }
    });
  }


  delete(id: number, row: any) {
    this.withdrawService.delete(row.withdrawalId).subscribe({
      next: value => {
        this.withdrawals = this.withdrawals.filter(value1 => value1.withdrawalId !== row.withdrawalId);
        this.cdRef.markForCheck();
      },
      error: err => console.error(err)
    })

  }


  ngOnInit(): void {
    this.loadDate()
    this.dailyCashLogsService.getLastCashLog().subscribe({
      next: (response) => {

        this.dailyCashObject = response;
        console.log(this.dailyCashObject)
      },
      error: (err) => console.error('Error saving log:', err)
    })
    this.cdRef.markForCheck()
  }

  startEdit(i: number, row: any) {
    this.editIndex = i;
    this.editRow = row;
    this.editRow.logId = row.log.logId;


  }
  loadDate(){
    this.withdrawService.getAll().subscribe({
      next: value => {
        this.withdrawals = value;
        this.cdRef.markForCheck()
      }
    })
  }

  saveEdit() {

    this.withdrawService.update(this.editRow.withdrawalId, this.editRow).subscribe({
      next: value => {
        this.withdrawals.push(value)
        this.editIndex = null;
        this.cdRef.markForCheck()
      },
      error: err => console.error(err)
    })
  }

  cancelEdit() {
    this.editIndex = null;
    // this.editRow= null;
  }
}
