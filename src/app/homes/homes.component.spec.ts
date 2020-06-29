import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from '../dialog.service';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dialogService: DialogService;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ HomesComponent ],
      providers: [DataService, DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);
    spyOn(dataService, 'getHomes$').and.returnValue(of(
      [
        {
          title: "Home1",
          image: "",
          location: "New York"
        },
        {
          title: "Home2",
          image: "",
          location: "New York"
        },
        {
          title: "Home3",
          image: "",
          location: "New York"
        }
      ]
    ));

    fixture.detectChanges();
  });

  it('should show homes', () => {

    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3)
    expect(fixture.nativeElement.querySelector('[data-test="title"]').innerText).toBe("Home1")
    expect(fixture.nativeElement.querySelector('[data-test="location"]').innerText).toBe("New York")
    expect(fixture.nativeElement.querySelector('[data-test="image"]')).toBeTruthy()
    expect(fixture.nativeElement.querySelector('[data-test="book-button"]')).toBeTruthy()
  });

  it('should use dialog service to open dialog when clicking on book button', () => {
    let button = fixture.debugElement.query(By.css('[data-test="book-button"]'));
    let spy = spyOn(dialogService, 'open')

    button.triggerEventHandler('click', null)

    expect(spy).toHaveBeenCalled()
  })
});
