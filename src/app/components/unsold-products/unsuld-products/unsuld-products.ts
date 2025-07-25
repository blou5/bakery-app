import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {AddLeftOver} from '../add-left-over/add-left-over';
import {UnsoldProductService} from '../../../services/unsold-product.service';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {UnsoldProductInterface} from '../../../models/unsold-product.model';
import {UnsoldProductUpdateInterface} from '../../../models/update/unsold-product-update.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-unsuld-products',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './unsuld-products.html',
  standalone: true,
  styleUrl: './unsuld-products.css',
})
export class UnsuldProducts implements OnInit ,AfterViewInit{

  private readonly unsoldProductService = inject(UnsoldProductService);
  private readonly dailyCashLogsService = inject(DailyCashLogsService);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly snackBar = inject(MatSnackBar);

  private dailyCashObject?: DailyCashLogInterface;
  protected unsoldProduct: UnsoldProductInterface[] = [];
  protected unsoldUpdateProduct!:UnsoldProductUpdateInterface;
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.unsoldProductService.getAll().subscribe({
      next: value => {

        this.unsoldProduct = value;
        this.cdRef.markForCheck();
        },
      error: err => console.log(err)
    })

    this.dailyCashLogsService.getLastCashLog().subscribe({
      next: (response) => {
        this.dailyCashObject = response;
      },
      error: (err) => console.error('Error saving log:', err)
    })
  }

  editingIndex: number | null = null;


  startEdit(index: number,row:any) {
    this.editingIndex = index;
    this.unsoldUpdateProduct={
      unsoldId:row.unsoldId,
      quantityUnsold:row.quantityUnsold,
    }

  }

  saveEdit(index: number) {
    if (!this.unsoldUpdateProduct) return;

    this.unsoldProductService.update(this.unsoldUpdateProduct.unsoldId, this.unsoldUpdateProduct).subscribe({
      next: (updatedUnsoldProduction) => {
        const updated = [...this.unsoldProduct];
        updated[index] = updatedUnsoldProduction;
        this.unsoldProduct = updated;
        this.cdRef.markForCheck();
        this.snackBar.open('Update successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

      },
      error: (err) => {
        console.error('Update failed:', err);
        this.snackBar.open('Update failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  delete(item: any) {
    this.unsoldProductService.delete(item.unsoldId).subscribe({
      next: () => {
        this.unsoldProduct = this.unsoldProduct.filter(p => p.unsoldId !== item.unsoldId);
        this.cdRef.detectChanges();

      },
      error: err => console.error(err)
    })
  }


  addLeftover() {
    const dialogRef = this.dialog.open(AddLeftOver, {
      width: '320px',
      data: {
        logId: this.dailyCashObject?.logId
      }
    });

    dialogRef.afterClosed().subscribe((result:UnsoldProductInterface) => {
      if (result) {
        Promise.resolve().then(() => {
          this.unsoldProduct = [...this.unsoldProduct, result];
          this.cdRef.markForCheck();
        });

      }
    });

  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges()
  }

}
