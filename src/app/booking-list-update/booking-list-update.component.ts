import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip';
@Component({
  selector: 'app-booking-list-update',
  templateUrl: './booking-list-update.component.html',
  styleUrls: ['./booking-list-update.component.css']
})
export class BookingListUpdateComponent implements OnInit{
  id : number
  form!: FormGroup;
  book: Book = new Book(0,"", "", "", "", "", new Date(), "", true,"",0);
  title = '';
  tripList : Trip[]
  constructor(private bookService : BookingService, 
              private route: ActivatedRoute, private router : Router,
              private tripService : TripService){}
  async ngOnInit(): Promise<void> {
    this.createFormUpdate();
    this.id = this.route.snapshot.params['id']
    this.title = "Cập nhật đơn đặt chỗ ID: " + this.id;
    await this.getBookById();
    this.getDriverList();
  }
  onSubmit(){
    this.updateFormToBook();
    this.sendBookToDbAndRedirect();
  }
  dateToday(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return new Date(year, month, day);
  }
  async getBookById(){
    this.book = await this.bookService.getBookById(this.id).toPromise() as Book;
    this.UpdateFormInput();
  }
  getDriverList(){
    this.tripService.getAllTrip().subscribe(data =>{
      this.tripList = data;
    })
  }
  dateTodayPlus2Weeks(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate() + 14;
    return new Date(year, month, day);
  }
  createFormUpdate(){
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
      pickDestination: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      dropDestination: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+()0-9]{10,12}')]),
      seat: new FormControl(null, [Validators.required]),
      date_booking: new FormControl(null, [Validators.required]),
      note : new FormControl(null, [Validators.required]),
      tripId : new FormControl(null, [Validators.required])
    });
  }
  UpdateFormInput(){
    this.form.get("firstName")?.setValue(this.book.firstName);
    this.form.get("lastName")?.setValue(this.book.lastName);
    this.form.get("pickDestination")?.setValue(this.book.pickDestination);
    this.form.get("dropDestination")?.setValue(this.book.dropDestination);
    this.form.get("phone")?.setValue(this.book.phone);
    this.form.get("seat")?.setValue(this.book.sheet);
    this.form.get("date_booking")?.setValue(this.formatDate(this.book.dateBooking));
    this.form.get("note")?.setValue(this.book.note);
    this.form.get("tripId")?.setValue(this.book.tripId);
  }
  updateFormToBook(){
    this.book.firstName = this.form.value.firstName;
    this.book.lastName = this.form.value.lastName;
    this.book.pickDestination = this.form.value.pickDestination;
    this.book.dropDestination = this.form.value.dropDestination;
    this.book.phone = this.form.value.phone;
    this.book.sheet = this.form.value.seat;
    this.book.dateBooking = this.form.value.date_booking;
    this.book.note = this.form.value.note;
    this.book.tripId = parseInt(this.form.value.tripId)
    this.book.status = true;
    console.log(this.book);
    
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
  sendBookToDbAndRedirect(){
    this.bookService.updateBook(this.id, this.book).subscribe(data =>{
      this.redirectToBookList();
    },error => {
      console.log(error);
    })
  }
  redirectToBookList(){
    this.router.navigate(['/books']);
  }
  
}
