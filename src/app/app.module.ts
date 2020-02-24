import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormBasicComponent } from './reactive-form-basic/reactive-form-basic.component';
import { ReactiveFormAssignmentComponent } from './reactive-form-assignment/reactive-form-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormBasicComponent,
    ReactiveFormAssignmentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
