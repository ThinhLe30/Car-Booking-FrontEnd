import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit{
  @Input() updateDriver: Driver;
  constructor(private driverService : DriverService, private route: ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.title = "Cập Nhập Tài Xế ID: "+ this.id;
    }else{
      this.title = "Thêm Tài Xế"
    }
    this.createForm();
  }
  title = "";
  id : number
  form!: FormGroup;
  driver: Driver = new Driver(0,"", "", "", "","");
  createForm(){
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+()0-9]{10,12}')]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(null, [Validators.required]),
    });
  }
  
}
