import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {ExpenseHeaderUpdate} from '../models/update/expense-header-update';
import {WithdrawModel} from '../models/withdraw.model';
import {WithdrawCreateModel} from '../models/create/withdraw-create.model';
import {WithdrawalsUpdateModel} from '../models/update/withdrawals-update.model';

@Injectable(
  {
    providedIn: 'root',
  })
export class WithdrawService {

  private readonly apiUrl = 'http://178.18.249.39:8080/api/withdrawals'; // Proxy path

  constructor(private http: HttpClient) {}

  getAll(): Observable<WithdrawModel[]> {
    return this.http.get<WithdrawModel[]>(`${this.apiUrl}/findAll`);
  }

  getById(id: number): Observable<ExpenseHeaderInterface> {
    return this.http.get<ExpenseHeaderInterface>(`${this.apiUrl}/${id}`);
  }

  add(header: WithdrawCreateModel): Observable<WithdrawModel> {
    return this.http.post<WithdrawModel>(`${this.apiUrl}/add`, header);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id:number,update: WithdrawalsUpdateModel ): Observable<WithdrawModel>{
    return this.http.put<WithdrawModel>(`${this.apiUrl}/${id}`, update);
  }

}
