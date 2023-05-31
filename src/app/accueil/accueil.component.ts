import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  joueur1 !: string;
  joueur2 !: string;
  name: string[] = []

  constructor(private router:Router , private data: DataService) {}

  ngOnInit(): void {
  }
  ChangePageRules(){
    this.router.navigate(["Rules"]);
  }
  ChangePageModel(){
    //console.log(this.joueur1, this.joueur2)
    //this.data.addName(this.joueur1);
    //this.data.addName(this.joueur2);
    //this.data.initializeP1();
    //this.data.initializeP2();
    localStorage.setItem("P1","0")
    localStorage.setItem("P2","0")
    localStorage.setItem("nomJoueur1",this.joueur1)
    localStorage.setItem("nomJoueur2",this.joueur2)
    this.router.navigate(["Model"]);
  }

  onNameChange(name1: string, name2: string) {
    this.data.addName(name1);
    
  }

 

}


