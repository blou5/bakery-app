import {ChangeDetectorRef, Component, Inject, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product-service';
import {UnsoldProductService} from '../../../services/unsold-product.service';
import {UnsoldProductCreateInterface} from '../../../models/create/unsold-product-create.model';
import {UnsoldProductInterface} from '../../../models/unsold-product.model';

@Component({
  selector: 'app-add-left-over',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './add-left-over.html',
  standalone: true,
  styleUrl: './add-left-over.css'
})
export class AddLeftOver implements OnInit {
  product = '';
  quantity: number  = 0;
  date: Date | null = null;
  protected productId!:number;
  protected unsoldProduct!:UnsoldProductCreateInterface;
  protected unsoldSavedProduct!:UnsoldProductInterface;


  protected products!: Product[];
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly productService = inject(ProductService);
  private readonly unsoldProductService = inject(UnsoldProductService);

  constructor(private dialogRef: MatDialogRef<AddLeftOver>,
              @Inject(MAT_DIALOG_DATA) public data: { logId: number }
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
    console.log(this.data.logId)

  }

  save() {
    this.unsoldProduct ={
      productId:this.productId,
      logId:this.data.logId,
      quantityUnsold: this.quantity,
      unitCost:0,

    }
    console.log(this.unsoldProduct)
    // this.unsoldProductService.add()
    this.unsoldProductService.add(this.unsoldProduct).subscribe({
      next: value => {
        this.unsoldSavedProduct = value;
        this.dialogRef.close(this.unsoldSavedProduct);
      },
      error: err => console.error(err)
    })



  }


}
