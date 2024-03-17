import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent implements OnInit {
  roomId: any = '';
  rooms: any;
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.api.rooms().subscribe((result: any) => {
      console.log(result);
      this.rooms = result.rooms;
      console.log(this.rooms);
    });
  }

  roomClick(i: any) {
    this.roomId = this.rooms[i].roomId;
    console.log(this.roomId);
    this.router.navigateByUrl(`booking/${this.roomId}`);
  }
}
