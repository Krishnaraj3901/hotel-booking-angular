import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import jspdf from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  id: any;
  room: any;
  rooms: any = [];
  phoneNumber: any;
  roomHistory: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((result: any) => {
      console.log(result);
      this.phoneNumber = result.phno;
      this.api.history(this.phoneNumber).subscribe((response: any) => {
        console.log(response);
        this.roomHistory = response.historyDetails;
        console.log(this.roomHistory);
        for (let i of this.roomHistory) {
          this.id = i.roomId;
          console.log(this.id);
          this.api.checkIn(this.id).subscribe((result: any) => {
            console.log(result);
            this.room = result.selectedRoom;
            console.log(this.room);
            this.rooms.push(this.room);
            console.log(this.rooms);
          });
        }
      });
    });
  }
  

//   generatePdf() {
//     // 1 create an object for jspdf
//     var pdf = new jspdf();
  
//     // 2 setup row for the table
//     let thead = ['No', 'full name', 'checkin date', 'checkout date', 'suite name'];
//     let tbody = [];
  
//     // 3 setup properties for the table
//     pdf.setFontSize(20);
//     pdf.text('Booking ', 15, 10);
  
//     // 4 display as a table, we need to convert the array of objects into a nested array
  
//     // 5 convert nested array into a table structure using jspdf-autotable
//     (pdf as any).autoTable(thead, this.roomHistory.map((room:any, index:any) => {
//       // Using map to include the index in each row
//       return [index + 1, room.fullname, room.checkin, room.checkout,this.rooms];
//     }));
  
//     // 6 to open the PDF in another tab
//     pdf.output('dataurlnewwindow');
  
//     // 7 to download or save the PDF
//     pdf.save('BookingHistory.pdf');
// }

generatePdf() {
  // 1 create an object for jspdf
  var pdf = new jspdf();

  // 2 setup row for the table
  let thead = ['No', 'full name', 'checkin date', 'checkout date', 'suite name',];
  let tbody = [];

  // 3 setup properties for the table
  pdf.setFontSize(20);
  pdf.text('Booking ', 15, 10);

  // 4 display as a table, we need to convert the array of objects into a nested array

  // 5 convert nested array into a table structure using jspdf-autotable
  (pdf as any).autoTable(thead, this.roomHistory.map((room:any, index:any) => {
    // Assuming additionalArray has corresponding data at the same index
    let additionalData = this.rooms[index];
    return [index + 1, room.fullname, room.checkin, room.checkout, additionalData.suite_name];
  }));

  // 6 to open the PDF in another tab
  pdf.output('dataurlnewwindow');

  // 7 to download or save the PDF
  pdf.save('BookingHistory.pdf');
}
}