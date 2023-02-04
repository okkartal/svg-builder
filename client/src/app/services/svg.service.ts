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

  getDimension(): Observable<Dimension> {
    return this.httpClient.get<Dimension>(`${environment.apiUrl}`);
  }

  saveDimension(data: Dimension): Observable<Dimension> {
    return this.httpClient.put<Dimension>(`${environment.apiUrl}`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getPerimeter(data: Dimension): Observable<Number> {
    return this.httpClient.get<Number>(
      `${environment.apiUrl}/Perimeter?width=${data.width}&height=${data.height}`
    );
  }
}
