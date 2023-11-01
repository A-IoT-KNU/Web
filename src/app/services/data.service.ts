import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
interface location {
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private locationsSubject = new Subject<any[]>();
   private locations: location[] = [
    {value: 'Підвал'},
    {value: 'Квартира'},
    {value: 'Дача'},
    {value: 'Будинок'},
    {value: 'Гараж'},
  ];
  constructor() {
  }

  getLocations() {
    const storedLocations = localStorage.getItem('locations');
    if (storedLocations) {
      this.locations = JSON.parse(storedLocations);
    }
    return this.locations;
  }

  addItemToLocations(item: any) {
    this.locations.push({value: item});
    localStorage.setItem('locations', JSON.stringify(this.locations));
    this.locationsSubject.next(this.locations);
  }
  getLocationsSubject(): Subject<any[]> {
    return this.locationsSubject;
  }
}
