import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseErrors } from '../common/ErrorMap';
import { AuthService } from '../service/auth.service';
import { SpinnerService } from '../service/Spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  displayName: string;
  loginform: any;
  errorMessage: string;
  constructor(private fb: FormBuilder, private loginService: AuthService,
              public router: Router, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email:['test@test.com',[Validators.required, Validators.email]],
      password:['12345678',[Validators.required, Validators.minLength(1)]]
    });
  }

  get email(){
    return this.loginform.get('email');
  }
  get password(){
    return this.loginform.get('password');
  }

  login(){
    this.spinnerService.simpleLoader();
    this.loginService.login(this.email.value, this.password.value).then(res =>{
      this.displayName = res.user.displayName ;
      this.spinnerService.dismissLoader();
      this.router.navigate(['dashboard']);
    }).catch(error =>{
      this.handleLoginFailure(error);
    });
  }

  handleLoginFailure(error){
    this.errorMessage = 'There are some issues try again.';
    const errorObj = ExpenseErrors.errorObj;
    const code =error.code;
    this.errorMessage = errorObj[code];
    this.spinnerService.dismissLoader();
  }



}
