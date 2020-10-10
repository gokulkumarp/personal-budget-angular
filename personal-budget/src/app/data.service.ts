import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { D3model } from './model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataUrl: string = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) {}

  //emits the single value

  getChartData(): Observable<D3model[]> {
    // now returns an Observable of D3model
    return this.http.get<D3model[]>(this.dataUrl);
  }
}
