import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
declare var $: any
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  form!: FormGroup;
  book: Book = new Book(0,"", "", "", "", "", new Date(), "", false,"",null);

  constructor(private router: Router, private bookingService: BookingService) {
  }
  ngOnInit(): void {
    $("document").ready(function () {
      $("#seat_dropdown").prop("selectedIndex", 0);
    });
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
      pickDestination: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      dropDestination: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+()0-9]{10,12}')]),
      seat: new FormControl(null, [Validators.required]),
      date_booking: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.book.firstName = this.form.value.firstName;
    this.book.lastName = this.form.value.lastName;
    this.book.pickDestination = this.form.value.pickDestination;
    this.book.dropDestination = this.form.value.dropDestination;
    this.book.phone = this.form.value.phone;
    this.book.sheet = this.form.value.seat;
    this.book.dateBooking = this.form.value.date_booking;
    this.addBooking();
    this.router.navigate(["confirm-info-booking"]);

  }
  addBooking() {
    this.bookingService.storeBookInFormToConfirm(this.book);
    console.log(this.book);
    
    this.bookingService.addBooking(this.book).subscribe(data => {
      console.log(data);
    },
      error => console.log(error)
    );
  }
  dateToday(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return new Date(year, month, day);
  }
  dateTodayPlus2Weeks(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate() + 14;
    return new Date(year, month, day);
  }
}
