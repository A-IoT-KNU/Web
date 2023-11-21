import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {DataService} from "../../../services/data.service";
import {NewLocationComponent} from "../new-location/new-location.component";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  async getUserData() {
    this.user = await this.authService.getUserData();
  }

  ngOnInit(): void {

    this.getUserData();


    this.locations = this.dataService.getLocations();
    this.dataService.getLocationsSubject().subscribe(locations => {
      this.locations = locations;
    });


  }
  constructor(public dialog: MatDialog, private authService: AuthService, private dataService: DataService) {
  }
  locations: any;
  user: any;

  logout() {
    this.authService.logout();
  }

  openNewLocation(): void {
    const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '330px',
    });

  }

}
