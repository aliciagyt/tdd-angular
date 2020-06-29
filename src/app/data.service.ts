import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$() {
    return this.httpClient.get<any>('assets/homes.json')
  }

  bookHomes$() {
    return this.httpClient.post(
      'https://run.mocky.io/v3/dab6b0f5-5fa1-43d0-93bb-551e75a21a2f',
      {}
    )
  }
}
