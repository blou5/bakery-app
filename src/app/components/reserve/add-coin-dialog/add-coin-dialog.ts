import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {DecimalPipe, NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {ChangeReserveService} from '../../../services/change-reserve.service';
import {ChangeReserveLogCreateInterface} from '../../../models/create/change-reserve-create.model';
import {ChangeReserveLogInterface} from '../../../models/change-reserve.modle';

@Component({
  selector: 'app-add-coin-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDialogTitle,
    MatLabel,
    MatSelect,
    MatOption,
    DecimalPipe,
    MatInput,
    MatButton,
    NgForOf
  ],
  templateUrl: './add-coin-dialog.html',
  standalone: true,
  styleUrl: './add-coin-dialog.css'
})
export class AddCoinDialog {
  form: FormGroup;
  denominations = [5 ,10, 20, 50, 100,200];
  private reserveService = inject(ChangeReserveService);
  types = ['Addition', 'Subtraction'];
  private change ?: ChangeReserveLogCreateInterface;

  constructor(
    private dialogRef: MatDialogRef<AddCoinDialog>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      denomination: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      type: ['Addition', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      if (this.form.valid) {
        const {denomination, quantity, type} = this.form.value;
        this.change = {
          denomination: denomination,
          quantity: quantity,
          reserveType: type.toUpperCase(),
        }
        this.reserveService.create(this.change).subscribe({
          next: (value:ChangeReserveLogInterface) => {
            this.dialogRef.close(value);
          },
          error: err => console.error(err)
        })
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
