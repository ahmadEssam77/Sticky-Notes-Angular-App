import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


declare var particlesJS: any;
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  error: string = '';
  noError: string = '';
  isSignUp: boolean = false;

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z][a-z]{2,8}$`)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(80)])
  });

  constructor(public _AuthService: AuthService, public _Router: Router) {}

  submitRegisterForm(allFormData: FormGroup) {  // Receive the all form data in this variable 
    if (this.registerForm.valid) {
      this.isSignUp = true;
      this._AuthService.register(allFormData.value).subscribe((response)=>{
        if(response.message == 'success') {
          this.noError = response.message;
          console.log(allFormData);
          this.registerForm.reset();
          // this._Router.navigate(['signIn']);
          console.log(response.message);
          this.error = '';
          // this.isValid = allFormData.get('first_name')?.status;
          // console.log(this.isValid);
        }
        else {
          this.error = response.errors.email.message;
          this.isSignUp = false;
          console.log(allFormData);
        }
        this.isSignUp = false;
      });
    }
  }

  

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particles.json', null);  
  }

}
