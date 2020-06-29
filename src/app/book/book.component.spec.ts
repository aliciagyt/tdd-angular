import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';

describe('BookComponent', () => {
  let dataService: jasmine.SpyObj<DataService>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService: jasmine.SpyObj<MatSnackBar>
  let fixture: ComponentFixture<BookComponent>;
  const el = (selector) => {
    return fixture.nativeElement.querySelector(selector)
  }
  let dialogData = {
    home: {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ BookComponent ],
      providers: [
        {provide: DataService, useFactory: () => spyOnClass(DataService)},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef)},
        {provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar)},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA)
    dataService = TestBed.get(DataService)
    matDialogRef = TestBed.get(MatDialogRef)
    notificationService = TestBed.get(MatSnackBar)

    const homes = require('../../../src/assets/homes.json')
    dialogData.home = homes[0]
    fixture.detectChanges();
  });

  it('should display the title', () => {
    expect(el("[data-test='title']").textContent).toContain("Home1")
  });

  it('should display the price', () => {
    expect(el("[data-test='price']").textContent).toContain("120")
  });

  it('should show checkin and checkout fiels', () => {
    expect(el("[data-test='checkin']")).toBeTruthy()
    expect(el("[data-test='checkout']")).toBeTruthy()
  });

  it('should show total', () => {

    let checkinInputEl = el("[data-test='checkin']")
    checkinInputEl.value = "2020-10-12"
    checkinInputEl.dispatchEvent(new Event('input'))

    let checkoutInputEl = el("[data-test='checkout']")
    checkoutInputEl.value = "2020-10-18"
    checkoutInputEl.dispatchEvent(new Event('input'))

    fixture.detectChanges();

    expect(el("[data-test='total']").textContent).toContain(120 * 6)
  });

  it('should book home', () => {

    let checkinInputEl = el("[data-test='checkin']")
    checkinInputEl.value = "2020-10-12"
    checkinInputEl.dispatchEvent(new Event('input'))

    let checkoutInputEl = el("[data-test='checkout']")
    checkoutInputEl.value = "2020-10-18"
    checkoutInputEl.dispatchEvent(new Event('input'))

    fixture.detectChanges();

    el("[data-test='submit-button']").click()

    expect(dataService.bookHomes$).toHaveBeenCalled()
  });

  it('should close the dialog and show notif', () => {

    dataService.bookHomes$.and.returnValue(of(null));

    let checkinInputEl = el("[data-test='checkin']")
    checkinInputEl.value = "2020-10-12"
    checkinInputEl.dispatchEvent(new Event('input'))

    let checkoutInputEl = el("[data-test='checkout']")
    checkoutInputEl.value = "2020-10-18"
    checkoutInputEl.dispatchEvent(new Event('input'))

    fixture.detectChanges();

    el("[data-test='submit-button']").click()

    expect(matDialogRef.close).toHaveBeenCalled()
    expect(notificationService.open).toHaveBeenCalled();
  });
});
