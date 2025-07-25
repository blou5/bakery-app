import {Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-holiday-dialog',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './add-holiday-dialog.html',
  standalone: true,
  styleUrl: './add-holiday-dialog.css'
})
export class AddHolidayDialog {
  holidayName = '';

  constructor(private dialogRef: MatDialogRef<AddHolidayDialog>,@Inject(MAT_DIALOG_DATA) public data: { title: string; nameLabel: string}) {}

  save() {
    this.dialogRef.close(this.holidayName);
  }
}
