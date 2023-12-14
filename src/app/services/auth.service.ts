import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, Subscription, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

  }

  private clientUrl = "http://localhost:8080/client"
  private locationsUrl = "http://localhost:8080/location"
  private roomsUrl = "http://localhost:8080/room"
  private sensorsUrl = "http://localhost:8080/sensor"
  //----------------------------Auth------------------------------------//
  signUp(data: any) {
    const headers = {'Content-Type': 'application/json'};
    this.http.post<any>(this.clientUrl + '/register', data, {headers})
      .subscribe(
        (response) => {

          console.log(response.status);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        },
        (err) => {
          console.log(err)
          console.log("Сталася помилка при реєстрації")
          localStorage.clear();
          this.router.navigate(['/mh/profile']);
        },
      );
  }


  login(data: any) {
    if (!this.isAuth()) {
      const headers = {'Content-Type': 'application/json'};
      this.http.post<any>(this.clientUrl + '/login', data, {headers})
        .subscribe(
          (response) => {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.router.navigate(['/mh/dashboard/1']);
          },
          (err: HttpErrorResponse) => {
            console.log("Сталася помилка при вході")
            localStorage.clear();
            this.router.navigate(['/']);
          },
        );
    } else {
      this.router.navigate(['/mh/dashboard/1']);
    }

  }

  logout() {

    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null) {
      let data = {
        "accessToken": localStorage.getItem('accessToken'),
        "refreshToken": localStorage.getItem('refreshToken')
      }
      const headers = {'Content-Type': 'application/json'};
      this.http.post<any>(this.clientUrl + '/logout', data, {headers})
        .subscribe(
          (response) => {
            console.log(response);
            localStorage.clear();
            this.router.navigate(['/']);
          },
          (err: HttpErrorResponse) => {
            localStorage.clear();
            this.router.navigate(['/']);
          },
        );

    }

  }

  fetchGetClientInfo() {
    let data = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    };
    console.log(data);
    const headers = {'Content-Type': 'application/json'};
    this.http.post(this.clientUrl + '/details', JSON.stringify(data), {headers}).subscribe((response)=>{
      console.log(response);
      localStorage.setItem('User', JSON.stringify(response));
    })
  }

  isAuth() {
    return !!localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  async getUserData() {

  }


  //------------------------------locations----------------------------------//
  private locationsSubject1 = new BehaviorSubject<any>([]);
  locations1$ = this.locationsSubject1.asObservable();

  fetchCreateLocation(locationName: any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      name: locationName
    };
    console.log(data);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.locationsUrl + '/create', JSON.stringify(data), {headers}).subscribe((response)=>{
      this.fetchGetLocation()
    })
  }

  fetchGetLocation():Subscription {
    let data = {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    };
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.locationsUrl + '/list', JSON.stringify(data), {headers}).subscribe((response)=>{
      console.log(response)
      this.locationsSubject1.next(response);
    })
  }




  // //Це працює
  // private locationsSubject = new BehaviorSubject<any>(null);
  // locations$ = this.locationsSubject.asObservable();
  //
  // createLocations(locationName: any) {
  //   if (this.isAuth()) {
  //     let data = {
  //       token: {
  //         accessToken: localStorage.getItem('accessToken'),
  //         refreshToken: localStorage.getItem('refreshToken')
  //       },
  //       name: locationName
  //     };
  //     const headers = {'Content-Type': 'application/json'};
  //     this.http.post<any>(this.locationsUrl + '/create', JSON.stringify(data), {headers})
  //       .subscribe(
  //         (response) => {
  //           console.log(response);
  //           // @ts-ignore
  //           this.getLocations().subscribe();
  //         },
  //         (error) => console.error(error)
  //       );
  //   }
  // }
  //
  //
  //
  // // @ts-ignore
  // getLocations(): Observable<any> {
  //   if (this.isAuth()) {
  //     let data = {
  //       accessToken: localStorage.getItem('accessToken'),
  //       refreshToken: localStorage.getItem('refreshToken')
  //     };
  //     const headers = {'Content-Type': 'application/json'};
  //     return this.http.post<any>(this.locationsUrl + '/list', JSON.stringify(data), {headers})
  //       .pipe(
  //         tap((response) => {
  //           console.log(response);
  //           localStorage.setItem('locations', JSON.stringify(response));
  //           this.locationsSubject.next(response); // Оновлення значення locationsSubject
  //         })
  //       )
  //   }
  // }


  //----------------------------------------Rooms----------------------------------------//


  private roomsSubject1 = new BehaviorSubject<any>([]);
  rooms1$ = this.roomsSubject1.asObservable();

  fetchCreateRoom(locationid: any, name:any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      locationId: locationid,
      name: name
    };
    console.log(data);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.roomsUrl + '/create', JSON.stringify(data), {headers}).subscribe(()=>{
      this.fetchGetRoom(locationid)
    })
  }

  fetchGetRoom(locationid: any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      locationId: locationid,
    };

    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.roomsUrl + '/list', JSON.stringify(data), {headers}).subscribe((response)=>{
      this.roomsSubject1.next(response);
    })
  }


  // private roomsSubject = new BehaviorSubject<any>(null);
  // rooms$ = this.roomsSubject.asObservable();
  //
  // createRooms(locationid: any, name:any) {
  //   if (this.isAuth()) {
  //     let data = {
  //       token: {
  //         accessToken: localStorage.getItem('accessToken'),
  //         refreshToken: localStorage.getItem('refreshToken')
  //       },
  //       locationId: locationid,
  //       name: name
  //     };
  //     const headers = {'Content-Type': 'application/json'};
  //     this.http.post<any>(this.roomsUrl + '/create', JSON.stringify(data), {headers})
  //       .subscribe(
  //         (response) => {
  //           console.log(response);
  //           // @ts-ignore
  //           this.getRooms(locationid).subscribe();
  //         },
  //         (error) => console.error(error)
  //       );
  //   }
  // }
  //
  // // @ts-ignore
  // getRooms(locationid: any): Observable<any> {
  //   if (this.isAuth()) {
  //     let data = {
  //       token: {
  //         accessToken: localStorage.getItem('accessToken'),
  //         refreshToken: localStorage.getItem('refreshToken')
  //       },
  //       locationId: locationid,
  //     };
  //     const headers = {'Content-Type': 'application/json'};
  //     return this.http.post<any>(this.roomsUrl + '/list', JSON.stringify(data), {headers})
  //       .pipe(
  //         tap((response) => {
  //           console.log(response);
  //           localStorage.setItem('rooms', JSON.stringify(response));
  //           this.roomsSubject.next(response); // Оновлення значення roomsSubject
  //         })
  //       )
  //   }
  // }


  //----------------------------------------Rooms----------------------------------------//


  private SensorSubject1 = new BehaviorSubject<any>([]);
  sensors1$ = this.SensorSubject1.asObservable();

  fetchCreateSensor(locationid: any, roomid:any, name:any, type:any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      sensorName: name,
      locationId: locationid,
      roomId: roomid.toString(),
      sensorTypes: type
    };
    console.log(data);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.sensorsUrl + '/create', JSON.stringify(data), {headers}).subscribe(()=>{
      this.fetchGetSensor(roomid)
    })
  }

  fetchGetSensor(roomid: any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      roomId: roomid,
    };

    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.sensorsUrl + '/list', JSON.stringify(data), {headers}).subscribe((response)=>{
      console.log(response)
      this.SensorSubject1.next(response);
    })
  }

  fetchChangeSensor(sensorId: any, roomid:any, name:any):Subscription {
    let data = {
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      },
      location:{
        id:sensorId,
        name:name
      }
    };
    console.log(data);
    const headers = {'Content-Type': 'application/json'};
    return this.http.put(this.sensorsUrl + '/edit', JSON.stringify(data), {headers}).subscribe(()=>{
      this.fetchGetSensor(roomid)
    })
  }


}
