import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EpensceCell} from '../epensce-cell/epensce-cell';
import {ExpenseService} from '../../../services/expense.service';
import {ExpenseHeaderInterface} from '../../../models/create/expense-header.model';
import {NumericOnlyDirective} from '../../../shared/directives/numeric-only-directive';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {MatIcon} from '@angular/material/icon';
import {ExpenseHeaderUpdate} from '../../../models/update/expense-header-update';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenses',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    NumericOnlyDirective,
    MatIcon,
  ],
  templateUrl: './expenses.html',
  standalone: true,
  styleUrl: './expenses.css'
})
export class Expenses implements OnInit {
  showForm = signal(false);
  snackBar = inject(MatSnackBar);
  openCell:boolean =false;

  constructor(private dialog: MatDialog) {
  }

  expenses = signal<any[]>([]);
  totalPrice = signal(0);
  expenseType = signal('');
  notes = signal('');
  date = signal<Date | null>(null);

  expenseTypes = ['Supplies', 'Maintenance', 'Transport', 'Other'];
  displayedColumns = ['date', 'type', 'price', 'notes', 'actions'];

  editingIndex: number | null = null;
  private readonly expenseService = inject(ExpenseService);
  private readonly dailyCashLogsService = inject(DailyCashLogsService);
  private dailyCashObject ?: DailyCashLogInterface;
  protected cacheUpdate?: ExpenseHeaderUpdate;


  loadExpenses() {
    this.expenseService.getAll().subscribe({
      next: (data) => this.expenses.set(data),
      error: (err) => console.error('Failed to load expenses', err)
    });
  }

  ngOnInit(): void {
    this.loadExpenses();

    this.dailyCashLogsService.getLastCashLog().subscribe({
      next: (response) => {
        console.log('Saved:', response)
        this.dailyCashObject = response;
      },
      error: (err) => console.error('Error saving log:', err)
    })
  }

  addExpense() {

    const formattedDate = this.date()?.toISOString().split('T')[0];
    console.log(formattedDate)
    const payload: ExpenseHeaderInterface = {
      logId: this.dailyCashObject?.logId,
      expenseId: -1,
      totalPrice: this.totalPrice(),
      expenseType: this.expenseType(),
      notes: this.notes(),
      expenseDate: formattedDate,
      expenseHeaders: []
    }
    console.log(JSON.stringify(payload))
    this.expenseService.add(payload).subscribe({
      next: (response) => {
        console.log('Saved:', response)
        this.loadExpenses()

      },
      error: (err) => console.error('Error saving log:', err)
    });
    this.totalPrice.set(0);
    this.expenseType.set('');
    this.notes.set('');
    this.date.set(null);
    this.showForm.set(false);
  }

  toggleForm() {
    this.showForm.update(v => !v);
  }

  openEditDialog(expense: ExpenseHeaderInterface) {
    if (this.openCell){
      return;
    }
    // future: open a dialog or inline form to edit specific expense
    this.expenseService.getById(expense.expenseId).subscribe({
      next: (data) => {
        console.log(data.expenseHeaders)
      },
      error: (err) => {
        console.error('Failed to load expenses', err);
      }
    })
    this.dialog.open(EpensceCell, {
      width: '100vw',
      maxWidth: '100vw',
      height: '80vh',
      data: {
        items: expense
      }
    });

  }


  saveEdit(i: number) {
    this.expenseService.update(this.cacheUpdate).subscribe({
      next: update => this.expenses.update(expenseList => {
        const updated = [...expenseList];
        updated[i] = update
        return updated;
      })
    })

    this.cancelEdit();
  }

  cancelEdit() {
    this.editingIndex = null;
    this.openCell=false;
  }

  editRow(i: number, element: ExpenseHeaderInterface) {
    this.openCell=true
    this.editingIndex = i;
    const formattedDate = element.expenseDate;
    this.cacheUpdate = {
      expenseId: element.expenseId,
      expenseDate: formattedDate,
      expenseType: element.expenseType,
      totalPrice: element.totalPrice,
      notes: element.notes
    }
  }

  deleteRow(i: ExpenseHeaderInterface) {
    console.log(i.expenseId)
    this.expenseService.delete(i.expenseId).subscribe({
      next: () => {

        this.snackBar.open('Expense deleted successfully', 'Close', {duration: 3000});
        this.loadExpenses()

      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error deleting expense', 'Close', {duration: 3000});
      }
    });
  }
}
