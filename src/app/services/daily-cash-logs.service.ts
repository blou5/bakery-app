import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DailyCashLogInterface} from '../models/daily-cash-log.model';
import {DailyCashLogCreateInterface} from '../models/create/daily-cash-log-create';
import {environment} from '../../environments/environment';

@Injectable(
  {
  providedIn: 'root',
})
export class DailyCashLogsService {
  private readonly base = environment.apiBase;

  private readonly apiUrl = `${this.base}/api/daily-cash`; // Proxy path

  constructor(private http: HttpClient) {}

  getAll(): Observable<DailyCashLogInterface[]> {
    return this.http.get<DailyCashLogInterface[]>(`${this.apiUrl}/find`);
  }

  getById(id: number): Observable<DailyCashLogInterface> {
    return this.http.get<DailyCashLogInterface>(`${this.apiUrl}/${id}`);
  }

  create(product: DailyCashLogCreateInterface): Observable<DailyCashLogCreateInterface> {
    return this.http.post<DailyCashLogCreateInterface>(`${this.apiUrl}/add`, product);
  }

  update(cashLog: DailyCashLogInterface): Observable<DailyCashLogInterface> {
    return this.http.put<DailyCashLogInterface>(`${this.apiUrl}/${cashLog.logId}`, cashLog);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLastCashLog(): Observable<DailyCashLogInterface>{
    const dateOnly = new Date().toISOString().split('T')[0];
      console.log(dateOnly)
    return this.http.get<DailyCashLogInterface>(`${this.apiUrl}/findLast/`+dateOnly);
  }

  getSelectedDate(date:Date): Observable<DailyCashLogInterface>{
    const dateOnly = date.toISOString().split('T')[0];
    console.log(dateOnly)
    return this.http.get<DailyCashLogInterface>(`${this.apiUrl}/findLast/`+dateOnly);
  }

  getEstimatedMoney(id:number):Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/getEstimatedMoney/${id}`);
  }
}
