import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit{
  @Input() updateDriver: Driver;
  title = "";
  id : number
  form!: FormGroup;
  driver: Driver = new Driver(0,"", "", "", "","");
  constructor(private driverService : DriverService, private route: ActivatedRoute, private router : Router, private toastService : NgToastService){}
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id']
    this.createForm();
    if(this.id){
      this.title = "Cập Nhập Tài Xế ID: "+ this.id;
      await this.getDriverById();
    }else{
      this.title = "Thêm Tài Xế";
    }
    
  }
  createForm(){
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+()0-9-.]{10,15}')]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(null, [Validators.required]),
    });
  }
  bindDriverToForm(){
    this.form.get("firstName")?.setValue(this.driver.firstName);
    this.form.get("lastName")?.setValue(this.driver.lastName);
    this.form.get("phone")?.setValue(this.driver.phone);
    this.form.get("email")?.setValue(this.driver.email);
    this.form.get("address")?.setValue(this.driver.address);
  }
  bindFormToDriver(){
    this.driver.firstName = this.form.value.firstName;
    this.driver.lastName = this.form.value.lastName;
    this.driver.phone = this.form.value.phone;
    this.driver.email = this.form.value.email;
    this.driver.address = this.form.value.address;
  }
  async getDriverById(){
    try {
      this.driver = await this.driverService.getDriverById(this.id).toPromise() as Driver;
      this.bindDriverToForm();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.toastService.error({detail: "OOPS. LỖI", summary:error.error.message, duration:5000});
        this.redirectToDriverList();
      } else{
        console.error('An error occurred while fetching the driver:');
      }
    }
  }
  handleSubmit(){
    this.bindFormToDriver();
    if(this.id){
      this.driverService.updateDriver(this.id, this.driver).subscribe(data =>{
        this.toastService.success({detail: "CẬP NHẬP TÀI XẾ", summary:"Cập nhập tài xế với id: " + this.id + " thành công!.", duration:5000});
        this.redirectToDriverList();
      },error => {
        console.log(error);
      })
    }
    else{
      this.driverService.addDriver(this.driver).subscribe(data =>{
        this.toastService.success({detail: "THÊM TÀI XẾ", summary:"Thêm tài xế thành công!.", duration:5000});
        this.redirectToDriverList();
      },error => {
        console.log(error);
      })
    }
  }
  redirectToDriverList(){
    this.router.navigate(['/drivers']);
  }
  
}
