import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  private apiUrl = 'https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new';

  constructor(private http: HttpClient) { }

  getRandomNumber(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }
}