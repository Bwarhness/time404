import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }
  getFile(tim:number, ext:string ,board: 'wsg' |'gif' | 'b'){
    return `http://i.4cdn.org/${board}/${tim}${ext}`
  }
}
