import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private names: string[] = [];
  private gagnantBox: string[] = [];
  private p1 !: number;
  private p2 !: number;

  

 

  addGagnantBox(name :string) {
    this.gagnantBox.push(name)
  }

  getGagnantBox():string{
    return this.gagnantBox[0];
  }

  viderGagnantBox(){
    this.gagnantBox.splice(0,this.gagnantBox.length);
  }
}
