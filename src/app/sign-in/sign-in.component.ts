import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';


declare var particlesJS: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  error:string ='';

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z][a-z]{2,8}$`)])
  });

  signInForm(loginFormData: FormGroup) {
    if (this.loginForm.valid) {
      this._AuthService.signIn(loginFormData.value).subscribe((response)=>{
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token);   // Save the user token in local storage, then will use jwt-decode library to decode it. So I can use it and do a lot of things
          this._Router.navigate(['home']);
          this._AuthService.decodeUserDataToken();
          // console.log(jwtDecode(response.token));
        }
        else {
          this.error = response.message;
        }
      })
    }
  }

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particles.json', null);  
  }

}
