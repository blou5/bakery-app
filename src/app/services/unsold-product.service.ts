import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {ExpenseHeaderUpdate} from '../models/update/expense-header-update';
import {Injectable} from '@angular/core';

import {UnsoldProductInterface} from '../models/unsold-product.model';
import {UnsoldProductCreateInterface} from '../models/create/unsold-product-create.model';
import {UnsoldProductUpdateInterface} from '../models/update/unsold-product-update.model';

@Injectable(
  {
    providedIn: 'root',
  })
export class UnsoldProductService{


  private readonly apiUrl = 'http://178.18.249.39:8080/api/unsold-products'; // Proxy path

  constructor(private http: HttpClient) {}

  getAll(): Observable<UnsoldProductInterface[]> {
    return this.http.get<UnsoldProductInterface[]>(`${this.apiUrl}/findAll`);
  }

  getById(id: number): Observable<ExpenseHeaderInterface> {
    return this.http.get<ExpenseHeaderInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: UnsoldProductCreateInterface): Observable<UnsoldProductInterface> {
    return this.http.post<UnsoldProductInterface>(`${this.apiUrl}/add`, header);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(unsoldId :number,unsoldUpdateProduct: UnsoldProductUpdateInterface  ): Observable<UnsoldProductInterface>{
    return this.http.put<UnsoldProductInterface>(`${this.apiUrl}/update/${unsoldId}`, unsoldUpdateProduct);
  }

}
