import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MathInput } from '../models/mathInput.model';
//import { Response, Headers, RequestOptions } from '@angular/http';
//import'rxjs/Rx';
//import {Observable} from 'rxjs/Observable';

@Injectable()
export class DoTheMath {
    result = [];
    previousResult = [];
    constructor(private http: Http){
    }

    
    calaculateTop(mathInput: MathInput){
        this.result = [];
        console.log('MathInput in service', mathInput);
        this.result[0] = mathInput.NumberOfPlayers;
        for(var i = 1; i <= mathInput.NumberOfRounds; i++){
            var tempFirstRoundUpper = Math.ceil(this.result[i-1]/2);
            var tempFirstRoundDown = Math.floor(this.result[i-1]/2);
            this.result[i] = tempFirstRoundUpper;
            this.result[i-1] = tempFirstRoundDown;
            if (i >= 2){
                for (var k = i-2; k>=0; k--){
                    var tempUpper = Math.ceil(this.result[k]/2);
                    var tempDown = Math.floor(this.result[k]/2)
                    this.result[k+1] = this.result[k+1]+tempUpper;
                    this.result[k] = this.result[k]-tempDown;
                }
            }
        }
        return this.result;

    }

}