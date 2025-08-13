import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {AddProducts} from '../add-products/add-products';
import {AddProduction} from '../add-production/add-production';
import {ProductList} from '../product-list/product-list';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatPaginator} from '@angular/material/paginator';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DailyCashLogsService} from '../../../services/daily-cash-logs.service';
import {ProductionService} from '../../../services/production.service';
import {ProductionInterface} from '../../../models/production-model';
import {DailyCashLogInterface} from '../../../models/daily-cash-log.model';
import {ProductService} from '../../../services/product-service';
import {Product} from '../../../models/product.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductionUpdateModel} from '../../../models/update/production-update.model';

@Component({
  selector: 'app-production',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  templateUrl: './production.html',
  standalone: true,
  styleUrl: './production.css',
  providers: [
    provideNativeDateAdapter(), // ✅ fix here
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    },
  ],
})
export class Production implements OnInit, AfterViewInit {
  products: ProductionInterface[] = [];
  product !: Product[];
  production!: ProductionUpdateModel;
  private readonly productionService = inject(ProductionService);
  private readonly dailyCashLogsService = inject(DailyCashLogsService);
  private dailyCashObject?: DailyCashLogInterface;

  private cdRef = inject(ChangeDetectorRef);
  private readonly productService = inject(ProductService);
  editIndex: number | null = null;
  snackBar = inject(MatSnackBar);
  filterDate: Date | null = null;

  constructor(private dialog: MatDialog) {
    this.filteredProducts.paginator = this.paginator;

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredProducts = new MatTableDataSource(this.products);

  ngOnInit(): void {
    this.loadProduct();
    this.dailyCashLogsService.getLastCashLog().subscribe({
      next: (response) => {
        console.log('Saved:', response)
        this.dailyCashObject = response;
      },
      error: (err) => console.error('Error saving log:', err)
    })
    this.applyDateFilter(null);

  }
  clearFilterDate() {
    this.filterDate = null;
    this.applyDateFilter(null);
  }

  applyDateFilter(selectedDate: Date | null) {
    if (!selectedDate ) {
      this.filteredProducts.data = this.products;
      return;
    }

    const selectedDateOnly = new Date(selectedDate).setHours(0, 0, 0, 0);
    this.filteredProducts.data = this.products.filter(p => {
      const productDate = new Date(p.productionDate).setHours(0, 0, 0, 0);
      return productDate === selectedDateOnly;
    });

  }

  loadProduct() {
    return this.productionService.getAll().subscribe({
      next: data => {
        this.products = data;
        this.cdRef.detectChanges()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProducts, {
      width: '70vw',
      height: '70vh'
    });

  }

  addProduction() {
    const dialogRef = this.dialog.open(AddProduction, {
      width: '80vw',
      data: {
        logObject: this.dailyCashObject?.logId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products = [...this.products, result];

        Promise.resolve().then(() => {
          this.cdRef.markForCheck();
        });
      }
    });

  }

  startEdit(index: number, row: any): void {
    this.editIndex = index;
    this.production = {
      productionId: row.productionId,
      quantityProduced: row.quantityProduced,
      logId: row.logId,
      productId: row.productId
    }
    console.log(row.productId)
    console.log(this.production)

  }

  saveEdit(index: number): void {
    if (!this.production) return;

    this.productionService.update(this.production.productionId, this.production).subscribe({
      next: (updatedProduction) => {
        // Create a new array reference to force re-render
        const updated = [...this.products];
        updated[index] = updatedProduction;
        this.products = updated;

        // Force change detection
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
    this.editIndex = null;


  }


  cancelEdit() {
    this.editIndex = null;
  }

  delete(index: number, item: any) {
    this.productionService.delete(item.productionId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productionId !== item.productionId);
        this.cdRef.detectChanges();

      },
      error: err => console.error(err)
    })

  }

  seeProducts() {
    this.dialog.open(ProductList, {
      width: '90%',
      maxWidth: '600px',
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges()
  }

}
