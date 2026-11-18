import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { studentArr } from 'src/app/const/student';
import { Istdudent } from 'src/app/model/student.model';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-student2',
  templateUrl: './student2.component.html',
  styleUrls: ['./student2.component.scss']
})
export class Student2Component implements OnInit {


  @ViewChild('fnameRef') fnameRef!: ElementRef<HTMLInputElement>
  @ViewChild('lnameRef') lnameRef!: ElementRef<HTMLInputElement>
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>
  @ViewChild('isactiveRef') isactiveRef!: ElementRef<HTMLInputElement>
  @ViewChild('contactRef') contactRef!: ElementRef<HTMLInputElement>

  studentArr = studentArr

  isInEditMode: boolean = false

  updateId: string = ''
  constructor(private _uuidService: UuidService,
    private _snackBar : SnackBarService
  ) { }


  onAddStd() {
    let newObj: Istdudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.isactiveRef.nativeElement.value == 'yes',
      stdId: this._uuidService.getUuid()
    }
    // console.log(newObj)
    this.studentArr.push(newObj)
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.isactiveRef.nativeElement.value = 'yes'

    this._snackBar.snackBar(`New Student Addded Succesfully!!!`)
  }


  onEditStd(std: Istdudent) {
    // console.log(std)
    this.fnameRef.nativeElement.value = std.fname
    this.lnameRef.nativeElement.value = std.lname
    this.emailRef.nativeElement.value = std.email
    this.contactRef.nativeElement.value = std.contact.toString()
    this.isactiveRef.nativeElement.value = std.isActive ? 'yes' : 'no'
    this.updateId = std.stdId
    this.isInEditMode = true
  }

  onUpdateStd() {
    let updatedObj: Istdudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.isactiveRef.nativeElement.value == 'yes',
      stdId: this.updateId

    }
    // console.log(updatedObj)
    let indexNo = this.studentArr.findIndex(s => s.stdId === this.updateId)
    this.studentArr[indexNo] = updatedObj


    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.isactiveRef.nativeElement.value = 'yes'

    this.isInEditMode = false

    this._snackBar.snackBar(`Student is Updated Succesfully!!!`)
  }

  onStdRemove(stdId: string) {
    // console.log(stdId)
    let getConfirm = confirm(`Are You sure, you want to Remove with id ${stdId}`)
    if (getConfirm) {
      let getindex = this.studentArr.findIndex(s => s.stdId === stdId)
      this.studentArr.splice(getindex, 1)
    }
    this._snackBar.snackBar(`Student is Removed Succesfully!!!`)
  }

  onChange(std: Istdudent){
    std.isActive = !std.isActive 
    this._snackBar.snackBar(`Student is ${std.isActive ? 'Activated' : 'Diactivated'} Succesfully!!!`)

  }

  ngOnInit(): void {

  }
}


