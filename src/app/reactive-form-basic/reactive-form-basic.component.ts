import { Component, OnInit } from '@angular/core';
//Used below modules to build a reactive form
import {FormGroup,FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form-basic',
  templateUrl: './reactive-form-basic.component.html',
  styleUrls: ['./reactive-form-basic.component.css']
})
export class ReactiveFormBasicComponent implements OnInit {
  genders = ['male', 'female'];
  //Below is used to programmatically create a form
  signupForm:FormGroup;
  forbiddenUserNames=['Chris','Anna'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData':new FormGroup({
        'username': new FormControl(null,
          [Validators.required,this.forbiddenNames.bind(this)]), 
          //Make this form control required
          //this.forbiddenNames.bind(this) this will call the custom validator
        'email': new FormControl(null,
          [Validators.required, Validators.email],
          this.forbiddenEmail.bind(this)) 
          //Make this form control required and of type email
          //this.forbiddenEmail.bind(this) this will code the async method to validate email
      }),
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])//Array of form control
    });

    //Subscribe to any value changes to this form
    this.signupForm.valueChanges.subscribe((value:any)=>{
      console.log(value);
    });

    //Subscribe to any status changes to this form
    this.signupForm.statusChanges.subscribe((status:any)=>{
      console.log(status);
    });

    //Set default value as below
    this.signupForm.patchValue({
      'userData':{
        'username':'Anna1'
      }
    });

  }

  //Method to submit form data
  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //Return type like this {nameIsForbidden:true}
  //Custom validator which return key value pair
  forbiddenNames(control:FormControl):{[key:string]:boolean}{

    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  //Custom validator to validate data async
  forbiddenEmail(control:FormControl): Promise<any> | Observable<any>{
    const promise=new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value=="test@test.com"){
          resolve({'emailIsForbidden':true});
        }
        else{
          resolve(null);
        }
      },1500)
    });
    return promise;
  }
 }
