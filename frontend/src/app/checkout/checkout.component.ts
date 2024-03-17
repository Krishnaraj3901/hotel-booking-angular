import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  id:any
  roomId: any = '';
  checkin: any = '';
  fullname: any = '';
  adult: any;
  children: any = '';
  email: any = '';
  phno: any = '';
  details: any = '';
  checkout: any = '';
  roomDetail: any = '';

  constructor(private api: ApiService, private route: ActivatedRoute,private Router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((response: any) => {
      console.log(response);
      this.checkin = response.checkin;
      console.log(this.checkin)
      this.id = response.roomId;
      console.log(this.id)
    });

    this.api.checkout(this.checkin, this.id).subscribe((result: any) => {
      console.log(result);
      this.details = [result.bookDetails];
      console.log(this.details);
      this.fullname = this.details[0].fullname;
      this.checkin= this.details[0].checkin;
      this.checkout = this.details[0].checkout;
      console.log(this.checkout)
      this.adult = this.details[0].adult;
      this.children = this.details[0].children;
      this.phno = this.details[0].phno;
      this.email = this.details[0].email;
      this.id= this.details[0].roomId;

      this.api.checkIn(this.id).subscribe((response: any) => {
        console.log(response);
        this.roomDetail = [response.selectedRoom];
        console.log(this.roomDetail)
      });
    });
  }

  confirmed() {
    this.api
      .confirmed(
        this.fullname,
        this.checkin,
        this.checkout,
        this.adult,
        this.children,
        this.email,
        this.phno,
        this.id
      )
      .subscribe((result: any) => {
        console.log(result);
        alert(result.message)
        this.Router.navigateByUrl(`/history/${this.id}`)
      });
  }
}

