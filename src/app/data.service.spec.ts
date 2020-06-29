import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing'

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {
  let httpClient: HttpClient
  let dataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HttpClient]
  }));

  it('should be return the list of Homes', () => {
    httpClient = TestBed.get(HttpClient)
    const homesMock = [
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
    ];
    spyOn(httpClient,'get').and.returnValue(of(homesMock))
    dataService = TestBed.get(DataService);
    const spy = jasmine.createSpy('spy');

    dataService.getHomes$().subscribe(spy)
    expect(spy).toHaveBeenCalledWith(homesMock);

    expect(httpClient.get).toHaveBeenCalledWith("assets/homes.json")
  });
});
