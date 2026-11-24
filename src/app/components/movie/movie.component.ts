import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { movies } from 'src/app/const/movie';
import { Imovie } from 'src/app/model/movie.model';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @ViewChild('movieNameRef') movieNameRef! : ElementRef<HTMLInputElement>
  @ViewChild('movieDescreptionRef') movieDescreptionRef! : ElementRef<HTMLInputElement>
  @ViewChild('movieUrlRef') movieUrlRef! : ElementRef<HTMLInputElement>
  @ViewChild('movieRatingRef') movieRatingRef! : ElementRef<HTMLInputElement>

  movieArr : Array<Imovie> = movies

  isInEditMode : boolean = false
  constructor( private _uuidService : UuidService,
    private _snackBar : SnackBarService
  ) { }

  updateId ! : string

  ngOnInit(): void {
  }

  addMovie(){
    let newMovie: Imovie = {
      movieName : this.movieNameRef.nativeElement.value,
      description : this.movieDescreptionRef.nativeElement.value,
      rating : +this.movieRatingRef.nativeElement.value,
      imageUrl : this.movieUrlRef.nativeElement.value,
      id : this._uuidService.getUuid()
    }
    // console.log(newMovie)
    this.movieArr.unshift(newMovie)

    this._snackBar.snackBar(`New Movie Added Successfully !!!`)

    this.movieNameRef.nativeElement.value = ''
    this.movieDescreptionRef.nativeElement.value = ''
    this.movieRatingRef.nativeElement.value = ''
    this.movieUrlRef.nativeElement.value = ''
  }

  onEdit(movie: Imovie){
    this.movieNameRef.nativeElement.value = movie.movieName
    this.movieDescreptionRef.nativeElement.value = movie.description
    this.movieRatingRef.nativeElement.value = movie.rating.toString()
    this.movieUrlRef.nativeElement.value = movie.imageUrl

    this.isInEditMode = true
    this.updateId = movie.id
  }

  onMovieUpdate(){
    let updatedObj = {
      movieName : this.movieNameRef.nativeElement.value,
      description : this.movieDescreptionRef.nativeElement.value,
      rating : +this.movieRatingRef.nativeElement.value,
      imageUrl : this.movieUrlRef.nativeElement.value,
      id : this.updateId
    }
    // console.log(updatedObj)
    let getIndex = this.movieArr.findIndex(m => m.id === this.updateId)

    this.movieArr[getIndex] = updatedObj
    this._snackBar.snackBar(`Movie with is ${this.updateId} is Updated Successfully !!!`)


    this.isInEditMode = false
    
    this.movieNameRef.nativeElement.value = ''
    this.movieDescreptionRef.nativeElement.value = ''
    this.movieRatingRef.nativeElement.value = ''
    this.movieUrlRef.nativeElement.value = ''
  }

  onDelete(removeId : string){
    let getConfirm = confirm(`Are you sure, you want to Remove with id ${removeId}`)

    if(getConfirm){
      let removeIndex = this.movieArr.findIndex(m => m.id === removeId)
      // console.log(removeIndex)
      this.movieArr.splice(removeIndex, 1)

    this._snackBar.snackBar(`Movie with id ${removeId} is Removed Successfully !!!`)

    }
  }
}
