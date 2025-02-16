import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new ReplaySubject<any>(1);

  public data$: Observable<any> = this.dataSubject.asObservable();
  constructor(private http: HttpClient) {}

  public getData() {
    this.http
      .get<any>('http://localhost:3000/budget')
      .subscribe((res) => this.dataSubject.next(res));
  }
}
