import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
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
import {MatIcon} from '@angular/material/icon';
import {ProductService} from '../../../services/product-service';
import {Product} from '../../../models/product.model';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  imports: [
    MatDialogContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatFormField,
    FormsModule,
    MatInput,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatIconButton,
    MatDialogTitle,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    NgIf

  ],
  templateUrl: './product-list.html',
  standalone: true,
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit, AfterViewInit {
  products!: Product[];
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly productService = inject(ProductService);
  snackBar = inject(MatSnackBar);
  editIndex: number | null = null;

  protected product!: Product;

  constructor(
    private dialogRef: MatDialogRef<ProductList>
  ) {

  }

  startEdit(i: number, row: any) {
    this.editIndex = i;

    this.product = {
      productId: row.productId,
      productName: row.productName,
      sellingPrice: row.sellingPrice
    }

    console.log(this.product)
  }

  saveEdit(index: number): void {
    if (!this.product) return;

    this.productService.update(this.product).subscribe({
      next: (updatedProduct) => {
        if (this.products && this.products.length > index) {
          this.products[index] = { ...updatedProduct }; // update product directly
          this.products = [...this.products]; // trigger change detection
        }

        this.cdRef.detectChanges();

        this.snackBar.dismiss();
        this.snackBar.open('Update successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        this.cancelEdit();
      },
      error: (err) => {
        console.error('Update error:', JSON.stringify(err));
        this.snackBar.dismiss();
        this.snackBar.open('Update failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  cancelEdit() {
    this.editIndex = null;
    this.product = {productId: 0, productName: "", sellingPrice: 0};
  }

  delete(index: number, row: any): void {
    if (!this.products) return;

    this.productService.delete(row.productId).subscribe({
      next: () => {
        this.products.splice(index, 1);
        this.products = [...this.products]; // trigger change detection
        this.cdRef.detectChanges();

        this.snackBar.dismiss();
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: err => {
        console.error('Delete error:', JSON.stringify(err));
        this.snackBar.dismiss();
        this.snackBar.open('Delete failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }


  ngOnInit(): void {
    this.productService.getAll().subscribe(
      {
        next: value => {
          setTimeout(() => {
            this.products = value;
            this.cdRef.detectChanges(); // force update
          });
        },
        error: err => console.error(err)
      })

  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();

  }


}
