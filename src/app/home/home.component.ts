import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {DoTheMath} from '../services/doTheMath.service';
import {MathInput} from '../models/mathInput.model';
import {WinNumber} from '../models/winNumber.Model';
//import {currency} from '@angular/'

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  inputModel = new MathInput(null,null,8);
  winDistrubution: Array<Number>;
  calculatedTop = [];
  compactResult = [];
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
    this.compactResult = this.doTheMath.compactResult(this.winDistrubution);
    this.inputMode = false;
    }
}
