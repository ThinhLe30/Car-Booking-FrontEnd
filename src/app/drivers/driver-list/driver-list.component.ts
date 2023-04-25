import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';
declare var $: any
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit{
  updatedDriver : Driver;
  driverList : Driver[];
  id = 0;
  pageNo : number = 0;
  pageSize : number = 10;
  sortField : string = "lastName";
  orderBy : string = "asc";
  reverseOrderBy : string = "desc";
  totalElements : number;
  totalPages : number;
  constructor(private driverSerice : DriverService, private router :Router, private toastService: NgToastService){}
  ngOnInit(): void {
    this.getDriverList()
  }
  getDriverList(){
    this.driverSerice.getDriverList(this.pageNo, this.pageSize, this.sortField, this.orderBy).subscribe(data =>{
      this.driverList = data.content;
      this.pageNo = data.pageNo;
      this.pageSize = data.pageSize;
      this.sortField = data.sortField;
      this.orderBy = data.orderBy;
      this.reverseOrderBy = data.reverseOrderBy;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    })
  }
  hanldePaging(pageNo : number){
    this.pageNo = pageNo;
    this.getDriverList();
  }
  handlePageSize(pageSize : string){
    this.pageSize = parseInt(pageSize);
    this.pageNo = 0;
    this.sortField = "lastName";
    this.orderBy = "asc";
    this.getDriverList();
  }
  handleSorting(sortField : string, orderBy : string){
    // alert(orderBy + " "+ sortField);
    this.orderBy = orderBy;
    this.sortField = sortField;
    this.getDriverList();
  }
  showUpdate(driver : Driver){
    this.id = driver.id  
    this.router.navigate(['/drivers/update',this.id]);
  }
  showDelete(id : number){
    this.id = id
    $("#modelId").modal({
      backdrop: true
    });
  }
  handleDelete(id : number){
    this.driverSerice.deleteDriver(id).subscribe(data => {
      this.toastService.success({detail: "XÓA TÀI XẾ", summary:"Xóa tài xế ID: " + id + " thành công!.", duration:5000});
      this.getDriverList();
      $("#modelId").modal('toggle');
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.toastService.error({detail: "OOPS. LỖI", summary:error.error.message, duration:5000});
      }
      else{
        this.toastService.error({detail: "OOPS. LỖI", summary:"An error occurred while fetching the driver:", duration:5000});
      }
    });
  }
  handleAdd(){
    this.router.navigate(['/drivers/add']);
  }
}
