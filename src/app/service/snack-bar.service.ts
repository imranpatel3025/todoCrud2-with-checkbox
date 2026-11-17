import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar : MatSnackBar) { }

  snackBar(msg:string){
   return this._snackBar.open(msg, 'Close', {
    horizontalPosition: 'left',
    verticalPosition : 'top',
    duration: 2000
   })
  }

  
}
