import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {DoTheMath} from '../services/doTheMath.service';
import {MathInput} from '../models/mathInput.model';
import {WinNumber} from '../models/winNumber.Model';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  inputModel = new MathInput(null,null,8);
  winDistrubution: Array<Number>;
  calculatedTop= [];
  private inputMode: boolean;

  constructor(private doTheMath: DoTheMath) {
    this.inputMode = true;
  }

  recalculateClick(){
    this.inputMode = true;
    this.inputModel = new MathInput(null,null,8);
  }

  onSubmit(form: any) {
    this.winDistrubution = this.doTheMath.calaculateWinDistrubution(this.inputModel);
    //console.log('winDistrubution', this.winDistrubution);
    this.calculatedTop = this.doTheMath.formatResult(this.winDistrubution);
    this.inputMode = false;
    //console.log('calculated top', this.calculatedTop);
   
    }
}
