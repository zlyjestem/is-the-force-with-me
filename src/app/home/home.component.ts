import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {DoTheMath} from '../services/doTheMath.service';
import {MathInput} from '../models/mathInput.model'

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  //public mathInput = { NumberOfPlayers: undefined, NumberOfRounds: undefined, SizeOfTop: undefined };
  inputModel = new MathInput(null,null,null);
  result = [];

  constructor(private doTheMath: DoTheMath) {
    

  }

  onSubmit(form: any) {
    //console.log("No of players:")
    //console.log(this.inputModel.NumberOfPlayers);
    //console.log("No of rounds:")
    //console.log(this.inputModel.NumberOfRounds);
    //console.log("Size of top:")
    //console.log(this.inputModel.SizeOfTop);
    this.result = this.doTheMath.calaculateTop(this.inputModel);
    console.log('from service:', this.result)

    }
}
