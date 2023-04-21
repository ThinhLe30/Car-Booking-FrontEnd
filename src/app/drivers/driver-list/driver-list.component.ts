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
  constructor(private driverSerice : DriverService, private router :Router){}
  ngOnInit(): void {
    this.getDriverList()
  }
  getDriverList(){
    this.driverSerice.getDriverList().subscribe(data =>{
      this.driverList = data;
    })
  }
  showUpdate(driver : Driver){
    this.id = driver.id  
    $("#editModal").modal({
      backdrop: false
    })

    
  }
  showDelete(id : number){
    this.id = id
    $("#modelId").modal({
      backdrop: true
    })
  }
}
