import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  userName: any = '';

  constructor(private _AuthService: AuthService) {
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
        this.userName = this._AuthService.userData.getValue();
      }
      else {
        this.isLogin = false;
      }
    });
  }

  logOutTocallTheLogOutInAuthService() {
    this._AuthService.logOut();
  }

  // checkIfLoginOrNot() {
  // }



  //! To change the dropdown title by clicking on the signup or signin
  // changeTheDropDownTitle(e: any) {
  //   $('nav .dropdown-menu').click(function () {
  //     $('.selected').html(e.html());
  //     console.log(e.html());
  // })
  // }


}