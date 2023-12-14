import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locationsSubject = new BehaviorSubject<any[]>([]);
  locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get<any[]>('/api/locations');
  }

  addLocation(location: any) {
    return this.http.post<any>('/api/locations', location).subscribe(() => {
      this.getLocations().subscribe((locations) => {
        this.locationsSubject.next(locations);
      });
    });
  }
}
