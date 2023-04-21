import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookingService } from '../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit{
  id : number
  book: Book = new Book(0,"", "", "", "", "", new Date(), "", false,"",0);
  title = '';
  constructor(private bookService : BookingService, private route: ActivatedRoute, private router : Router){
  }
  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.params['id']
    this.title = "Chi tiết đơn đặt chỗ ID: " + this.id;
    await this.getBookById();
  }
  async getBookById(){
    this.book = await this.bookService.getBookById(this.id).toPromise() as Book;
  }
  formatDate(date : Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
