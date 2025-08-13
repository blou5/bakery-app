import {ChangeDetectorRef, Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product-service';
import {ProductionCreateInterface} from '../../../models/create/production-create.model';
import {ProductionService} from '../../../services/production.service';
import {ProductionInterface} from '../../../models/production-model';

@Component({
  selector: 'app-add-production',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './add-production.html',
  standalone: true,
  styleUrl: './add-production.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class AddProduction implements OnInit {
  products!: Product[];
  productId = 0;
  quantity: number = 0;
  date: Date = new Date();
  private readonly productService = inject(ProductService);
  private readonly productionService = inject(ProductionService);
  production!: ProductionCreateInterface;
  createdProduction!: ProductionInterface;
  private cdRef = inject(ChangeDetectorRef);

  constructor(
    private dialogRef: MatDialogRef<AddProduction>,
    @Inject(MAT_DIALOG_DATA) public data: { logObject: number },
  ) {
  }


  ngOnInit(): void {
    this.productService.getAll().subscribe(
      {
        next: value => {
          setTimeout(() => {
            this.products = value;
            this.cdRef.detectChanges();
          });
        },
        error: err => console.error(err)
      })
  }

  save() {
    this.production = {
      productId: this.productId,
      logId: this.data.logObject,
      quantityProduced: this.quantity,
      productionDate: this.date
    }
    this.productionService.add(this.production).subscribe({
      next: (value: ProductionInterface) => {
        this.createdProduction = value;
        this.dialogRef.close(this.createdProduction)
      },
      error: err => console.error(err)
    })
  }

}
