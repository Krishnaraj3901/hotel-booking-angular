import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  id: any = '';
  phno:any
  bookingRoom:any=[]
  checkin:string=''
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.phno=localStorage.getItem('phno');
    this.route.params.subscribe((result: any) => {
      console.log(result);
      this.id = result.roomId;
      this.api.checkIn(this.id).subscribe((response: any) => {
        console.log(response);
      this.bookingRoom=[response.selectedRoom]
      console.log(this.bookingRoom);
      
      });
    })
  }

  bookingForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    checkin: ['', [Validators.required]],
    checkout: ['', [Validators.required]],
    adult: ['', [Validators.required, Validators.maxLength(3)]],
    children: ['', [Validators.required, Validators.maxLength(3)]],
    email: ['', [Validators.required]],
    
  });

  booking() {
    if (this.bookingForm.valid) {
      this.phno=localStorage.getItem('phno')
      console.log(this.bookingForm.value);
      let fullname = this.bookingForm.value.fullname;
      let checkin = this.bookingForm.value.checkin;
      let checkout = this.bookingForm.value.checkout;
      let adult = this.bookingForm.value.adult;
      let children = this.bookingForm.value.children;
      let email = this.bookingForm.value.email;
      // let phno = this.bookingForm.value.phno;
      console.log(fullname, checkin, checkout, adult, children, email, this.phno);
      console.log(this.id)
      this.api
        .booking(fullname, checkin, checkout, adult, children, email, this.phno,this.id)
        .subscribe((response: any) => {
          console.log(response);
          alert(response.message);
          this.router.navigateByUrl(`/checkout/${checkin}/${this.id}`)
        });
    } else {
      alert('invalid form');
    }
  }
}
