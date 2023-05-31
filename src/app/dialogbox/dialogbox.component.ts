import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { LensFlareSystem, ThinTexture } from '@babylonjs/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import question from "../../data/question.json";
import reponse from "../../data/reponse.json";
import { Reponse } from '../Reponse1';
import { Reponsescorrectes } from '../Reponsescorrectes1';
import { Question } from '../Question1'
import { notStrictEqual } from 'assert';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  answerKey1 !: String;
  answerKey2 !: String;
  player1Keys = ['a', 'z', 'e']; // Touches pour joueur 1
  player2Keys = ['i', 'o', 'p']; // Touches pour joueur 2
  player1Choices = 0; // Nombre de choix pour joueur 1
  player2Choices = 0; // Nombre de choix pour joueur 2
  number: number = 0;
  player1Points =0;
  player2Points = 0;
  player1Nom = localStorage.getItem("nomJoueur1");
  player2Nom= localStorage.getItem("nomJoueur2");

  listeCategorie1: string []= [];
  listeQuestions1: Question []= [];
  listeReponses1: Reponse []= [];
  listeRepCorrectes1: Reponsescorrectes []= [];
  jeuEnCours :boolean =false;

  texteCat !: String;
  q !: String;
  idQuest !: number;
  idRep : String []=[];
  
  
  constructor(private router:Router, private data: DataService) {
    
  }

  ngOnInit(): void{
    const questiondata=question.questionList;
    const responsesdata=reponse.correctionList;
    if (questiondata && responsesdata){
    
      this.listeQuestions1= questiondata.map(question => ({
        idQ: question.id,
        categorie: question.categorie,
        question: question.question,
      }));

      this.listeReponses1= questiondata.map(question => ({
        idQ: question.id,
        rep: question.responses,
      }));

      this.listeRepCorrectes1= responsesdata.map(reponse => ({
        idQ: reponse.questionId,
        index: reponse.responseIndex,
      }));
    }
    this.partie();
  }  

  spin() {
    this.number += 100 + Math.ceil(Math.random() * 1000);
    const container = document.querySelector(".container") as HTMLElement;
    container.style.transform = `rotate(${this.number}deg)`;
    let deg = this.number%360;

    if (deg >= 0 && deg <= 45) {
      this.texteCat="Air";
    } else if (deg > 45 && deg <= 90) {
      this.texteCat="Catastrophes naturelles";
    } else if (deg > 90 && deg <= 135) {
      this.texteCat="Ressources naturelles";
    } else if (deg > 135 && deg <= 180) {
      this.texteCat="Eau";
    } else if (deg > 180 && deg <= 225) {
      this.texteCat="Pollution";
    } else if (deg > 225 && deg <= 270) {
      this.texteCat="Biologie";
    } else if (deg > 270 && deg <= 315) {
      this.texteCat="Dechets";
    } else if ((deg > 315 && deg < 360)||(deg=0)) {
      this.texteCat="Climat";
    }
    
    this.q = this.selectionQuestion();
    let reponses : String [] = [];
    let rep1 !: String;
    let rep2 !: String;
    let rep3 !: String;
    reponses= this.recupererReponses();
    rep1=reponses[0];
    rep2=reponses[1];
    rep3=reponses[2];

    const cat = document.getElementById("monDivCat") as HTMLDivElement; 
    const quest = document.getElementById("monDivQuest") as HTMLDivElement; 
    const rep1Button = document.getElementById("r1") as HTMLButtonElement;
    const rep2Button = document.getElementById("r2") as HTMLButtonElement;
    const rep3Button = document.getElementById("r3") as HTMLButtonElement;
    const r1 = document.getElementById("r1") as HTMLDivElement; 
    const r2 = document.getElementById("r2") as HTMLDivElement; 
    const r3 = document.getElementById("r3") as HTMLDivElement;
    const spinButton = document.querySelector('#spin') as HTMLButtonElement;
    spinButton.addEventListener("click", function() {
      // Désactivez le bouton
      spinButton.disabled = true;
    });
    setTimeout(() => { 
      cat.innerHTML = this.texteCat.toString();
      quest.innerHTML = this.q.toString(); 
      cat.style.display='block'
      quest.style.display='block'
      rep1Button.style.display = 'block'
      r1.innerHTML = rep1.toString(); 
      rep2Button.style.display = 'block'
      r2.innerHTML = rep2.toString(); 
      rep3Button.style.display = 'block'
      r3.innerHTML = rep3.toString();
      this.jeu();
    }, 5000); 
  }

  selectionQuestion(): String {
    const filteredquestions=this.listeQuestions1.filter(question=>
      question.categorie===this.texteCat
    )
    const randomIndex=Math.floor(Math.random() * filteredquestions.length);
    this.idQuest=filteredquestions[randomIndex].idQ;
    return filteredquestions[randomIndex].question

  }

  recupererReponses() : String[] {
    const item=this.listeReponses1.find(
      question=>
        question.idQ===this.idQuest
    )
    return item ? item.rep : [];
  }

  answerKey(){
    this.answerKey1="";
    this.answerKey2="";
    
    const item=this.listeRepCorrectes1.find(
      repcorrecte=>
        repcorrecte.idQ===this.idQuest
    )

    if(item!.index==0){
      this.answerKey1='a';
      this.answerKey2='i';
    }
    else if (item!.index==1){
      this.answerKey1='z';
      this.answerKey2='o';
    }
    else if (item!.index==2){
      this.answerKey1='e';
      this.answerKey2='p';
    }
    console.log(this.answerKey1)
    console.log(this.answerKey2)
  }

  openPopupCd() {
    const modal = document.getElementById("modal") as HTMLDivElement;
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  checkAnswer(player: number, key: string) : boolean{
    this.answerKey();
    const b1 = document.querySelector('#r1') as HTMLButtonElement;
    const b2 = document.querySelector('#r2') as HTMLButtonElement;
    const b3 = document.querySelector('#r3') as HTMLButtonElement;
    if ((key.toLowerCase() === this.answerKey1.toLowerCase()) || (key.toLowerCase() === this.answerKey2.toLowerCase())) {
      console.log(`Le joueur ${player} a trouvé la bonne réponse !`);
      if ((this.answerKey1 == 'a') || (this.answerKey2 == 'i')){
        b1.style.backgroundColor = '#328D2B';
      }
      else if ((this.answerKey1 == 'z') || (this.answerKey2 == 'o')){
        
        b2.style.backgroundColor = '#328D2B';
      }
      else if ((this.answerKey1 == 'e') || (this.answerKey2 == 'p')){
        
        b3.style.backgroundColor = '#328D2B';
      }
      setTimeout(()  =>  {
        b1.style.backgroundColor = '#6fd649';
        b2.style.backgroundColor = '#6fd649';
        b3.style.backgroundColor = '#6fd649';
      }, 3000);
      
      return true;
    }
    return false;
  }

  jeu(){
    const spinButton = document.querySelector('#spin') as HTMLButtonElement;
    this.jeuEnCours=true;
    const countdown = document.getElementById("countdown") as HTMLDivElement;
    countdown.style.display='block'
    const countDownDate = new Date().getTime() + 15000; // 15 secondes à partir de maintenant
    const x = setInterval(() => {
    spinButton.disabled = true;
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)+1;
    countdown.innerHTML = seconds + "s ";
    const jeu = (event: { key: string; }) => {
      const key = event.key.toLowerCase();
      clearInterval(x);
      if (this.player1Choices<1 && this.player1Keys.includes(key) && distance >0) {
        this.player1Choices++;
        if (this.checkAnswer(1, key)){
          clearInterval(x);
          console.log(`(J1 a gagne n points)`);
          console.log(`popup(bonne reponse j1 -> prochaine question)`);
          document.removeEventListener('keydown', jeu);
          spinButton.disabled = false;
          countdown.innerHTML = ''
          this.player1Points= this.player1Points +5;
          if (key==='a'){
            this.questionTermine('La bonne réponse est la 1ère , ' + this.player1Nom+ ' à gagné ce tour');
          }
          else if (key==='z'){
            this.questionTermine('La bonne réponse est la 2ème , ' + this.player1Nom+ ' à gagné ce tour');
          }
          else if (key==='e'){
            this.questionTermine('La bonne réponse est la 3ème , ' + this.player1Nom+ ' à gagné ce tour');
          }
          
        }
        else{
          console.log(`Au tour du J2`);
          console.log(`le J1 ne peux plus repondre`);
          if (this.checkAnswer(2, key)){
            clearInterval(x);
            document.removeEventListener('keydown', jeu);
            spinButton.disabled = false;
            countdown.innerHTML = ''
            this.player2Points= this.player2Points +5;
            if (key==='i'){
              this.questionTermine('La bonne réponse est la 1ère , ' + this.player2Nom+ ' à gagné ce tour');
            }
            else if (key==='o'){
              this.questionTermine('La bonne réponse est la 2ème , ' + this.player2Nom+ ' à gagné ce tour');
            }
            else if (key==='p'){
              this.questionTermine('La bonne réponse est la 3ème , ' + this.player2Nom+ ' à gagné ce tour');
            }
          } 
        }
    
      } 
      else if (this.player2Choices<1 && this.player2Keys.includes(key) && distance >0 ) {
        this.player2Choices++;
        if (this.checkAnswer(2, key)){
          clearInterval(x);
          console.log(`(J2 a gagne n points)`);
          console.log(`popup(bonne reponse j2 -> prochaine question)`);
          document.removeEventListener('keydown', jeu);
          spinButton.disabled = false;
          countdown.innerHTML = ''
          this.player2Points= this.player2Points +5;
          this.questionTermine(this.player2Nom+' à gagné ce niveau');
          
        }
        else{
          console.log(`Au tour du J1`);
          console.log(`le J2 ne peux plus repondre`);
          if (this.checkAnswer(1, key)){
            clearInterval(x);
            document.removeEventListener('keydown', jeu);
            spinButton.disabled = false;
            countdown.innerHTML = ''
            this.player1Points= this.player1Points +5;
            this.questionTermine(this.player1Nom+ ' à gagné ce niveau');
          }  
        }
      
      }
      else if (this.player1Choices==1 && this.player2Choices==1 && distance >0 && !this.checkAnswer(1, key) && !this.checkAnswer(2, key)){
        document.removeEventListener('keydown', jeu);
        spinButton.disabled = false;
        clearInterval(x);
        countdown.innerHTML = ''
        this.questionTermine('Aucun joueurs à bien repondu, cliquer pour le prochain tours');
      }
      
    };
    document.addEventListener('keydown', jeu);
    if (distance <= 0) {
      clearInterval(x);
      countdown.innerHTML = ''
      spinButton.disabled = false;
      this.questionTermine('Temps ecoulé, cliquer pour le prochain tours')
    }
    }, 10);
    this.player1Choices=0;
    this.player2Choices=0;
    this.jeuEnCours=false;
  }

  questionTermine(phrase : string) {
    const countdown = document.getElementById("countdown") as HTMLDivElement;
    const cat = document.getElementById("monDivCat") as HTMLDivElement; 
    const quest = document.getElementById("monDivQuest") as HTMLDivElement; 
    const rep1Button = document.getElementById("r1") as HTMLButtonElement;
    const rep2Button = document.getElementById("r2") as HTMLButtonElement;
    const rep3Button = document.getElementById("r3") as HTMLButtonElement;
    const r1 = document.getElementById("r1") as HTMLDivElement; 
    const r2 = document.getElementById("r2") as HTMLDivElement; 
    const r3 = document.getElementById("r3") as HTMLDivElement;
    const modal = document.getElementById("endQuest") as HTMLDivElement;
    const nextButton = document.querySelector('#next') as HTMLButtonElement;
    const phrasePopup = document.getElementById("phrase") as HTMLDivElement;
    phrasePopup.innerHTML = phrase;
    modal.style.display = "block";
    nextButton.addEventListener('click', event => {
      if (event.target === nextButton) {
        modal.style.display = "none";
      }
    });
    nextButton.addEventListener('click', () => {
        //this.spin();
        setTimeout(()  =>  {
          countdown.style.display='none'
          cat.style.display='none'
          quest.style.display='none'
          rep1Button.style.display = 'none'
          r1.style.display = 'none'
          rep2Button.style.display = 'none'
          r2.style.display = 'none'
          rep3Button.style.display = 'none'
          r3.style.display = 'none'

        }, 500);
        
     });
    
  }
  

  partie(){
  
    const spinButton = document.querySelector('#spin') as HTMLButtonElement;
    let clickCount = 0;

    spinButton.addEventListener('click', () => {
    if (clickCount < 5) {
    // Exécuter la fonction associée au clic du bouton ici
      this.spin();
      clickCount++;
    } 
    else {
      spinButton.disabled = true; // Désactiver le bouton une fois que le nombre maximal de clics a été atteint
      if(this.player1Points>this.player2Points){
        console.log(this.player1Points , this.player2Points)
        if(this.player1Nom != null){
          this.data.addGagnantBox(this.player1Nom);
          this.partieTermine('Fin de la partie ' +this.player1Nom+ ' a gagne!');
        }
      }
      else if (this.player1Points<this.player2Points){
        console.log(this.player1Points , this.player2Points)
        if(this.player2Nom != null){
          this.data.addGagnantBox(this.player2Nom);
          this.partieTermine('Fin de la partie ' +this.player2Nom+' a gagne!');
        }
      }
      else if (this.player1Points==this.player2Points) {
        spinButton.disabled = false;
        let gagnant=false;
        console.log('Hello')
        while (!gagnant){
          console.log('avant spin')
          this.spin()
          console.log('apres spin')
          if(this.player1Points>this.player2Points){
            gagnant=true;
            console.log('J1 a gagne')
            if(this.player1Nom != null){
              this.data.addGagnantBox(this.player1Nom);
              this.partieTermine('Fin de la partie ' +this.player1Nom+ ' a gagne!');
            }
          }
          else if (this.player1Points<this.player2Points){
            gagnant=true;
            console.log('J2 a gagné')
            if(this.player2Nom != null){
              this.data.addGagnantBox(this.player2Nom);
              this.partieTermine('Fin de la partie ' +this.player2Nom+' a gagne!');
            }
          }
        }
      }
    }
    });
    this.player1Points=0;
    this.player2Points=0;
  }

  partieTermine(phrase : string) {
    const modal = document.getElementById("endPartie") as HTMLDivElement;
    const nextButton = document.querySelector('#acc') as HTMLButtonElement;
    const phrasePopup = document.getElementById("phraseFin") as HTMLDivElement;
    phrasePopup.innerHTML = phrase;
    modal.style.display = "block";
    nextButton.addEventListener('click', () => {
        this.router.navigate(["Model"]);
     });
    
  }
}



