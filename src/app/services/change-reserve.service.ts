import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DailyCashLogInterface} from '../models/daily-cash-log.model';
import {Observable} from 'rxjs';
import {ChangeReserveLogInterface} from '../models/change-reserve.model';

@Injectable(
  {
    providedIn: 'root',
  })
export class ChangeReserveService {

  private readonly apiUrl = 'http://localhost:8080/api/reserves'; // Proxy path

  constructor(private http: HttpClient) {}
  create(product: ChangeReserveLogInterface): Observable<ChangeReserveLogInterface> {
    return this.http.post<ChangeReserveLogInterface>(`${this.apiUrl}/create`, product);
  }

}
