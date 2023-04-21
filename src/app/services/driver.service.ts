import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../models/driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  public updateDriverInUI : Driver;
  private baseUrl = "http://localhost:8088/xekebonle/drivers";
  constructor(private httpClient: HttpClient) { }
  getDriverList(): Observable<Driver[]>{
    return this.httpClient.get<Driver[]>(`${this.baseUrl}`);
  }
  getDriverById(id : number){
    return this.httpClient.get<Driver>(`${this.baseUrl}/${id}`);
  }
  updateDriver(id: number, book : Driver) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, book);
  }
  deleteDriver(id : number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  setDriverToUpdate(driver : Driver){
    this.updateDriverInUI = driver;
  }
  getDriverToUpdate(){
    return this.updateDriverInUI;
  }
}
