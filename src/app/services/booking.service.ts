import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = "http://localhost:8088/xekebonle/booking_details";
  private baseUrl2 = "http://localhost:8088/rest-api/api/v1/booking-details"
  private bookInForm : Book = new Book(0,"","","","","",new Date(),"",false,"",null);
  constructor(private httpClient: HttpClient) { }
  storeBookInFormToConfirm(bookSend : Book){
    this.bookInForm = bookSend;
  }
  getBookInFormJustSend(){
    return this.bookInForm;
  }
  addBooking(book : Book){
    return this.httpClient.post(`${this.baseUrl2}`, book);
  }
  getBookingList(pageNo : number, pageSize : number, sortField : string, orderBy : string): Observable<any>{
    const params = new HttpParams()
      .set('pageNo', pageNo)
      .set('pageSize', pageSize)
      .set('sortField', sortField)
      .set('orderBy', orderBy);

    return this.httpClient.get(`${this.baseUrl2}`, {params});
  }
  getBookById(id : number){
    return this.httpClient.get<Book>(`${this.baseUrl2}/${id}`);
  }
  updateBook(id: number, book : Book) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl2}/${id}`, book);
  }
  deleteBook(id : number){
    return this.httpClient.delete(`${this.baseUrl2}/${id}`);
  }
}
