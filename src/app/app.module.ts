import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentComponent } from './components/student/student.component';
import { TodoCurd3Component } from './components/todo-curd3/todo-curd3.component';
import { Student2Component } from './components/student2/student2.component'

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TodoCurd3Component,
    Student2Component
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
