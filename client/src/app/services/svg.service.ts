import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dimension } from '../models/dimension';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  constructor(private httpClient: HttpClient) {}

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('X-API-KEY', '38e45851-d4e5-5849-8371-c6cb4b53833d')
      .set('Content-Type', 'application/json');
    return headers;
  }

  getDimension(): Observable<Dimension> {
    return this.httpClient.get<Dimension>(`${environment.apiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  saveDimension(data: Dimension): Observable<Dimension> {
    return this.httpClient.put<Dimension>(`${environment.apiUrl}`, data, {
      headers: this.getHeaders(),
    });
  }

  getPerimeter(data: Dimension): Observable<Number> {
    const url = new URL(`${environment.apiUrl}/Perimeter`);
    url.searchParams.set('width', data.width.toString());
    url.searchParams.set('height', data.height.toString());
    return this.httpClient.get<Number>(url.toString(), {
      headers: this.getHeaders(),
    });
  }
}
