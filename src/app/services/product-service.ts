import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseItemInterface} from '../models/create/expense-item.model';
import {Product, } from '../models/product.model';
import {ProductCreateInterface} from '../models/create/product-create';
import {Injectable} from '@angular/core';
@Injectable(
  {
    providedIn: 'root',
  })
export class ProductService{

  private readonly apiUrl = 'http://localhost:8080/api/product'; // Proxy path


  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/findAll`);
  }

  getById(id: number): Observable<ExpenseItemInterface> {
    return this.http.get<ExpenseItemInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: ProductCreateInterface): Observable<ProductCreateInterface> {
    return this.http.post<Product>(`${this.apiUrl}/add`, header);
  }

  update(update: Product) : Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/update`, update)
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
