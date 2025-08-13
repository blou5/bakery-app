import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DailyCashLog} from '../daily-cash-log/daily-cash-log';
import {CashLogTable} from '../cash-log-table/cash-log-table';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';

@Component({
  selector: 'app-cash-log',
  imports: [
    MatButton,
    CashLogTable
  ],
  templateUrl: './cash-log.html',
  standalone: true,
  styleUrl: './cash-log.css'
})
export class CashLog implements OnInit{
  private readonly dailyCashService = inject(DailyCashLogsService);
  dailDataRow: DailyCashLogInterface[]=[];
  private cdRef = inject(ChangeDetectorRef);
  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dailyCashService.getAll().subscribe({
      next:value => {
        this.dailDataRow=value ?? [];
        this.cdRef.detectChanges(); // Only if needed
      },
      error: err => console.error(err)
    })


  }


  openDialog() {
    const dialogRef = this.dialog.open(DailyCashLog, {
      width: '90%',
      height: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dailDataRow = [...this.dailDataRow, result];
          this.cdRef.detectChanges();
      }
    });
  }


}

