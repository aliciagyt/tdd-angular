import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DataService } from '../data.service';
import { DialogService } from '../dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  homes$;

  constructor(private dataService: DataService, private dialogService: DialogService) { }

  ngOnInit() {
    this.homes$ = this.dataService.getHomes$();
  }

  openBookingModal(home) {
    this.dialogService.open(BookComponent, {
      width: '250px',
      data: { home }
    })
  }

}
