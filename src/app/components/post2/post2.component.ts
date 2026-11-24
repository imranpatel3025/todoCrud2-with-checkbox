import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { postsArr } from 'src/app/const/posts';
import { Iposts } from 'src/app/model/posts.model';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-post2',
  templateUrl: './post2.component.html',
  styleUrls: ['./post2.component.scss']
})
export class Post2Component implements OnInit {

  @ViewChild('titleRef') titleRef !: ElementRef<HTMLInputElement> 
  @ViewChild('bodyRef') bodyRef !: ElementRef<HTMLInputElement> 

  postsArr = postsArr

  isInEditMode : boolean = false

  updateId :string = ''
  
  constructor( private uuidService : UuidService) { }

  onAddPost(){
    let newPost : Iposts ={
      title : this.titleRef.nativeElement.value,
      body : this.bodyRef.nativeElement.value,
      id : this.uuidService.getUuid()
    }
    postsArr.unshift(newPost)

    this.titleRef.nativeElement.value = ''
    this.bodyRef.nativeElement.value = ''
  }

  onEditPost(posts : Iposts){
    this.titleRef.nativeElement.value = posts.title
    this.bodyRef.nativeElement.value = posts.body

    this.isInEditMode = true
    this.updateId = posts.id
  }

  onUpdatePost(){
    let updatedObj : Iposts = {
      title : this.titleRef.nativeElement.value,
      body : this.bodyRef.nativeElement.value,
      id : this.updateId      
    }

    let getindex = postsArr.findIndex(p => p.id === this.updateId)
    postsArr[getindex] = updatedObj

    this.isInEditMode = false

     this.titleRef.nativeElement.value = ''
    this.bodyRef.nativeElement.value = ''
  }

  onRemovePost(removeId : string){
    let getConfirm = confirm(`Are You sure, you want to Remove`)
    if(getConfirm){
      let getIndex = postsArr.findIndex(p => p.id === removeId)
      postsArr.splice(getIndex, 1)
    }
  }

  ngOnInit(): void {
  }

  trackById(index : number, posts : Iposts){
   return posts.id;
  }

}
