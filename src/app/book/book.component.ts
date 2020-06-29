import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from "moment";
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  checkin: Date;
  checkout: Date;
  total: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService,
    public dialogRef: MatDialogRef<BookComponent>,
    public notificationService: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data)
  }

  calculateTotal() {
    let difference = moment(this.checkout, "YYYY-MM-DD").diff(moment(this.checkin, "YYYY-MM-DD"), "days");
    return difference * this.data.home.price;
  }

  book() {
    this.dataService.bookHomes$().subscribe(() => {
      console.log("book !")
      this.dialogRef.close();
      this.notificationService.open("Booking OK", null, {
        duration: 3000
      })
    });
  }

}
