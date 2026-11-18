import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItodoInter } from 'src/app/model/todo.model';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-todo-curd3',
  templateUrl: './todo-curd3.component.html',
  styleUrls: ['./todo-curd3.component.scss']
})
export class TodoCurd3Component implements OnInit {

  @ViewChild('todoNameRef') 
  todoNameRef ! : ElementRef<HTMLInputElement>
  @ViewChild('isValueRef') 
  isValueRef! : ElementRef<HTMLInputElement>


  isInEditMode : boolean = false
  todosArr : Array<ItodoInter> = [
    {
      id:' 1',
      todoName: "JavaScript",
      isCompleted: true
    },
    {
      id:' 2',
      todoName: "TypeScript",
      isCompleted: true
    },
    {
      id:' 3',
      todoName: "Angular",
      isCompleted: true
    },
    {
      id:' 4',
      todoName: "React",
      isCompleted: false
    },
    {
      id:' 5',
      todoName: "Node.js",
      isCompleted: false
    },
    {
      id:' 6',
      todoName: "Python",
      isCompleted: false
    },
    {
      id:' 7',
      todoName: "Java",
      isCompleted: false
    }
  ];
  updateId : string = ''
  onAddtodo(){
    let newObj : ItodoInter ={
      todoName : this.todoNameRef.nativeElement.value,
      isCompleted : this.isValueRef.nativeElement.value == 'yes',
      id : this._uuidService.getUuid()      
    }
    this.todosArr.unshift(newObj)
    this.todoNameRef.nativeElement.value = '',
    this.isValueRef.nativeElement.value = 'yes'

    this._snackBar.snackBar(`The New Todo Added Succesfully!!!`)
  }

   onTodoEdit(todo: ItodoInter) {
      // console.log(todo)
      this.todoNameRef.nativeElement.value = todo.todoName
      this.isValueRef.nativeElement.value = todo.isCompleted ? 'yes' : 'no'
      this.isInEditMode = true
      this.updateId = todo.id
  
    }
  
    onTodoUpdate() {
      // console.log(this.updateId)
      let updateIndex = this.todosArr.findIndex(t => t.id === this.updateId)
      // console.log(updateIndex)
      let updateObj = {
        todoName: this.todoNameRef.nativeElement.value,
        isCompleted: this.isValueRef.nativeElement.value == 'yes',
        id: this.updateId
      }
      // console.log(updateObj)
      this.todosArr[updateIndex] = updateObj
      this.todoNameRef.nativeElement.value = ''
      this.isInEditMode = false
       this._snackBar.snackBar('Todo Updated Successfully!!!')  
    }
  
    onTodoRemove(todoId: string) {
      // console.log(todoId)
      let removeIndex = this.todosArr.findIndex(t => t.id === todoId)
      this.todosArr.splice(removeIndex, 1)
      this._snackBar.snackBar('Todo Removed Successfully!!!')
    }
  
    onChange(todo: ItodoInter){    
      todo.isCompleted = !todo.isCompleted
      let getIndx = this.todosArr.findIndex(t => t.id === todo.id)
      this.todosArr[getIndx] = todo  
      this._snackBar.snackBar(`Todo is ${todo.isCompleted ? 'Completed' : 'In-Completed'}`) 
      
    }

  constructor( private _uuidService: UuidService,
    private _snackBar : SnackBarService
  ) { }

  ngOnInit(): void {
  }

}
