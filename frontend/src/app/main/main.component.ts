import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  phno: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.phno = localStorage.getItem('phno');
    if (!this.phno) {
      alert('Please login');
      this.router.navigateByUrl(`/`);
    }
  }
}
