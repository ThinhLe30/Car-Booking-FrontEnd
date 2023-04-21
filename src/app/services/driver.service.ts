import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../models/driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  public updateDriverInUI : Driver;
  private baseUrl = "http://localhost:8088/rest-api/api/v1/drivers";
  constructor(private httpClient: HttpClient) { }
  getDriverList(pageNo : number, pageSize : number, sortField : string, orderBy : string): Observable<any>{
    const params = new HttpParams()
    .set('pageNo', pageNo)
    .set('pageSize', pageSize)
    .set('sortField', sortField)
    .set('orderBy', orderBy);
    return this.httpClient.get<any>(`${this.baseUrl}`, {params});
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
