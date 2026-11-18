import { Conditional } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { stdin } from 'process';
import { last } from 'rxjs';
import { Istd } from 'src/app/model/student.model';
import { UuidService } from 'src/app/service/uuid.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @ViewChild('fnameRef') fnameRef!: ElementRef<HTMLInputElement>
  @ViewChild('lnameRef') lnameRef!: ElementRef<HTMLInputElement>
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>
  @ViewChild('isactiveRef') isactiveRef!: ElementRef<HTMLInputElement>
  @ViewChild('contactRef') contactRef!: ElementRef<HTMLInputElement>

  isInEditMode: boolean = false
  updateId: string = ''
  studentArr: Array<Istd> = [
    {
      fname: 'May',
      lname: 'Doe',
      email: 'may_doe@gmail.com',
      contact: 9862345488,
      isActive: false,
      stdId: '123'
    },
    {
      fname: 'Jhon',
      lname: 'Doe',
      email: 'jd@gmail.com',
      contact: 9862345488,
      isActive: true,
      stdId: '124'
    },
    {
      fname: 'July',
      lname: 'Doe',
      email: 'jd@gmail.com',
      contact: 9862345488,
      isActive: true,
      stdId: '125'
    },
    {
      fname: 'Imran',
      lname: 'Patel',
      email: 'imran_patel@gmail.com',
      contact: 9862345488,
      isActive: false,
      stdId: '126'
    }
  ]
  constructor(private _uuidService: UuidService) { }

  ngOnInit(): void {
  }

  onAddStd() {
    let newObj: Istd = {
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
  }


  onEditStd(std: Istd) {
    // console.log(std)
    this.fnameRef.nativeElement.value = std.fname
    this.lnameRef.nativeElement.value = std.lname
    this.emailRef.nativeElement.value = std.email
    this.contactRef.nativeElement.value = std.contact.toString()
    this.isactiveRef.nativeElement.value = std.isActive ? 'yes' : 'no'
    this.updateId = std.stdId
    this.isInEditMode = true
  }

  onUpdateStd(){
    let updatedObj : Istd={
      fname : this.fnameRef.nativeElement.value,
      lname : this.lnameRef.nativeElement.value,
      email : this.emailRef.nativeElement.value,
      contact : +this.contactRef.nativeElement.value,
      isActive : this.isactiveRef.nativeElement.value == 'yes',
      stdId : this.updateId

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
  }

  onStdRemove(stdId: string) {
    // console.log(stdId)
    let getConfirm = confirm(`Are You sure, you want to Remove with id ${stdId}`)
    if (getConfirm) {
      let getindex = this.studentArr.findIndex(s => s.stdId === stdId)
      this.studentArr.splice(getindex, 1)
    }
  }

}

