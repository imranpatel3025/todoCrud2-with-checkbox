import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { title } from 'process';
import { postsArr } from 'src/app/const/posts';
import { Iposts } from 'src/app/model/posts.model';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-post-crud',
  templateUrl: './post-crud.component.html',
  styleUrls: ['./post-crud.component.scss']
})
export class PostCrudComponent implements OnInit {

  @ViewChild('titleRef') titleRef !: ElementRef<HTMLInputElement>

  @ViewChild('bodyRef') bodyRef !: ElementRef<HTMLInputElement>

  isInEditMode: boolean = false
  postsArr = postsArr

  updateId: string = ''

  constructor(private _uuidService: UuidService,
    private _snackBar: SnackBarService
  ) { }

  onAddPost() {
    let newPost: Iposts = {
      title: this.titleRef.nativeElement.value,
      body: this.bodyRef.nativeElement.value,
      id: this._uuidService.getUuid()
    }
    // console.log(newPost)
    postsArr.unshift(newPost)

    this._snackBar.snackBar(`New Post Added Succesfully!!!`)
    this.titleRef.nativeElement.value = ''
    this.bodyRef.nativeElement.value = ''
  }

  onEditPost(post: Iposts) {

    this.titleRef.nativeElement.value = post.title
    this.bodyRef.nativeElement.value = post.body

    this.isInEditMode = true
    this.updateId = post.id
  }

  onUpdatePost() {
    let updateObj: Iposts = {
      title: this.titleRef.nativeElement.value,
      body: this.bodyRef.nativeElement.value,
      id: this.updateId
    }

    let updateIndex = postsArr.findIndex(p => p.id === this.updateId)

    postsArr[updateIndex] = updateObj
    this.titleRef.nativeElement.value = ''
    this.bodyRef.nativeElement.value = ''

    this.isInEditMode = false

    this._snackBar.snackBar(`Post with id ${this.updateId} is Updated Succesfully!!!`)
  }

  onRemovePost(removeId: string) {
    let getConfirm = confirm(`Are You Sure, You want to Remove with id ${removeId}`)

    if (getConfirm) {
      let removeIndex = postsArr.findIndex(p => p.id === removeId)
      postsArr.splice(removeIndex, 1)

      this._snackBar.snackBar(`The Post with id ${removeId} is Removed Succesfully`)
    }
  }

  ngOnInit(): void {
  }

}
