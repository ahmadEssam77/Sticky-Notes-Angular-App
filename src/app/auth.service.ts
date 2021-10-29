import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') != null) {
      this.decodeUserDataToken();
    }
  }

  // ================ Registeration and Login ==========================================

  register(formData: object): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`, formData);
  }

  signIn(loginFormData: object): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`, loginFormData);
  }

  logOut() {
    // localStorage.removeItem('userToken');
    localStorage.clear();
    this.userData.next(null);
  }

  decodeUserDataToken() {
    let getTokenFromLocalStorage = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(getTokenFromLocalStorage));
  }

  // ============================= Notes ===================================================================

  // ADD
  notesToAPI(addNotesData: any): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/addNote`, addNotesData);
  }

  // GET
  getNotesFromAPI(getNotesData: any): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/getUserNotes`, getNotesData);
  }

  // DELETE
  deleteNotesFromAPI(data: any): Observable<any> {
    let options = {
      headers : new HttpHeaders({}),
      body : {
        "noteID": data.NoteID,
        "token": data.token
      }
    }
    return this._HttpClient.delete(`https://routeegypt.herokuapp.com/deleteNote`, options);
  }






}

