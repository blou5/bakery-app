import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChangeReserveLogCreateInterface} from '../models/create/change-reserve-create.model';
import {ChangeReserveLogInterface} from '../models/change-reserve.modle';
import {ChangeReserveResponseModel} from '../models/change-reserve-response.model';
import {Page} from '../models/page/page.model';
import {environment} from '../../environments/environment';

@Injectable(
  {
    providedIn: 'root',
  })
export class ChangeReserveService {
  private readonly base = environment.apiBase;

  private readonly apiUrl = `${this.base}/api/reserves`; // Proxy path

  constructor(private http: HttpClient) {
  }

  create(product: ChangeReserveLogCreateInterface): Observable<ChangeReserveLogInterface> {
    return this.http.post<ChangeReserveLogInterface>(`${this.apiUrl}/create`, product);
  }

  getAll(page: number, size: number): Observable<Page<ChangeReserveLogInterface>> {
    return this.http.get<Page<ChangeReserveLogInterface>>(`${this.apiUrl}/findall?page=${page}&size=${size}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getPending():Observable<ChangeReserveResponseModel[]>{
    return this.http.get<ChangeReserveResponseModel[]>(`${this.apiUrl}/pending-summary`)
  }

}
