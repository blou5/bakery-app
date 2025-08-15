import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {ExpenseHeaderUpdate} from '../models/update/expense-header-update';
import {ProductionInterface} from '../models/production-model';
import {ProductionCreateInterface} from '../models/create/production-create.model';
import {ProductionUpdateModel} from '../models/update/production-update.model';

@Injectable(
  {
    providedIn: 'root',
  })
export class ProductionService {

  private readonly apiUrl = 'http://178.18.249.39:8080/api/production'; // Proxy path

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductionInterface[]> {
    return this.http.get<ProductionInterface[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<ExpenseHeaderInterface> {
    return this.http.get<ExpenseHeaderInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: ProductionCreateInterface): Observable<ProductionInterface> {
    return this.http.post<ProductionInterface>(`${this.apiUrl}/add`, header);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id:number ,update: ProductionUpdateModel | undefined): Observable<ProductionInterface>{
      return this.http.put<ProductionInterface>(`${this.apiUrl}/update/${id}`, update);
  }

}
