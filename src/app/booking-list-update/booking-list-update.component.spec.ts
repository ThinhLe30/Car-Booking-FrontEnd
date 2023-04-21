import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListUpdateComponent } from './booking-list-update.component';

describe('BookingListUpdateComponent', () => {
  let component: BookingListUpdateComponent;
  let fixture: ComponentFixture<BookingListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingListUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
