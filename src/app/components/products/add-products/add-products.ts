import {Component, inject, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ProductionService} from '../../../services/production.service';
import {ProductService} from '../../../services/product-service';
import {Product} from '../../../models/product.model';
import {ProductCreateInterface} from '../../../models/create/product-create';

@Component({
  selector: 'app-add-products',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-products.html',
  standalone: true,
  styleUrl: './add-products.css'
})
export class AddProducts {
  productName = '';
  productPrice: number  = 0;
  product ?:ProductCreateInterface;
  private readonly productService = inject(ProductService);

  constructor(
    public dialogRef: MatDialogRef<AddProducts>,
  ) {}

  save() {
    this.product = {
      productName: this.productName,
      sellingPrice: this.productPrice
    }

    this.productService.add(this.product).subscribe({
      next: value => {
        console.log(value);
      }
    })

    // this.productService.add()
    this.dialogRef.close({
      name: this.productName,
      quantity: 0,
      price: this.productPrice,
      date: new Date()
    });
  }

}
