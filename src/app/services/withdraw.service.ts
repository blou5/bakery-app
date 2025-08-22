import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseHeaderInterface} from '../models/create/expense-header.model';
import {WithdrawModel} from '../models/withdraw.model';
import {WithdrawCreateModel} from '../models/create/withdraw-create.model';
import {WithdrawalsUpdateModel} from '../models/update/withdrawals-update.model';
import {environment} from '../../environments/environment';
import {DailyCashLogInterface} from '../models/daily-cash-log.model';

@Injectable(
  {
    providedIn: 'root',
  })
export class WithdrawService {
  private readonly base = environment.apiBase;

  private readonly apiUrl = `${this.base}/api/withdrawals`; // Proxy path

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

  getFilteredWithdraws(date:string): Observable<WithdrawModel[]>{

    return this.http.get<WithdrawModel[]>(`${this.apiUrl}/filteredWithdrawals/`+date);
  }

}
