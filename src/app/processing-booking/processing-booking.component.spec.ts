import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingBookingComponent } from './processing-booking.component';

describe('ProcessingBookingComponent', () => {
  let component: ProcessingBookingComponent;
  let fixture: ComponentFixture<ProcessingBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
