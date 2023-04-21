import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from '../models/book';
import { BookingService } from '../services/booking.service';
// import { Book } from '../models/book';

@Component({
  selector: 'app-processing-booking',
  templateUrl: './processing-booking.component.html',
  styleUrls: ['./processing-booking.component.css']
})
export class ProcessingBookingComponent implements OnInit{
  bookConfirm : Book = new Book(0,"","","","","",new Date(),"",false,"",null);
  constructor(private route : ActivatedRoute, private bookingSerive : BookingService){

  }
  ngOnInit(): void { 
    this.bookConfirm = this.bookingSerive.getBookInFormJustSend();
  }

}
