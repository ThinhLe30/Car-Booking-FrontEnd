import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private driverSerice : DriverService, private router :Router){}
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
    alert("deletinggg");
  }
  showDelete(id : number){
    this.id = id
    $("#modelId").modal({
      backdrop: true
    });
  }
  handleDelete(id : number){
    this.driverSerice.deleteDriver(id).subscribe(data => {
      console.log(data);
      this.getDriverList();
      $("#modelId").modal('toggle');
    }); 
  }
  handleAdd(){
    alert("addingggg");
  }
}
