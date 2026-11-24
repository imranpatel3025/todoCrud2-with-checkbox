import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/model/todo.interface';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-todo4',
  templateUrl: './todo4.component.html',
  styleUrls: ['./todo4.component.scss'],
  
})
export class Todo4Component implements OnInit {

  @ViewChild('name') name! : ElementRef<HTMLInputElement>
  @ViewChild('isCompleted') isCompleted! : ElementRef<HTMLInputElement>

  isInEditMode : boolean = false
   todosArr: Array<Itodo> = [
    {
      todoName: 'Angular',
      isCompleted: true,
      todoId: '123'
    },
    {
      todoName: 'TS',
      isCompleted: false,
      todoId: '124'
    },
    {
      todoName: 'NODEJS',
      isCompleted: false,
      todoId: '125'
    }
  ]

  updateId !: string

  constructor(private _uuidService : UuidService,
    private _snackBarService : SnackBarService
  ) { }

  ngOnInit(): void {
  }

  createNewTodo(){
    let newTodoObj: Itodo = {
      todoName : this.name.nativeElement.value,
      isCompleted : this.isCompleted.nativeElement.value == 'yes',
      todoId : this._uuidService.getUuid()
    }
    this.todosArr.push(newTodoObj)
    this._snackBarService.snackBar(`New Todo Created Succefull !!!`)
    this.name.nativeElement.value = ''
    this.isCompleted.nativeElement.value == ''
  }

  onEdit(todo: Itodo){
    this.name.nativeElement.value = todo.todoName;
    this.isCompleted.nativeElement.value = todo.isCompleted ? 'yes' : 'no'

    this.isInEditMode = true
    this.updateId = todo.todoId
  }
  updateTodo(){
    let updateObj: Itodo={
       todoName : this.name.nativeElement.value,
      isCompleted : this.isCompleted.nativeElement.value == 'yes',
      todoId : this.updateId
    }

    let getIndex = this.todosArr.findIndex(t => t.todoId === this.updateId)
    this.todosArr[getIndex] = updateObj

    this.isInEditMode = false
    this._snackBarService.snackBar(` Todo Updated Succefull !!!`)

    this.name.nativeElement.value = ''
    this.isCompleted.nativeElement.value == ''
  }

  removeTodo(removeId : string){
    let getConfirm = confirm(`Are You sure, you want to remove todo`)
    if(getConfirm){
      let removeIndex = this.todosArr.findIndex(t => t.todoId === removeId)
      this.todosArr.splice(removeIndex, 1)
    this._snackBarService.snackBar(`Todo Removed Succefull !!!`)

    }
  }

  onChange(todo: Itodo){
    todo.isCompleted = !todo.isCompleted
    this._snackBarService.snackBar(`Skill is ${todo.isCompleted ? 'Completed' : 'In-Completed'}`)
  }

}
