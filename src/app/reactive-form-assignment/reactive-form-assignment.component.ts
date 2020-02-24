import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form-assignment',
  templateUrl: './reactive-form-assignment.component.html',
  styleUrls: ['./reactive-form-assignment.component.css']
})
export class ReactiveFormAssignmentComponent implements OnInit {
  projectForm:FormGroup;
  projectStatus:string[]=['Stable','Critical','Finished'];
  inValidUserName="test";

  ngOnInit() {
    this.projectForm=new FormGroup({
      'projectName': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]), //Field project name
      'emailAddress': new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmail.bind(this)), //Field email address
      'projectStatus':new FormControl('Critical')
    });
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  //Return type like this {nameIsForbidden:true}
  //Custom validator which return key value pair
  forbiddenNames(control:FormControl):{[key:string]:boolean}{
    if(this.inValidUserName===control.value){
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
