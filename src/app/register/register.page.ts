import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: any;
  displayName: string;
  constructor(private fb: FormBuilder, private loginService: AuthService,public router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(1)]]
    });
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }

  get name(){
    return this.registerForm.get('name');
  }
  registerUser(){
    const user = {
      name : this.name.value,
      email: this.email.value,
      password: this.password.value
    };

    this.loginService.registerUser(user).then(response =>{
      this.router.navigate(['dashboard'],{ queryParams: {displayName: response}});
    });

  }

}


