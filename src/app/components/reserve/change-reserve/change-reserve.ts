import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {ChangeReserveService} from '../../../services/change-reserve.service';
import {MatToolbar} from '@angular/material/toolbar';
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
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {AddCoinDialog} from '../add-coin-dialog/add-coin-dialog';
import {ChangeReserveLogInterface} from '../../../models/change-reserve.modle';
import {ChangeReserveResponseModel} from '../../../models/change-reserve-response.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';


interface CoinReserve {
  denomination: number; // e.g. 0.10
  quantity: number;
  status: 'Full' | 'Pending';
  date: string; // e.g. 'Jul 25, 2025'
}

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
    NgForOf,
    CurrencyPipe,
    MatToolbar,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatTable,
    MatChip,
    DatePipe,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    DecimalPipe,
    MatPaginator
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
export class ChangeReserve implements OnInit {

  denominations: ChangeReserveResponseModel[] = [];

  private readonly cdRef = inject(ChangeDetectorRef);
  changeReserveLogs: ChangeReserveLogInterface[] = [];
  displayedColumns = ['reserveLogId', 'denomination', 'quantity', 'status', 'createdAt', 'reserveType', 'statusChangedAt', 'actions'];
  dialog = inject(MatDialog);
  private readonly changeReserveService = inject(ChangeReserveService);

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  delete(index: number) {

    this.changeReserveService.delete(index).subscribe({
      next: value => {
        console.log(index)
        this.changeReserveLogs = this.changeReserveLogs.filter(p => p.reserveLogId !== index);
        this.cdRef.markForCheck();
      }
    })
  }


  get pendingTotal(): number {

    return this.denominations
      .reduce((sum, c) => sum + c.denomination * c.quantity, 0);
  }

  openAddCoinDialog() {
    const dialogRef = this.dialog.open(AddCoinDialog, {
      width: 'auto',
      height: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ChangeReserveLogInterface) => {
      if (result) {
        this.changeReserveLogs = [...this.changeReserveLogs, result]
        console.log(this.changeReserveLogs)
        this.cdRef.detectChanges()
      }
    })
  };

  ngOnInit(): void {
    // this.changeReserveService.getAll().subscribe({
    //   next: value => {
    //     this.changeReserveLogs = value;
    //     this.cdRef.detectChanges();
    //   },
    //   error: err => console.error(err)
    //
    // });
    this.loadData()
    this.changeReserveService.getPending().subscribe({
      next: value => {
        this.denominations = value;
      },
      error: err => console.error(err)
    })
  }

  loadData() {
    this.changeReserveService.getAll(this.pageIndex, this.pageSize).subscribe({
      next :value => {
        this.changeReserveLogs = value.content;   // Page<CashLog> content
        this.totalItems = value.totalElements
      },
      error : err => console.error(err)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

}
