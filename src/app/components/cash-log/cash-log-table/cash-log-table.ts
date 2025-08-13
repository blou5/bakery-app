import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
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
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DailyCashLog} from '../daily-cash-log/daily-cash-log';
import {MatButton, MatIconButton} from '@angular/material/button';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {MatIcon} from '@angular/material/icon';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';

@Component({
  selector: 'app-cash-log-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    DatePipe,
    MatHeaderCellDef,
    DecimalPipe,
    MatCellDef,
    NgClass,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './cash-log-table.html',
  standalone: true,
  styleUrl: './cash-log-table.css'
})
export class CashLogTable {
  @Input() logs: DailyCashLogInterface[] = [];
  private readonly dailyCashService = inject(DailyCashLogsService);
  private cdRef = inject(ChangeDetectorRef);

  constructor(private dialog: MatDialog) {
  }

  getStatus(log: DailyCashLogInterface): { label: string, color: string } {
    const status = (log.status ?? '').toString().toLowerCase();

    if (!status || status === 'not_completed') {
      return {label: 'Not Completed', color: 'not-completed'};
    }
    if (status === 'equal') {
      return {label: 'Equal', color: 'equal'};
    }
    if (status === 'more') {
      return {label: 'More', color: 'more'};
    }
    if (status === 'less') {
      return {label: 'Less', color: 'less'};
    }
    // fallback (if any other value)
    return {label: status.charAt(0).toUpperCase() + status.slice(1), color: 'not-completed'};
  }

  openCashLogDialog(row: DailyCashLogInterface) {
    const dialogRef = this.dialog.open(DailyCashLog, {
      width: 'auto',
      height: '70%',
      data: {log: row}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idx = this.logs.findIndex(l => l.logId === result.logId);
        if (idx !== -1) {
          // Replace the row with the updated row
          this.logs[idx] = result;
          // If you want to trigger Angular to rerender
          this.logs = [...this.logs]; // trigger reference change
          this.cdRef.markForCheck();
        }
      }
    });

  }

  showCalculation(row: any) {

  }

  deleteLog(index: number, log: DailyCashLogInterface) {
    this.dailyCashService.delete(log.logId).subscribe({
      next: value => {
        console.log('succes')
        this.logs = this.logs.filter(p => p.logId !== log.logId);
        this.cdRef.markForCheck()
      },
      error: err => console.error(err)
    })
  }
}
