import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  phno: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.phno = localStorage.getItem('phno');
  }

  historyGet() {
    this.router.navigateByUrl(`/history/${this.phno}`);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl(`/`);
  }
}
