/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseErrors } from '../common/ErrorMap';
import { AuthService } from '../service/auth.service';
import { FamilyService } from '../service/family.service';
import { SpinnerService } from '../service/Spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: any;
  displayName: string;
  errorMessage: any;
  constructor(private fb: FormBuilder, private loginService: AuthService,
              public router: Router,public familyService: FamilyService,private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(1)]],
      familyName:['',[Validators.required, Validators.minLength(1)]],
      members: new FormArray([])
    });
    this.onAddMemeber();
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

  get memberControls(){
    return (<FormArray>this.registerForm.get('members')).controls;
  }

  onAddMemeber(){
    const memeberCtl = new FormControl(null);
    (<FormArray>this.registerForm.get('members')).push(memeberCtl);
  }

  registerUser(){
    this.spinnerService.simpleLoader();
    const name = this.name.value;
    const email = this.email.value;
    const password = this.password.value;
    const user = {name , email, password };
    console.log(user);

    const familyName = this.registerForm.get('familyName').value;
    const allMembers = this.registerForm.get('members').value;
    allMembers.push(this.email.value);
    const members = allMembers.filter(e => e!=null);


    const family = {name: familyName, members};

    this.loginService.registerUser(user).then(async response =>{
      console.log(response);
      await this.familyService.createFamily(family);
      this.spinnerService.dismissLoader();
      this.router.navigate(['dashboard'],{ queryParams: {displayName: response}});
    }).catch(error =>{
      const errorObj = ExpenseErrors.errorObj;
      const code =error.code;
      this.errorMessage = errorObj[code];
      this.spinnerService.dismissLoader();
    });

  }

}


