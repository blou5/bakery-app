import {AfterViewInit, ChangeDetectorRef, Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ExpenseItemInterface} from '../../../models/create/expense-item.model';
import {ExpenseItemsService} from '../../../services/expense-items.service';
import {ExpenseHeaderInterface} from '../../../models/create/expense-header.model';
import {MatIcon} from '@angular/material/icon';
import {ExpenseUpdateItemInterface} from '../../../models/update/expense-update-item-model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-epensce-cell',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './epensce-cell.html',
  standalone: true,
  styleUrl: './epensce-cell.css'
})
export class EpensceCell implements AfterViewInit {

  /// todo Krijo update and delete of the methods in backend and refactor
  columns = ['itemName', 'quantity', 'unit', 'unitPrice', 'totalPrice', 'actions'];
  editIndex: number | null = null;
  editCache?: ExpenseUpdateItemInterface;
  itemName = '';
  quantity: number | null = null;
  unit = 0;
  unitPrice: number | null = null;
  private readonly expenseItemService = inject(ExpenseItemsService);
  snackBar = inject(MatSnackBar);
  private cdRef = inject(ChangeDetectorRef);

  addItem() {
    if (
      this.itemName &&
      this.quantity !== null &&
      this.unit &&
      this.unitPrice !== null
    ) {
      const newItem: ExpenseItemInterface = {
        expenseHeader: this.data.items.expenseId,
        itemName: this.itemName,
        quantity: this.quantity,
        unit: this.unit,
        unitPrice: this.unitPrice,
        totalPrice: this.quantity * this.unitPrice,
        itemId: 0
      };

      this.expenseItemService.add(newItem).subscribe({
        next: (response) => {
          this.data.items.expenseHeaders = [...this.data.items.expenseHeaders, response];
            this.cdRef.detectChanges();
        },
        error: (err) => console.error('Error saving log:', err)
      });
      this.itemName = '';
      this.quantity = null;
      this.unit = 0;
      this.unitPrice = null;
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { items: ExpenseHeaderInterface },

  ) {

  }

  startEdit(index: number, item: any) {
    this.editIndex = index;

    this.editCache = {
      unit: item.unit,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      expenseHeader: this.data.items.expenseId,
      quantity: item.quantity,
      itemName: item.itemName,
      itemId: item.itemId
    };

  }

  cancelEdit() {
    this.editIndex = null;
    this.editCache = {itemId: 0, expenseHeader: 0, itemName: '', quantity: 0, totalPrice: 0, unit: 0, unitPrice: 0};
  }

  saveEdit(index: number) {
    const updated = [...this.data.items.expenseHeaders];
    updated[index] = <ExpenseItemInterface>{ ...this.editCache };

    if (this.editCache) {
      this.expenseItemService.update(this.editCache).subscribe({
        next: () => {
          this.data.items.expenseHeaders = updated;
          this.cdRef.detectChanges();

          this.snackBar.dismiss();
          this.snackBar.open('Update successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          this.cancelEdit();
        },
        error: err => {
          console.error(JSON.stringify(err));
          this.snackBar.dismiss();
          this.snackBar.open('Update failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }


  deleteRow(index: number, item: any) {


    this.expenseItemService.delete(item.itemId).subscribe({
        next: value => {
          this.data.items.expenseHeaders = this.data.items.expenseHeaders
            .filter(value1 => value1.itemId !== item.itemId);
          // updated.splice(index, 1);
          this.cdRef.detectChanges();

          // Show success message
          this.snackBar.dismiss();
          this.snackBar.open('Update successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });


        },
        error: err => {
          console.error(JSON.stringify(err));
          this.snackBar.dismiss();
          this.snackBar.open('Update failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      }
    )

  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
