import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {ExpenseItemInterface} from '../models/create/expense-item.model';
import {ExpenseUpdateItemInterface} from '../models/update/expense-update-item-model';
import {environment} from '../../environments/environment';

@Injectable(
  {
    providedIn: 'root',
  })
export class ExpenseItemsService{
  private readonly base = environment.apiBase;
  private readonly apiUrl = `${this.base}/api/expenseItem`; // Proxy path


  constructor(private http: HttpClient) {}

  getAll(): Observable<ExpenseItemInterface[]> {
    return this.http.get<ExpenseItemInterface[]>(`${this.apiUrl}/findAll`);
  }

  getById(id: number): Observable<ExpenseItemInterface> {
    return this.http.get<ExpenseItemInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: ExpenseItemInterface): Observable<ExpenseItemInterface> {
    return this.http.post<ExpenseItemInterface>(`${this.apiUrl}/add`, header);
  }

  update(update: ExpenseItemInterface) : Observable<ExpenseItemInterface>{
    return this.http.put<ExpenseItemInterface>(`${this.apiUrl}/update`, update)
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
