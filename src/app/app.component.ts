import { Component, Renderer2, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RandomService } from './random.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dicegame';
  randomNumber = 0;
  isUserturn = true;
  player='you  score';
  score1=0;
  score2=0;
  numberOfrounds=0;
  winner='';
  

  constructor(private randomService: RandomService,private renderer: Renderer2, private el: ElementRef) {  } 

  

    getRandomNumberFromApi() {
      this.randomService.getRandomNumber().subscribe({
        next: (data: number) => {   
          this.randomNumber = data;
          console.log("Generate Number:",data);
          this.appendElement(this.randomNumber);
          this.score1=this.score1+this.randomNumber;
          this.player='you score';
         if(this.isUserturn){
            
            
         }
          else{
            this.player='CPU scores';
            setTimeout(() => {
              // It's the computer's turn, generate a number
              this.randomService.getRandomNumber().subscribe({
                next: (data: number) => {
                  this.randomNumber = data;
                  console.log("Generated Number:", data);
                  this.appendElement(this.randomNumber);
                  this.score2=this.score2+this.randomNumber;
                  this.numberOfrounds=this.numberOfrounds+1;
                  if(this.numberOfrounds==3){
                    setTimeout(() => { 
                      if(this.score1>this.score2){
                        this.winner='You win';
                      }
                      else if(this.score1<this.score2){
                        this.winner='CPU wins';
                      }
                      else{
                        this.winner='draw';
                      } 
                    },50);
                    
                  }
                },
                error: (error: HttpErrorResponse) => {
                  console.log(error.message);
                }
              });
            }, 2000); // Delay for 10 seconds
          }
        },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }
  
  appendElement(number: number) {
    const newElement = this.renderer.createElement('div');
    const newElement1 = this.renderer.createElement('div');
    const image = this.renderer.createElement('img');
    const text =  this.renderer.createText(this.player+" "+number.toString());
   
  
    this.renderer.addClass(newElement, 'alert');
     this.renderer.addClass(newElement, 'alert-primary');
     this.renderer.addClass(newElement, 'custom-width'); 

     
     
     this.renderer.appendChild(newElement, text);
     this.renderer.appendChild(this.el.nativeElement, newElement);

     this.renderer.appendChild(newElement1, image);
    this.renderer.appendChild(this.el.nativeElement, newElement1);
    
    this.isUserturn = !this.isUserturn;
    this.player='you score';
  }

  resetGame(){
    this.winner='';
    this.score1=0;
    this.score2=0;
    location.reload();
  }
}
