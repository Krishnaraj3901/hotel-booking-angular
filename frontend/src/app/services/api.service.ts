import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //api function to register
  register(username: any, phno: any, password: any) {
    const body = {
      username,
      phno,
      password,
    };
    return this.http.post('http://localhost:5000/register', body);
  }

  //login

  login(phno: any, password: any) {
    const body = {
      phno,
      password,
    };
    return this.http.post('http://localhost:5000/login', body);
  }

  //rooms

  rooms() {
    return this.http.get('http://localhost:5000/rooms');
  }

  //checkin room details
  checkIn(roomId: any) {
    return this.http.get(`http://localhost:5000/checkin/${roomId}`);
  }

  //booking
  booking(
    fullname: any,
    checkin: any,
    checkout: any,
    adult: any,
    children: any,
    email: any,
    phno: any,
    roomId: any
  ) {
    const body = {
      fullname,
      checkin,
      checkout,
      adult,
      children,
      email,
      phno,
      roomId,
    };
    return this.http.post('http://localhost:5000/bookings', body);
  }

  //checkout
  checkout(checkin: any, roomId: any) {
    return this.http.get(`http://localhost:5000/checkout/${checkin}/${roomId}`);
  }

  //confirmed
  confirmed(
    fullname: any,
    checkin: any,
    checkout: any,
    adult: any,
    children: any,
    email: any,
    phno: any,
    roomId: any
  ) {
    const body = {
      fullname,
      checkin,
      checkout,
      adult,
      children,
      email,
      phno,
      roomId,
    };
    return this.http.post(`http://localhost:5000/confirm`, body);
  }

  //history
  history(phno: any) {
    return this.http.get(`http://localhost:5000/history/${phno}`);
  }
}
