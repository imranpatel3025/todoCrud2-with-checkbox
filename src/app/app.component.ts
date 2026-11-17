import { Component, ElementRef, ViewChild } from '@angular/core';
import { UuidService } from './service/uuid.service';
import { SnackBarService } from './service/snack-bar.service'
import { Itodo } from './model/todo.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isInEditMode: boolean = false

  @ViewChild('todoNameRef') todoNameRef!: ElementRef<HTMLInputElement>

  @ViewChild('todoValueRef') todoValueRef!: ElementRef<HTMLInputElement>

  @ViewChild('isCompletedRef') isCompletedRef! : ElementRef<HTMLInputElement>
  todosArr: Array<Itodo> = [
    {
      todoName: 'HTML',
      isCompleted: true,
      todoId: '123'
    },
    {
      todoName: 'SCSS',
      isCompleted: false,
      todoId: '124'
    },
    {
      todoName: 'NODEJS',
      isCompleted: true,
      todoId: '125'
    }
  ]

  updateId !: string

  constructor(private uuidService: UuidService,
    private snckBarService : SnackBarService
  ) {

  }


  onTodoAdd() {
    let newObj: Itodo = {
      todoName: this.todoNameRef.nativeElement.value,
      isCompleted: this.todoValueRef.nativeElement.value === 'yes',
      todoId: this.uuidService.getUuid()
    }
    this.todosArr.push(newObj)
    this.todoNameRef.nativeElement.value = ''
    // console.log(newObj)
     this.snckBarService.snackBar('New Todo Added Successfully!!!')
  }

  onTodoEdit(todo: Itodo) {
    // console.log(todo)
    this.todoNameRef.nativeElement.value = todo.todoName
    this.todoValueRef.nativeElement.value = todo.isCompleted ? 'yes' : 'no'
    this.isInEditMode = true
    this.updateId = todo.todoId

  }

  onTodoUpdate() {
    // console.log(this.updateId)
    let updateIndex = this.todosArr.findIndex(t => t.todoId === this.updateId)
    // console.log(updateIndex)
    let updateObj = {
      todoName: this.todoNameRef.nativeElement.value,
      isCompleted: this.todoValueRef.nativeElement.value == 'yes',
      todoId: this.updateId
    }
    // console.log(updateObj)
    this.todosArr[updateIndex] = updateObj
    this.todoNameRef.nativeElement.value = ''
    this.isInEditMode = false
     this.snckBarService.snackBar('Todo Updated Successfully!!!')

  }

  onTodoRemove(todoId: string) {
    // console.log(todoId)
    let removeIndex = this.todosArr.findIndex(t => t.todoId === todoId)
    this.todosArr.splice(removeIndex, 1)
    this.snckBarService.snackBar('Todo Removed Successfully!!!')
  }

  onChangeCheck(todo: Itodo){    
    todo.isCompleted = !todo.isCompleted
    let getIndx = this.todosArr.findIndex(t => t.todoId === todo.todoId)
    this.todosArr[getIndx] = todo   
    
  }
}

