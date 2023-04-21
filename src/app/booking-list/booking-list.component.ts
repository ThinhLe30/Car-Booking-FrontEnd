import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';
import { Book } from '../models/book';
declare var $: any
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{
  bookingList : Book[]
  pageNo : number = 0;
  pageSize : number = 10;
  sortField : string = "dateBooking";
  orderBy : string = "desc";
  reverseOrderBy : string = "asc";
  totalElements : number;
  totalPages : number;
  id = 0;

  constructor(private bookSerice : BookingService, private router :Router){}
  ngOnInit(): void {
    $("#app-contact").hide();
    this.getBookingList();
  }
  hanldePaging(pageNo : number){
    this.pageNo = pageNo;
    this.getBookingList();
  }
  handlePageSize(pageSize : string){
    this.pageSize = parseInt(pageSize);
    this.pageNo = 0;
    this.sortField = "dateBooking";
    this.orderBy = "desc";
    this.getBookingList();
  }
  handleSorting(sortField : string, orderBy : string){
    // alert(orderBy + " "+ sortField);
    this.orderBy = orderBy;
    this.sortField = sortField;
    this.getBookingList();
  }
  getBookingList(){
    this.bookSerice.getBookingList(this.pageNo, this.pageSize, this.sortField, this.orderBy).subscribe(data =>{
      this.bookingList = data.content;
      this.pageNo = data.pageNo;
      this.pageSize = data.pageSize;
      this.sortField = data.sortField;
      this.orderBy = data.orderBy;
      this.reverseOrderBy = data.reverseOrderBy;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      // const bookings = data.content;
      console.log(data);
    },
    error => {
      console.error(error);
    })
  }
  confirmBookDetails(id : number){
    this.router.navigate(["books",id]);
  }
  viewDetail(id : number){
    this.router.navigate(["books",id,'view']);
  }
  showModalConfirm(id : number){
    this.id = id;
    $("#modelId").modal()
  }
  deleteBookDetail(){
    this.bookSerice.deleteBook(this.id).subscribe(data => {
      console.log(data);
      this.getBookingList();
      $("#modelId").modal('toggle');
    }); 
    
  }
}
