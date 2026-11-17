import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  getUuid(){
    return crypto.randomUUID()
  }
  constructor() { }
}
