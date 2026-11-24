import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentComponent } from './components/student/student.component';
import { TodoCurd3Component } from './components/todo-curd3/todo-curd3.component';
import { Student2Component } from './components/student2/student2.component';
import { PostCrudComponent } from './components/post-crud/post-crud.component';
import { ProductComponent } from './components/product/product.component';

import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider';
import { Post2Component } from './components/post2/post2.component';
import { MovieComponent } from './components/movie/movie.component';
import { Todo4Component } from './components/todo4/todo4.component'

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TodoCurd3Component,
    Student2Component,
    PostCrudComponent,
    ProductComponent,
    Post2Component,
    MovieComponent,
    Todo4Component
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
