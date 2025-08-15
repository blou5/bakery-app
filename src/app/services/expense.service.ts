import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {ExpenseHeaderUpdate} from '../models/update/expense-header-update';

@Injectable(
  {
    providedIn: 'root',
  })
export class ExpenseService {

  private readonly apiUrl = 'http://178.18.249.39:8080/api/expenses'; // Proxy path

  constructor(private http: HttpClient) {}

  getAll(): Observable<ExpenseHeaderInterface[]> {
    return this.http.get<ExpenseHeaderInterface[]>(`${this.apiUrl}/findAll`);
  }

  getById(id: number): Observable<ExpenseHeaderInterface> {
    return this.http.get<ExpenseHeaderInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: ExpenseHeaderInterface): Observable<ExpenseHeaderInterface> {
    return this.http.post<ExpenseHeaderInterface>(`${this.apiUrl}/add`, header);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(update: ExpenseHeaderUpdate | undefined): Observable<ExpenseHeaderUpdate>{
    return this.http.put<ExpenseHeaderInterface>(`${this.apiUrl}/update`, update);
  }

}
