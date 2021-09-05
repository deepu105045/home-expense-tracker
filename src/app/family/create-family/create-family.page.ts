/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.page.html',
  styleUrls: ['./create-family.page.scss'],
})
export class CreateFamilyPage implements OnInit {

  form: FormGroup;
  myemail: string;
  allMembers: string[] = [];

  constructor(private authService: AuthService, public router: Router, private fb: FormBuilder, private familyService: FamilyService) { }

  ngOnInit() {
    this.authService.getMyDetails().subscribe(user =>{
      this.myemail = user.email;
    });

    this.form = new FormGroup({
      familyName: new FormControl(null,[Validators.required]),
      members: new FormArray([])
    });

    this.onAddMemeber();
  }

  get memberControls(){
    return (<FormArray>this.form.get('members')).controls;
  }

  onAddMemeber(){
    const memeberCtl = new FormControl(null,[Validators.required]);
    (<FormArray>this.form.get('members')).push(memeberCtl);
  }

  createFamily(){
    const name = this.form.get('familyName').value;
    this.allMembers = this.form.get('members').value;
    this.allMembers.push(this.myemail);
    const members = this.allMembers.filter(e => e!=null);
    const obj = { name, members };
    this.familyService.createFamily(obj).then(response =>{
      this.router.navigate(['dashboard']);
    }).catch(error =>{
      console.log(error);
    });


  }

}
