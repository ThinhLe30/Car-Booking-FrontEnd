import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl2 = "http://localhost:8088/rest-api/api/v1/trips/all"
  constructor(private httpClient: HttpClient) { }
  getAllTrip(): Observable<Trip[]>{
    return this.httpClient.get<Trip[]>(`${this.baseUrl2}`);
  }
}
