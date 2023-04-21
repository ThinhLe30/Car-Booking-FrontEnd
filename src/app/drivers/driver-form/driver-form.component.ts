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
    this.createFormUpdate();
  }
  id : number
  form!: FormGroup;
  driver: Driver = new Driver(0,"", "", new Date(), "");
  formatDate(date : Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  createFormUpdate(){
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+()0-9]{10,12}')]),
      birth_date: new FormControl(null, [Validators.required])
    });
  }
  
}
