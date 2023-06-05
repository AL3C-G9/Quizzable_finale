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

  addName(name: string) {
    this.names.push(name);
  }

  getNames(): string[] {
    return this.names;
  }

  getName(pos:number) :string {
    return this.names[pos];
  }

  addGagnantBox(name :string) {
    this.gagnantBox.push(name)
  }

  getGagnantBox():string{
    return this.gagnantBox[0];
  }

  viderGagnantBox(){
    this.gagnantBox.splice(0,this.gagnantBox.length);
  }

  getP1(): number{
    return this.p1;
  }

  setP1(){
    this.p1 = this.p1+1;
  }

  initializeP1(){
    this.p1=0;
  }

  getP2(): number{
    return this.p2;
  }

  setP2(){
    this.p2 = this.p2+1;
  }

  initializeP2(){
    this.p2=0;
  }
}
